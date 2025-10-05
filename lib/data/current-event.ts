import { OpenSpaceEvent } from "@/lib/types";

// Mock data - In a real app, this would come from your backend
export async function getCurrentEvent(spaceId: string): Promise<OpenSpaceEvent | null> {
  // Mock event data
  const event: OpenSpaceEvent = {
    id: spaceId,
    code: spaceId,
    name: "Tech Innovation Summit 2024",
    description: "Un espacio para compartir las últimas tendencias en tecnología y fomentar la innovación colaborativa en nuestra comunidad de desarrolladores.",
    date: "2024-06-15",
    location: "Madrid",
    maxParticipants: 100,
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    allowProposals: true,
    allowVoting: true,
    rooms: 3,
    roomsStartAt: "09:00",
    roomsEndAt: "18:00"
  };

  return event;
}