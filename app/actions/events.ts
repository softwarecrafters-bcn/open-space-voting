"use server";

import { connectDB } from "@/lib/mongoose";
import Event, { IOpenSpaceEvent } from "@/models/Event";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

type EventInput = {
  code: string;
  name: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
  rooms: number;
  roomsStartAt: string;
  roomsEndAt: string;
  status: "draft" | "published" | "completed";
  allowProposals: boolean;
  allowVoting: boolean;

};

type EventWithId = IOpenSpaceEvent & { _id: mongoose.Types.ObjectId };

// Tipo para el objeto serializado que devolveremos
type SerializedEvent = {
  id: string;
  code: string;
  name: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
  rooms: number;
  roomsStartAt: string;
  roomsEndAt: string;
  status: "draft" | "published" | "completed";
  allowProposals: boolean;
  allowVoting: boolean;
  createdAt: string;
  updatedAt: string;

};

// Función auxiliar para serializar un evento
function serializeEvent(event: any): SerializedEvent {
  return {
    id: event._id.toString(),
    code: event.code,
    name: event.name,
    description: event.description,
    date: event.date,
    location: event.location,
    maxParticipants: Number(event.maxParticipants),
    rooms: Number(event.rooms),
    roomsStartAt: event.roomsStartAt,
    roomsEndAt: event.roomsEndAt,
    status: event.status,
    allowProposals: Boolean(event.allowProposals),
    allowVoting: Boolean(event.allowVoting),
    createdAt: event.createdAt?.toISOString() || '',
    updatedAt: event.updatedAt?.toISOString() || ''

  };
}

export async function getEvents() {
  await connectDB();
  const events = await Event.find().sort({ date: 1 }).lean();
  return events.map(serializeEvent);
}

export async function getEventByCode(code: string) {
  await connectDB();
  const event = await Event.findOne({ code }).lean();
  if (!event) return null;
  return serializeEvent(event);
}

export async function getEventById(id: string) {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  const event = await Event.findById(id).lean();
  if (!event) return null;
  return serializeEvent(event);
}

export async function createEvent(data: EventInput) {
  await connectDB();
  const newEvent = new Event({
    ...data,
    status: "draft",
    allowProposals: true,
    allowVoting: true,
  });
  await newEvent.save();
  revalidatePath("/admin/dashboard");
  return true;
}

export async function updateEvent(id: string, data: Partial<EventInput>) {
  console.log("updateEvent called", id, data);
  await connectDB();
  const event = await Event.findByIdAndUpdate(id, data, { new: true });
  return true;
}

export async function deleteEvent(id: string) {
  await connectDB();
  await Event.findByIdAndDelete(id);
}