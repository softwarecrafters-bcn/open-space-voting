"use client";

import { useState } from "react";
import { OpenSpaceEvent } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Trash2 } from "lucide-react";
import { DeleteEventDialog } from "./delete-event-dialog";
import Link from "next/link";

interface EventCardProps {
  event: OpenSpaceEvent;
  onDelete: (eventId: string) => void;
}

export function EventCard({ event, onDelete }: EventCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const statusColors = {
    draft: "bg-yellow-100 text-yellow-800",
    published: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800"
  };

  const handleDelete = () => {
    onDelete(event.code);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{event.name}</h3>
          <Badge variant="secondary" className={statusColors[event.status]}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>

        <p className="text-muted-foreground mb-6 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>Máx. {event.maxParticipants} participantes</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/admin/events/${event.code}/edit`} className="flex-1">
            <Button className="w-full">
              Editar
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      <DeleteEventDialog
        isOpen={showDeleteDialog}
        eventName={event.name}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}