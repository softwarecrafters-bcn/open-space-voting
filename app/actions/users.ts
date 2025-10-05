'use server'

import { connectDB } from "@/lib/mongoose";
import User from '@/models/User';



export async function getUserByEmail(email: string) {
  await connectDB()
  const user = await User.findOne({ email })
  return user
}

