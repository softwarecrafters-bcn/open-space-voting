import { SessionPageClient } from "./session-page-client";
import { getThemeById } from "@/app/actions/themes";
import { Theme } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "@/lib/i18n/request";

export default async function SessionPage(
  props: Readonly<{
    params: Promise<{ id: string }>;
  }>
) {
  const params = await props.params;
  const currentTheme: Theme | null = await getThemeById(params.id);
  const translations = await getTranslations();

  if (!currentTheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">
            {translations.sessionPage.notFound.title}
          </h1>
          <p className="text-muted-foreground">
            {translations.sessionPage.notFound.description}
          </p>
          <Link href="/agenda" className="mt-4 inline-block">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {translations.sessionPage.notFound.backToAgenda}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container py-4">
        <Link href="/agenda">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {translations.sessionPage.notFound.backToAgenda}
          </Button>
        </Link>
      </div>
      <SessionPageClient
        initialSession={{
          id: currentTheme.id ?? "",
          themeId: currentTheme.id ?? "",
          participants: currentTheme.votedBy,
          notes: "",
          title: currentTheme.title,
          votes: currentTheme.votes,
          description: currentTheme.description ?? "",
          tags: currentTheme.tags ?? [],
          createdBy: currentTheme.author,
        }}
      />
    </div>
  );
}
