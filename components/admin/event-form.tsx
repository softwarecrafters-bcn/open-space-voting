"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OpenSpaceEvent } from "@/lib/types";
import { LockOpen, Lock, ThumbsUp } from "lucide-react";
import { createEvent, updateEvent } from "@/app/actions/events";

interface EventFormProps {
  initialEvent: OpenSpaceEvent | Partial<OpenSpaceEvent>;
  mode: "create" | "edit";
}

export function EventForm({ initialEvent, mode }: EventFormProps): React.JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: mode === 'create' ? '' : initialEvent.id,
    code: initialEvent?.code ?? "",
    name: initialEvent?.name ?? "",
    description: initialEvent?.description ?? "",
    date: initialEvent?.date ?? "",
    location: initialEvent?.location ?? "",
    maxParticipants: initialEvent?.maxParticipants?.toString() ?? "",  
    rooms: initialEvent?.rooms?.toString() ?? "",
    roomsStartAt: initialEvent?.roomsStartAt ?? "",
    roomsEndAt: initialEvent?.roomsEndAt ?? "",
    allowProposals: initialEvent?.allowProposals ?? false,
    allowVoting: initialEvent?.allowVoting ?? false,
    status: initialEvent?.status ?? "draft"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const stateKey = id === 'spaceCode' ? 'code' : id;
    setFormData(prev => ({ ...prev, [stateKey]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const eventData = {
        ...formData,
        maxParticipants: parseInt(formData.maxParticipants),
        rooms: parseInt(formData.rooms),
        roomsStartAt: formData.roomsStartAt,
        roomsEndAt: formData.roomsEndAt,
      };

      if (mode === 'create') {
        // Aquí deberías llamar a una función para crear el evento
        await createEvent(eventData);
        console.log("Evento creado:", eventData);
        router.replace("/admin/dashboard", { scroll: false });
      } else {
        await updateEvent(formData.id ?? "", eventData);
      }
      
      router.replace("/admin/dashboard", { scroll: false });

    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <Card className="p-4 md:p-6">
      {mode === 'edit' && (
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
            <div className="flex items-center gap-4">
              {formData.allowProposals ? (
                <LockOpen className="w-6 h-6 text-green-600" />
              ) : (
                <Lock className="w-6 h-6 text-red-600" />
              )}
              <div>
                <h3 className="font-semibold mb-1">Propuesta de Temas</h3>
                <p className="text-sm text-muted-foreground">
                  {formData.allowProposals 
                    ? "Los participantes pueden proponer temas" 
                    : "La propuesta de temas está cerrada"}
                </p>
              </div>
            </div>
            <Switch
              checked={formData.allowProposals}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allowProposals: checked }))}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4">
            <div className="flex items-center gap-4">
              {formData.allowVoting ? (
                <ThumbsUp className="w-6 h-6 text-green-600" />
              ) : (
                <ThumbsUp className="w-6 h-6 text-red-600" />
              )}
              <div>
                <h3 className="font-semibold mb-1">Votación de Temas</h3>
                <p className="text-sm text-muted-foreground">
                  {formData.allowVoting 
                    ? "Los participantes pueden votar los temas" 
                    : "La votación de temas está cerrada"}
                </p>
              </div>
            </div>
            <Switch
              checked={formData.allowVoting}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allowVoting: checked }))}
            />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="spaceCode">ID Open Space</Label>
          <Input
            id="spaceCode"
            placeholder="Ej: os-2024"
            value={formData.code}
            onChange={handleChange}
            required
          />
          <p className="text-sm text-muted-foreground">
            Este ID será usado por los participantes para acceder al evento
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Estado del Evento</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'draft' | 'published' | 'completed' }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Borrador</SelectItem>
              <SelectItem value="published">Publicado</SelectItem>
              <SelectItem value="completed">Completado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nombre del Evento</Label>
          <Input
            id="name"
            placeholder="Ej: Tech Innovation Summit 2024"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            placeholder="Describe el propósito y objetivos del evento..."
            className="min-h-[100px]"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="rooms">Número de Salas</Label>
            <Input
              id="rooms"
              type="number"
              min="1"
              max="5"
              placeholder="1"
              value={formData.rooms}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxParticipants">Número Máximo de Participantes</Label>
            <Input
              id="maxParticipants"
              type="number"
              min="1"
              placeholder="100"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              placeholder="Ej: Madrid"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="roomsStartAt">Hora inicio</Label>
            <Input
              id="roomsStartAt"
              type="time"
              value={formData.roomsStartAt ?? "09:00"}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomsEndAt">Hora fin</Label>
            <Input
              id="roomsEndAt"
              type="time"
              value={formData.roomsEndAt ?? "10:00"}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            {mode === 'create' ? 'Crear Evento' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </Card>
  );
}