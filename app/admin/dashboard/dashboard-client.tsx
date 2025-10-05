"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OpenSpaceEvent } from "@/lib/types";
import { EventCard } from "@/components/admin/event-card";
import { useAuthStore } from "@/lib/store/auth-store";

export function DashboardClient({ initialEvents }: { initialEvents: OpenSpaceEvent[] }) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleDeleteEvent = (eventCode: string) => {
    setEvents(events.filter(event => event.code !== eventCode));
  };

  useEffect(() => {
    if (user?.email !== "softwarecraftersbcn@gmail.com") {
      router.replace("/");
    }
  }, [user, router]);

  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard 
          key={event.code} 
          event={event}
          onDelete={handleDeleteEvent}
        />
      ))}
    </div>
  );
} 