"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { OpenSpaceEvent } from "@/lib/types";
import { LockOpen, Lock, ThumbsUp } from "lucide-react";

interface EditEventPageClientProps {
  event: OpenSpaceEvent;
}

export function EditEventPageClient({ event: initialEvent }: EditEventPageClientProps) {
  const router = useRouter();
  const [event, setEvent] = useState<OpenSpaceEvent>(initialEvent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save to backend
    router.push("/admin/dashboard");
  };

  const toggleProposals = () => {
    setEvent(prev => ({
      ...prev,
      allowProposals: !prev.allowProposals,
      updatedAt: new Date().toISOString()
    }));
  };

  const toggleVoting = () => {
    setEvent(prev => ({
      ...prev,
      allowVoting: !prev.allowVoting,
      updatedAt: new Date().toISOString()
    }));
  };

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Editar Open Space</h1>
        
        <Card className="p-6 mb-6">
          <div className="space-y-4 mb-6">
            {/* Control de propuestas */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                {event.allowProposals ? (
                  <LockOpen className="w-6 h-6 text-green-600" />
                ) : (
                  <Lock className="w-6 h-6 text-red-600" />
                )}
                <div>
                  <h3 className="font-semibold mb-1">Propuesta de Temas</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.allowProposals 
                      ? "Los participantes pueden proponer temas" 
                      : "La propuesta de temas está cerrada"}
                  </p>
                </div>
              </div>
              <Switch
                checked={event.allowProposals}
                onCheckedChange={toggleProposals}
              />
            </div>

            {/* Control de votaciones */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                {event.allowVoting ? (
                  <ThumbsUp className="w-6 h-6 text-green-600" />
                ) : (
                  <ThumbsUp className="w-6 h-6 text-red-600" />
                )}
                <div>
                  <h3 className="font-semibold mb-1">Votación de Temas</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.allowVoting 
                      ? "Los participantes pueden votar los temas" 
                      : "La votación de temas está cerrada"}
                  </p>
                </div>
              </div>
              <Switch
                checked={event.allowVoting}
                onCheckedChange={toggleVoting}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Evento</Label>
              <Input
                id="name"
                value={event.name}
                onChange={(e) => setEvent(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={event.description}
                onChange={(e) => setEvent(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={event.date}
                  onChange={(e) => setEvent(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={event.location}
                  onChange={(e) => setEvent(prev => ({ ...prev, location: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Número Máximo de Participantes</Label>
              <Input
                id="maxParticipants"
                type="number"
                min="1"
                value={event.maxParticipants}
                onChange={(e) => setEvent(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                required
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}