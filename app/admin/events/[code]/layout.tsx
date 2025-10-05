"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (user?.email !== "softwarecraftersbcn@gmail.com") {
      router.push("/");
    }
  }, [user, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}