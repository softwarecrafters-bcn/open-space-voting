"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { SessionCard } from "@/components/agenda/session-card";
import { TimeSlot } from "@/components/agenda/time-slot";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { useEventStore } from "@/lib/store/event-store";
import { getThemesByEventCode } from "../actions/themes";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { Theme } from "@/lib/types";
import { useLanguageStore } from "@/lib/store/language-store";

export default function AgendaPage() {
  const router = useRouter();
  const event = useEventStore((state) => state.currentEvent);
  const user = useAuthStore((state) => state.user);
  const authenticated = useAuthStore((state) => state.isAuthenticated);
  const [themes, setThemes] = useState<Theme[]>([]);
  const translations = useLanguageStore((state) => state.translations);

  useEffect(() => {

    if (!event?.code || !authenticated) {
      router.push("/");
    }



    const loadData = async () => {
      try {
        
        if (event?.code) {
          const themes = await getThemesByEventCode(event?.code);
          setThemes(themes);
          console.log("themes", themes);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    
    loadData();
  }, []);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{translations.agendaPage.title}</h1>
          
          {/* <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="min-w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(event?.date ? new Date(event?.date) : new Date(), "PPP", { locale: es })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={event?.date ? new Date(event?.date) : undefined}
                  //onSelect={(date) => date && setDate(date, event?.code)}
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div> */}
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes
              .toSorted((a, b) => (b.votes || 0) - (a.votes || 0))
              .map((theme, index) => (
                <SessionCard
                  key={theme.id}
                  session={{
                    id: theme.id ?? '',
                    themeId: theme.id ?? '',
                    participants: theme.votedBy,
                    notes: theme.description
                  }}
                  votes={theme.votes}
                  author={theme.author}
                  title={theme.title}
                  time={event?.roomsStartAt ?? ""}
                  location={theme.location ?? ""}
                  participantCount={theme.participantCount ?? 0}
                  isStarred={index < (event?.rooms ?? 0)}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}