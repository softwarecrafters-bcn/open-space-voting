"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { User, LogOut, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogoutDialog } from "@/components/auth/logout-dialog";
import { useAuthStore } from "@/lib/store/auth-store";
import { useEventStore } from "@/lib/store/event-store";
import { signOut } from "next-auth/react";
import { LanguageSelector } from "@/components/language-selector";

export function Header() {
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const user = useAuthStore((state) => state.user);
  const event = useEventStore((state) => state.currentEvent);
  const authenticated = useAuthStore((state) => state.isAuthenticated);

  if (!user  || !authenticated) {
    return null;
  }

  const handleLogout = () => {
    useAuthStore.getState().logout();
    useEventStore.getState().clearStore();
    signOut()
    setShowLogoutDialog(false);
    router.push("/");
  };

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-2 sm:px-4 md:px-8">
          <div className="flex items-center gap-4 overflow-hidden">
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:text-primary"
            >
              <Home className="h-4 w-4 sm:hidden" />
              <span className="font-bold text-xs sm:text-sm md:text-base whitespace-nowrap hidden sm:block">
                SCBCN Open Space
              </span>
            </Link>
            {user.role === "admin" && (
              <Link 
                href="/admin/dashboard" 
                className="flex items-center gap-2 hover:text-primary"
              >
                <LayoutDashboard className="h-4 w-4 sm:hidden" />
                <span className="font-bold text-xs sm:text-sm md:text-base whitespace-nowrap hidden sm:block">
                  Admin dashboard
                </span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <LanguageSelector />
            <ThemeToggle />
            <Card className="hidden sm:flex items-center gap-2 md:gap-4 px-2 md:px-4 py-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs md:text-sm font-medium truncate max-w-[100px] md:max-w-[150px]">
                  {user.name}
                </span>
              </div>
              {event && (
                <>
                  <div className="h-4 w-px bg-muted" />
                  <div className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                    ID: {event?.code}
                  </div>
                </>
              )}
            </Card>
            <Card className="sm:hidden flex flex-col items-start px-2 py-1">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-medium truncate max-w-[80px]">
                  {user.name}
                </span>
              </div>
              {event && (
                <div className="text-[10px] text-muted-foreground">
                  ID: {event?.code}
                </div>
              )}
            </Card>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowLogoutDialog(true)}
              title="Cerrar sesión"
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </header>

      <LogoutDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}