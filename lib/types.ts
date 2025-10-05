export interface Theme {
  id?: string;
  title: string;
  description: string;
  author: string;
  tags?: string[];
  schedule?: string;
  votes: number;
  votedBy: string[];
  event: string;
  time?: string;
  location?: string;
  participantCount?: number;
}

export interface Session {
  id: string;
  themeId: string;
  participants: string[];
  notes: string;
  videoCallUrl?: string;
}

export interface Result {
  id: string;
  themeId: string;
  summary: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface OpenSpaceAccess {
  spaceId: string;
  username: string;
  isAdmin?: boolean;
}

export interface OpenSpaceEvent {
  id: string;
  code: string;
  name: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
  rooms: number;
  roomsStartAt: string;
  roomsEndAt: string;
  status: 'draft' | 'published' | 'completed';
  createdAt: string;
  updatedAt: string;
  allowProposals: boolean;
  allowVoting: boolean;

}