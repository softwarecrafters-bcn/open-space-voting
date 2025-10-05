import { OpenSpaceEvent } from "@/lib/types";
import { getEvents } from "@/app/actions/events";


export async function getEvent(code: string): Promise<OpenSpaceEvent | null> {
  const events = await getEvents();
  const event = events.find(e => e.code === code);
  if (!event) return null;
  
  return {
    code: event.code,
    name: event.name,
    description: event.description,
    date: event.date,
    location: event.location,
    status: event.status,
    maxParticipants: event.maxParticipants || 100,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    allowProposals: event.allowProposals,
    allowVoting: event.allowVoting,
    id: event.id,
    rooms: event.rooms || 3,
    roomsStartAt: event.roomsStartAt || "09:00",
    roomsEndAt: event.roomsEndAt || "18:00"
  };
}

export async function getEventIds(): Promise<{ code: string }[]> {
  const events = await getEvents();
  return events.map(event => ({
    code: event.code,
  }));
}

export async function getAllEvents(): Promise<OpenSpaceEvent[]> {
  const events = await getEvents();
  return events.map(event => ({
    code: event.code,
    name: event.name,
    description: event.description,
    date: event.date,
    location: event.location,
    status: event.status,
    maxParticipants: event.maxParticipants || 100,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    allowProposals: event.allowProposals,
    allowVoting: event.allowVoting,
    id: event.id,
    rooms: event.rooms || 3,
    roomsStartAt: event.roomsStartAt || "09:00",
    roomsEndAt: event.roomsEndAt || "18:00"
  }));
}