"use client";

import { useEffect } from "react";
import { ThemeCard } from "@/components/themes/theme-card";
import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getThemesByEventCode, voteTheme } from "../actions/themes";
import { useSession } from "next-auth/react";
import { useEventStore } from "@/lib/store/event-store";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { Theme } from "@/lib/types";
import { useLanguageStore } from "@/lib/store/language-store";
import useWebSocket from "react-use-websocket";

export default function VotePage() {
  const router = useRouter();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const translations = useLanguageStore((state) => state.translations);
  const event = useEventStore((state) => state.currentEvent);
  const authenticated = useAuthStore((state) => state.isAuthenticated);

  const { lastJsonMessage } = useWebSocket<{
    votes: Record<string, number>;
  }>(`wss://${process.env.NEXT_PUBLIC_WORKER_URL}/api/votes/${event?.id}`, {
    onOpen: () => {
      console.log("WebSocket connection opened");
    },
    onClose: () => {
      console.log("WebSocket connection closed");
    },
    onError: (error) => {
      console.log("WebSocket connection error", error);
    },
  });

  const votes = lastJsonMessage?.votes;

  useEffect(() => {
    if (!authenticated) {
      router.push("/");
      return;
    }

    const loadEventAndThemes = async () => {
      try {
        setIsLoading(true);
        if (!event?.code) return;
        if (event?.allowVoting) {
          const themesData = await getThemesByEventCode(event.code);
          setThemes(themesData);
        }
      } catch (error) {
        console.error("Error loading event data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEventAndThemes();
  }, []);

  const handleVote = async (themeId: string) => {
    console.log("session", event?.allowVoting);

    if (!event?.allowVoting) {
      return;
    }

    try {
      const updatedTheme = await voteTheme(
        event.id,
        themeId,
        session?.user?.name ?? ""
      );

      if (updatedTheme) {
        setThemes((prevThemes) =>
          prevThemes.map((theme) =>
            theme.id === themeId ? updatedTheme : theme
          )
        );
      }
    } catch (error) {
      console.error("Error al votar:", error);
    }
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          {translations.votePage.title}
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {!event?.allowVoting && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{translations.votePage.votingClosed}</AlertTitle>
                <AlertDescription>
                  {translations.votePage.votingClosedDescription}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              {themes.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  onVote={handleVote}
                  votes={votes?.[theme?.id ?? ""] ?? 0}
                  hasVoted={theme.votedBy.includes(session?.user?.name ?? "")}
                  allowVoting={event?.allowVoting}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
