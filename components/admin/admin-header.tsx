"use client";

import { useState } from "react";
import { useAccess } from "@/lib/context/access-context";
import { Card } from "@/components/ui/card";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogoutDialog } from "@/components/auth/logout-dialog";

export function AdminHeader() {
  const router = useRouter();
  const { access, setAccess } = useAccess();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (!access?.isAdmin) {
    return null;
  }

  const handleLogout = () => {
    setAccess(null);
    router.push("/");
    setShowLogoutDialog(false);
  };

  return (
    <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="mr-4">
          <Link href="/admin/dashboard" className="font-bold hover:text-primary text-sm md:text-base">
            SCBCN Open Space App
          </Link>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />
          <Card className="hidden md:flex items-center gap-4 px-4 py-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{access.username}</span>
            </div>
            <div className="h-4 w-px bg-muted" />
            <div className="text-sm text-muted-foreground">
              Admin
            </div>
          </Card>
          <Card className="md:hidden flex flex-col items-start px-3 py-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium">{access.username}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Admin
            </div>
          </Card>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowLogoutDialog(true)}
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <LogoutDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}