import mongoose, { Schema, Document } from "mongoose";

export interface IOpenSpaceEvent extends Document {
  code: string;
  name: string;
  description: string;
  date: string;
  location: string;
  maxParticipants: number;
  rooms: number;
  roomsStartAt: string;
  roomsEndAt: string;
  status: "draft" | "published" | "completed";
  allowProposals: boolean;
  allowVoting: boolean;
  createdAt: string;
  updatedAt: string;
}

const EventSchema = new Schema<IOpenSpaceEvent>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true }, // Se mantiene como string para coincidir con la interfaz
    location: { type: String, required: true },
    maxParticipants: { type: Number, required: true, min: 1 },
    rooms: { type: Number, required: true, min: 1 },
    roomsStartAt: { type: String, required: false },
    roomsEndAt: { type: String, required: false },
    status: {
      type: String,
      enum: ["draft", "published", "completed"],
      default: "draft",
    },

    allowProposals: { type: Boolean, default: true },
    allowVoting: { type: Boolean, default: true },
  },
  { timestamps: true } // Esto añade `createdAt` y `updatedAt` automáticamente
);

export default mongoose.models.Event || mongoose.model<IOpenSpaceEvent>("Event", EventSchema);
