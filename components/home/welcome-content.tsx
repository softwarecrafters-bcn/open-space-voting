"use client";

import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useEventStore } from "@/lib/store/event-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { useLanguageStore } from "@/lib/store/language-store";

export function WelcomeContent() {
  const event = useEventStore((state) => state.currentEvent);
  const user = useAuthStore((state) => state.user);
  const translations = useLanguageStore((state) => state.translations);

  if (!event || !user) {
    console.log("No event found");
    console.log("No user found");
    return null;
  }

  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent px-4 text-center">
        {event.name}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4 text-center">
        {event.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
        <Link href="/proponer" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto gap-2">
            <MessageSquare className="w-4 h-4" />
            {translations.welcome.propose}
          </Button>
        </Link>
        <Link href="/votar" className="w-full sm:w-auto">
          <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
            <ThumbsUp className="w-4 h-4" />
            {translations.welcome.vote}
          </Button>
        </Link>
        <Link href="/agenda" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
            <Calendar className="w-4 h-4" />
            {translations.welcome.agenda}
          </Button>
        </Link>
      </div>
    </>
  );
}