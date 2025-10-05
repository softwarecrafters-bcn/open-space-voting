import {getEvent, getEventIds} from "@/lib/data/events";
import {EventPageClient} from "./event-page-client";

export async function generateStaticParams() {
  return await getEventIds();
}

export default async function EventPage(props: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const params = await props.params;
  const event = await getEvent(params.id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Evento no encontrado</h1>
          <p className="text-muted-foreground">El evento que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  return <EventPageClient event={event} />;
}