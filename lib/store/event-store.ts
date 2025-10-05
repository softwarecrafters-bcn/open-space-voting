import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OpenSpaceAccess } from '@/lib/types'

interface Event {
  id: string
  name?: string
  code?: string
  description?: string
  location?: string
  maxParticipants?: number
  rooms?: number
  roomsStartAt?: string
  roomsEndAt?: string
  date?: string
  status?: string
  allowProposals?: boolean
  allowVoting?: boolean
  access?: OpenSpaceAccess | null
}

interface EventStore {
  currentEvent: Event | null
  setCurrentEvent: (event: Event | null) => void
  getStoredEvent: () => Event | null
  clearStore: () => void
}

export const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      currentEvent: null,
      setCurrentEvent: (event) => set({ currentEvent: event }),
      getStoredEvent: () => get().currentEvent,
      clearStore: () => set({ currentEvent: null }),
    }),
    {
      name: 'event-storage',
    }
  )
)

// Función auxiliar para obtener el evento almacenado
export const getStoredEvent = (): Event | null => {
  return useEventStore.getState().currentEvent
} 