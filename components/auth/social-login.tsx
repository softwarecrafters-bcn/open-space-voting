"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useLanguageStore } from "@/lib/store/language-store";

interface SocialLoginProps {
  spaceId: string;
}

export function SocialLogin({ spaceId }: SocialLoginProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const translations = useLanguageStore((state) => state.translations);
  const handleSocialLogin = async (provider: "google" | "github") => {
    

    setIsLoading(provider);
    try {
      await signIn(provider, {
        callbackUrl: "/",
        redirect: true,
        spaceId,
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="grid gap-4 w-full">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("google")}
        disabled={ isLoading !== null}
        className="gap-2"
      >
        {isLoading === "google" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        )}
        {translations.accessForm.socialMedia.google}
      </Button>

      <Button
        variant="outline"
        onClick={() => handleSocialLogin("github")}
        disabled={ isLoading !== null}
        className="gap-2"
      >
        {isLoading === "github" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Github className="w-5 h-5" />
        )}
        {translations.accessForm.socialMedia.github}
      </Button>

      
    </div>
  );
}