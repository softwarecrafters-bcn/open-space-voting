import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getEvents } from "@/app/actions/events";
import { DashboardClient } from "@/app/admin/dashboard/dashboard-client";

export default async function DashboardPage() {
  const events = await getEvents();

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Eventos</h2>
        <Link href="/admin/events/new">
          <Button>Crear Evento</Button>
        </Link>
      </div>
      <DashboardClient initialEvents={events} />
    </div>
  );
}