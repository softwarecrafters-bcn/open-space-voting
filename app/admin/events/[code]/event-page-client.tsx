"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Edit } from "lucide-react";
import { OpenSpaceEvent } from "@/lib/types";
import Link from "next/link";

interface EventPageClientProps {
  event: OpenSpaceEvent;
}

export function EventPageClient({ event }: EventPageClientProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{event.name}</h1>
          <Link href={`/admin/events/${event.id}/edit`}>
            <Button className="gap-2">
              <Edit className="w-4 h-4" />
              Editar Evento
            </Button>
          </Link>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>Máximo {event.maxParticipants} participantes</span>
                </div>
              </div>
            </div>
            <Badge variant={event.status === "published" ? "default" : "secondary"}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Volver
          </Button>
        </div>
      </div>
    </main>
  );
}