import { getEventByCode } from "@/app/actions/events";
import { EventForm } from "@/components/admin/event-form";

// export async function generateStaticParams() {
//   return await getEventByCode();
// }

export default async function EditEventPage(
  props: Readonly<{
    params: Promise<{ code: string }>;
  }>
) {
  const params = await props.params;
  const event = await getEventByCode(params.code);

  if (!event) return null;

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Editar Open Space</h1>
        <EventForm initialEvent={event} mode="edit" />
      </div>
    </main>
  );
}
