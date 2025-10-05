"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { OpenSpaceAccess } from "@/lib/types";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SocialLogin } from "./social-login";
import { getEventByCode } from "@/app/actions/events";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "../theme/theme-toggle";
import { useEventStore } from "@/lib/store/event-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { useRouter } from "next/navigation";
import { LanguageSelector } from "../language-selector";
import { useLanguageStore } from "@/lib/store/language-store";


interface Event {
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
  status: string;
  allowProposals: boolean;
  allowVoting: boolean;
}

export function AccessForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [spaceId, setSpaceId] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const translations = useLanguageStore((state) => state.translations);

  useEffect(() => {
    if (session) {
      setUsername(session.user?.name || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const event = await getEventByCode(spaceId);
    if (spaceId === event?.code && event.status === 'published') {
      useEventStore.setState({
        currentEvent: {
          id: event.id,
          code: event.code,
          name: event.name,
          description: event.description,
          date: event.date,
          location: event.location,
          maxParticipants: event.maxParticipants,
          rooms: event.rooms,
          roomsStartAt: event.roomsStartAt,
          roomsEndAt: event.roomsEndAt,
          status: event.status,
          allowProposals: event.allowProposals,
          allowVoting: event.allowVoting

        }
      });

      useEventStore.persist.rehydrate();

      const user = {
        id: "",
        name: session?.user?.name ?? "",
        email: session?.user?.email ?? "",
        role: "user"
      }
      useAuthStore.setState({ user, isAuthenticated: true });
      useAuthStore.persist.rehydrate();
      
    } else {
      setError(translations.accessForm.wrongOpenSpaceId);
    }

    if(session?.user.email === "softwarecraftersbcn@gmail.com"){
      const user = {
        id: "",
        name: session?.user?.name ?? "",
        email: session?.user?.email ?? "",
        role: "admin"
      }
      useAuthStore.setState({ user, isAuthenticated: true });
      useAuthStore.persist.rehydrate();

      spaceId === "" ? router.push("/admin/dashboard") : router.push("/");
      return;
    }

    if (!spaceId.trim() || !username.trim()) {
      setError(translations.accessForm.errorOpenSpaceId);
      return;
    }
  };

  return (
    <>
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
          <div className="mr-4">

            <Link href="/" className="font-bold hover:text-primary text-sm md:text-base">
              SCBCN Open Space App
            </Link>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>


    <Card className="w-full max-w-md p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold">{translations.accessForm.title}</h2>
        
      </div>

      <div className="space-y-6">
        <div className="relative">
          {username && (
            <>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
              {translations.accessForm.accessAs} <span className="font-bold text-primary">{username}</span>
              </p>
            </div>
            <div className="text-center p-6">
              <Button variant="outline" onClick={() => signOut()}>🔄 {translations.accessForm.useOtherAccount}</Button>
              </div>
            </>
          )}

          {!username && (
            <>
              <p className="text-sm text-muted-foreground mt-1">
              {translations.accessForm.useGoogleOrGithub}
              </p>
              <SocialLogin spaceId={spaceId} />
            </>
          )}

        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="spaceId">Open Space ID</Label>
          <Input
            id="spaceId"
            type="text"
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
            placeholder={translations.accessForm.insertOpenSpaceId}
            required
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            
          </div>

          { session?.user.email ? (
            <Button type="submit" className="w-full">
              🚀 {translations.accessForm.title}
            </Button>
          ) : <p>{translations.accessForm.settingUpOpenSpace}</p>}
        </form>
        {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
        
      </div>
    </Card>
    </>
  );
}