interface Env {
  Voting: DurableObjectNamespace;
}

export class Voting {
  private votes: Record<string, number> = {};
  public state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.state.blockConcurrencyWhile(async () => {
      this.votes = (await this.state.storage.get("votes")) || {};
    });
  }

  async vote(topicId: string, method: string) {
    if (method == "POST") {
      this.votes[topicId] = (this.votes[topicId] || 0) + 1;
    } else if (method == "DELETE") {
      this.votes[topicId] =
        this.votes[topicId] > 1 ? this.votes[topicId] - 1 : 0;
    }
    await this.state.storage.put("votes", this.votes);
    return this.votes[topicId];
  }

  async fetch(request: Request) {
    if (request.headers.get("Upgrade") === "websocket") {
      const pair = new WebSocketPair();
      this.state.acceptWebSocket(pair[1]);
      pair[1].send(JSON.stringify({ votes: this.votes }));
      return new Response(null, {
        status: 101,
        webSocket: pair[0],
      });
    } else if (request.method == "POST" || request.method == "DELETE") {
      const url = new URL(request.url);
      const topicId = url.searchParams.get("topicId");
      if (!topicId) {
        return Response.json({ error: "topicId is required" }, { status: 400 });
      }
      await this.vote(topicId, request.method);

      for (const socket of this.state.getWebSockets()) {
        socket.send(JSON.stringify({ votes: this.votes }));
      }

      return Response.json({ success: true, votes: this.votes });
    }

    return Response.json({ votes: this.votes });
  }
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/votes/")) {
      const eventId = url.pathname.split("/").pop();
      if (!eventId) {
        return Response.json(
          { error: "eventId is required in the path /api/votes/:eventId" },
          { status: 400 }
        );
      }
      const objectId = env.Voting.idFromName(`event-${eventId}`);
      const voting = env.Voting.get(objectId);

      return voting.fetch(request);
    } else if (url.pathname === "/api/votes") {
      return Response.json(
        { error: "eventId is required in the path /api/votes/:eventId" },
        { status: 400 }
      );
    } else if (url.pathname.startsWith("/api/")) {
      return Response.json({
        name: "Cloudflare",
      });
    }
    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;
