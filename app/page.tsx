"use client";

import { Button } from "@/components/ui/button";
import { AccessForm } from "@/components/auth/access-form";
import { WelcomeContent } from "@/components/home/welcome-content";
import Link from "next/link";
import {  useEventStore } from "@/lib/store/event-store";
import { useAuthStore } from "@/lib/store/auth-store";
import { useLanguageStore } from "@/lib/store/language-store";

export default function Home() {

  const user = useAuthStore((state) => state.user);
  const sessionEvent = useEventStore((state) => state.currentEvent);
  const translations = useLanguageStore((state) => state.translations);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {!sessionEvent ? (
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold mb-8">{translations.welcome.title}</h1>
              <AccessForm  />
            </div>
          ) : (
            <WelcomeContent />
          )}
        </div>
      </section>

      {/* Rules Section - Only show when logged in */}
      {user?.name && (
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{translations.principles.title}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                translations.principles.rules.rule1,
                translations.principles.rules.rule2,
                translations.principles.rules.rule3,
                translations.principles.rules.rule4
              ].map((rule, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{rule.title}</h3>
                  <p className="text-muted-foreground">{rule.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {user?.name && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{translations.welcome.ready}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {translations.welcome.joinUs}
            </p>
            <Link href="/proponer">
              <Button size="lg">{translations.welcome.propose}</Button>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}