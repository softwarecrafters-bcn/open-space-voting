import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  provider: "google" | "github";
  providerId: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "user";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
