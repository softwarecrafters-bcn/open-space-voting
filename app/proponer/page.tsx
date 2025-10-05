"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createTheme } from "../actions/themes";
import { useSession } from "next-auth/react";
import { useEventStore } from "@/lib/store/event-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { useLanguageStore } from "@/lib/store/language-store";

export default function ProposePage() {
  const router = useRouter();
  
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const { data: session } = useSession();
  const translations = useLanguageStore((state) => state.translations);


  const event = useEventStore((state) => state.currentEvent);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user?.email) {
      router.push("/");
    }
  }, [event, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event?.allowProposals) {
      return;
    }

    const newTheme = {
      title,
      description,
      author: user?.name ?? "Anonymous",
      tags: tags.split(",").map(tag => tag.trim()),
      votes: 0,
      votedBy: [],
      event: event?.id || ""
    };

    createTheme(newTheme).then(() => {
      console.log("Theme created");
      router.push("/votar");
    });

    // Reset form
    setTitle("");
    setDescription("");
    setTags("");
  };

  if (!event) {
    return null;
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{translations.proposePage.title}</h1>

        {!event.allowProposals && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{translations.proposePage.proposalsClosed}</AlertTitle>
            <AlertDescription>
              {translations.proposePage.proposalsClosedDescription}
            </AlertDescription>
          </Alert>
        )}
        
        <Card className="p-6 mb-8">
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{translations.proposePage.openSpaceId}</Label>
              <Input value={event?.code || ""} disabled />
            </div>
            <div className="space-y-2">
              <Label>{translations.proposePage.user}</Label>
              <Input value={session?.user?.name || ""} disabled />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">{translations.proposePage.form.topicTitle}</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={translations.proposePage.form.topicTitlePlaceholder}
                required
                disabled={!event.allowProposals}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{translations.proposePage.form.description}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={translations.proposePage.form.descriptionPlaceholder}
                className="min-h-[150px]"
                required
                disabled={!event.allowProposals}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">{translations.proposePage.form.tags}</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder={translations.proposePage.form.tagsPlaceholder}
                disabled={!event.allowProposals}
              />
            </div>

            <Button type="submit" className="w-full" disabled={!event.allowProposals}>
              {translations.proposePage.form.submit}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}