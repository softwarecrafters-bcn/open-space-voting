"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { OpenSpaceAccess } from "@/lib/types";
import { getStoredEvent, useEventStore } from "@/lib/store/event-store";

interface AccessContextType {
  access: OpenSpaceAccess | null;
  setAccess: (access: OpenSpaceAccess | null) => void;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export function AccessProvider({ children }: { children: ReactNode }) {
  const [access, setAccess] = useState<OpenSpaceAccess | null>(null);
  const setCurrentEvent = useEventStore((state) => state.setCurrentEvent);

  // Cargar los datos del evento almacenados al montar el componente
  useEffect(() => {
    const storedEvent = getStoredEvent();
    if (storedEvent?.access) {
      setAccess(storedEvent.access);
    }
  }, []);

  const handleSetAccess = (newAccess: OpenSpaceAccess | null) => {
    setAccess(newAccess);
    const currentEvent = getStoredEvent();
    if (currentEvent) {
      setCurrentEvent({ ...currentEvent, access: newAccess });
    }
  };

  return (
    <AccessContext.Provider value={{ access, setAccess: handleSetAccess }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (context === undefined) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
}