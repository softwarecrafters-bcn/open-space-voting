import mongoose, { Schema, Document } from "mongoose";

export interface ITheme extends Document {
  title: string;
  description: string;
  author: string;
  tags?: string[];
  schedule?: string;
  votes: number;
  votedBy: string[];
  event: mongoose.Types.ObjectId;
}

const ThemeSchema = new Schema<ITheme>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true }, // Puede ser un ID de usuario
    tags: { type: [String], default: [] },
    schedule: { type: String, default: null }, // Horario opcional
    votes: { type: Number, default: 0 }, // Número de votos inicializado en 0
    votedBy: { type: [String], default: [] }, // Lista de usuarios que votaron
    event: { type: Schema.Types.ObjectId, ref: "Event" },
  },
  { timestamps: true }
);

// Exportamos el modelo asegurando que no se sobreescriba si ya existe
export default mongoose.models.Theme || mongoose.model<ITheme>("Theme", ThemeSchema);
