import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";  

if (!MONGODB_URI) {
  throw new Error("⚠️  La variable de entorno MONGODB_URI no está definida.");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "open_space",
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
