"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/admin/event-form";
import { useAuthStore } from "@/lib/store/auth-store";

export default function NewEventPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (user?.email !== "softwarecraftersbcn@gmail.com") {
      router.replace("/");
    }
  }, [user, router]);

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Crear Nuevo Open Space</h1>
        <EventForm 
          mode="create" 
          initialEvent={{
            id: "",
            name: "",
            description: "",
            date: "",
            location: "",
            code: "",
            status: "draft",
            maxParticipants: 0,
            rooms: 0,
            roomsStartAt: "",
            roomsEndAt: "",
            allowProposals: false,
            allowVoting: false
          }} 
        />
      </div>
    </main>
  );
}