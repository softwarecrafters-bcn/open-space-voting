"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ThumbsUp, User, Star } from "lucide-react";
import Link from "next/link";
import { Session } from "@/lib/types";
import { useLanguageStore } from "@/lib/store/language-store";

interface SessionCardProps {
  session: Session;
  title: string;
  time: string;
  location: string;
  participantCount: number;
  votes: number;
  author: string;
  isStarred?: boolean;
}

export function SessionCard({ session, title, time, location, participantCount, votes, author, isStarred }: SessionCardProps) {
  const translations = useLanguageStore((state) => state.translations);

  return (
    <Card className="relative p-4 hover:shadow-lg transition-shadow">
      {isStarred && (
        <div className="absolute top-2 right-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        </div>
      )}
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="space-y-2 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{votes} {translations.sessionCard.votes}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{translations.sessionCard.by} {author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
        {/* <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div> */}
        {/* <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{participantCount} {translations.sessionCard.participants}</span>
        </div> */}
      </div>
      <Link href={`/sesion/${session.id}`}>
        <Button className="w-full">{translations.sessionCard.viewDetails}</Button>
      </Link>
    </Card>
  );
}