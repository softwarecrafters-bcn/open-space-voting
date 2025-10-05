"use client";

import { Theme } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useLanguageStore } from "@/lib/store/language-store";

interface ThemeCardProps {
  theme: Theme;
  onVote: (themeId: string, remove?: boolean) => void;
  hasVoted: boolean;
  allowVoting?: boolean;
  votes: number;
}

export function ThemeCard({
  theme,
  onVote,
  hasVoted,
  allowVoting = true,
  votes,
}: ThemeCardProps) {
  const [isVoting, setIsVoting] = useState(false);
  const translations = useLanguageStore((state) => state.translations);

  const handleVote = async () => {
    if (!allowVoting) return;

    setIsVoting(true);
    try {
      await onVote(theme.id ?? "", hasVoted);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{theme.title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {votes || theme.votes} {translations.themeCard.votes}
          </span>
          <Button
            variant={hasVoted ? "secondary" : "default"}
            size="sm"
            onClick={handleVote}
            disabled={isVoting || !allowVoting}
            className="gap-2"
          >
            <ThumbsUp className={`w-4 h-4 ${hasVoted ? "fill-current" : ""}`} />
            {hasVoted
              ? translations.themeCard.voted
              : translations.themeCard.vote}
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground mb-4">{theme.description}</p>

      <div className="flex flex-wrap gap-2">
        {theme.tags?.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        {translations.themeCard.proposedBy} {theme.author}
      </div>
    </Card>
  );
}
