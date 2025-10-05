"use client";

import { Session, Theme } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Video, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguageStore } from "@/lib/store/language-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface SessionDetailsProps {
  session: Session;
  theme: Theme;
  onJoin: () => void;
  isParticipant: boolean;
}

export function SessionDetails({ session, theme, onJoin, isParticipant }: SessionDetailsProps) {
  const translations = useLanguageStore((state) => state.translations);
  const user = useAuthStore((state) => state.user);
  const authenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  useEffect(() => {
    if (!user || !authenticated) {
      router.push("/");
    }
  }, [user, authenticated, router]);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{theme.title}</h1>
          <div className="flex gap-2 flex-wrap">
            {theme.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {/* <Button
          onClick={onJoin}
          disabled={isParticipant}
          className="gap-2"
        >
          <Users className="w-4 h-4" />
          {isParticipant ? "Ya participas" : "Unirme"}
        </Button> */}
      </div>

      <p className="text-muted-foreground mb-6">{theme.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold">{translations.sessionCard.votes}: {theme.votes}</h3>
          </div>
          
        </Card>

        {/* {session.videoCallUrl && (
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold">Videollamada</h3>
            </div>
            <Button variant="link" className="p-0" asChild>
              <a href={session.videoCallUrl} target="_blank" rel="noopener noreferrer">
                Unirse a la llamada
              </a>
            </Button>
          </Card>
        )} */}
      </div>

      {/* <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">Notas de la sesión</h3>
        </div>
        <Card className="p-4 min-h-[200px] bg-muted/50">
          <p className="text-muted-foreground whitespace-pre-wrap">{session.notes || "Aún no hay notas para esta sesión."}</p>
        </Card>
      </div> */}
    </Card>
  );
}