import { Session, Theme } from "@/lib/types";

// Mock data - In a real app, this would come from your backend
export const mockSessions: Record<string, Session & { theme: Theme }> = {
  "1": {
    id: "1",
    themeId: "theme1",
    participants: ["user2", "user3"],
    notes: "Notas de la sesión sobre Next.js 13:\n\n- Server Components vs Client Components\n- App Router\n- Data Fetching patterns\n- Streaming y Suspense",
    videoCallUrl: "https://meet.example.com/session1",
    theme: {
      id: "theme1",
      title: "Introducción a Next.js 13",
      description: "Exploraremos las nuevas características de Next.js 13, incluyendo el App Router, Server Components, y las mejores prácticas para construir aplicaciones modernas.",
      author: "María García",
      tags: ["Next.js", "React", "Frontend"],
      votes: 8,
      votedBy: ["user1", "user2"],
      event: "TIS2024"
    }
  },
  "2": {
    id: "2",
    themeId: "theme2",
    participants: ["user1", "user4"],
    notes: "",
    videoCallUrl: "https://meet.example.com/session2",
    theme: {
      id: "theme2",
      title: "Clean Architecture en React",
      description: "Patrones y prácticas para mantener un código limpio y mantenible en aplicaciones React de gran escala.",
      author: "Carlos Ruiz",
      tags: ["React", "Arquitectura", "Buenas Prácticas"],
      votes: 6,
      votedBy: ["user3", "user4"],
      event: "TIS2024"
    }
  }
};