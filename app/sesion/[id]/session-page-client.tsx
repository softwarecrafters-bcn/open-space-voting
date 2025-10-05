"use client";

import { useState } from "react";
import { SessionDetails } from "@/components/session/session-details";
import { Session, Theme } from "@/lib/types";
import { useAuthStore } from "@/lib/store/auth-store";
import { useEventStore } from "@/lib/store/event-store";


interface SessionPageClientProps {
  initialSession: Session & { title: string, votes: number, description: string, createdBy: string, notes: string, tags: string[] };
}

export function SessionPageClient({ initialSession }: SessionPageClientProps) {
  const [session, setSession] = useState(initialSession);
  const user = useAuthStore((state) => state.user);
  const event = useEventStore((state) => state.currentEvent);

  const handleJoinSession = () => {
    if (!session.participants.includes(user?.id ?? "")) {
      setSession(prev => ({
        ...prev,
        participants: [...prev.participants, user?.id ?? ""]
      }));
    }
  };

  const theme = {
    id: session.themeId,
    title: session.title,
    votes: session.votes,
    createdBy: session.createdBy,
    description: session.notes,
    author: session.createdBy,
    votedBy: session.participants,
    event: event?.id ?? "",
    tags: session.tags
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SessionDetails
          session={session}
          theme={theme}
          onJoin={handleJoinSession}
          isParticipant={session.participants.includes(user?.id ?? "")}
        />
      </div>
    </main>
  );
}