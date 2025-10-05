"use server";

import { connectDB } from "@/lib/mongoose";
import Theme, { ITheme } from "@/models/Theme";
import mongoose from "mongoose";
import { Theme as OpenSpaceTheme } from "@/lib/types";
import Event from "@/models/Event";

export const getThemesByEventId = async (eventId: string) => {
  await connectDB();
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    console.error("ID de evento inválido:", eventId);
    return [];
  }

  try {
    const themes = await Theme.find({
      event: new mongoose.Types.ObjectId(eventId),
    });
    return themes;
  } catch (error) {
    console.error("Error buscando temas:", error);
    return [];
  }
};

export const getThemesByEventCode = async (eventCode: string) => {
  await connectDB();
  try {
    const event = await Event.findOne({ code: eventCode });

    if (!event) {
      console.error("Evento no encontrado con código:", eventCode);
      return [];
    }

    const themes = await Theme.find({ event: event._id });
    const changeStream = Theme.watch();

    changeStream.on("change", (change) => {
      console.log(change);
    });
    // Aplanamos los objetos de Mongoose
    return themes.map((theme) => ({
      id: theme._id.toString(),
      title: theme.title,
      description: theme.description,
      author: theme.author,
      tags: theme.tags,
      schedule: theme.schedule,
      votes: theme.votes,
      votedBy: theme.votedBy,
      event: theme.event.toString(),
    }));
  } catch (error) {
    console.error("Error buscando temas:", error);
    return [];
  }
};

export const getThemeById = async (themeId: string) => {
  await connectDB();
  const theme = await Theme.findById(themeId);
  return theme;
};

type ThemeInput = Pick<
  ITheme,
  "title" | "description" | "author" | "tags" | "votes" | "votedBy" | "event"
>;

export async function createTheme(theme: OpenSpaceTheme) {
  await connectDB();
  try {
    const themeData = {
      title: theme.title,
      description: theme.description,
      author: theme.author,
      tags: theme.tags,
      votes: theme.votes,
      votedBy: theme.votedBy,
      event: new mongoose.Types.ObjectId(theme.event),
    };

    await Theme.create(themeData);
    console.log("Theme created with event:", themeData.event);
    return true;
  } catch (error) {
    console.error("Error creating theme:", error);
    throw error;
  }
}

export const updateTheme = async (theme: ITheme) => {
  await connectDB();
  const updatedTheme = await Theme.findByIdAndUpdate(theme._id, theme, {
    new: true,
  });
  return updatedTheme;
};

export const deleteTheme = async (themeId: string) => {
  await connectDB();
  await Theme.findByIdAndDelete(themeId);
};

export const getVotesByThemeId = async (themeId: string) => {
  await connectDB();
  const theme = await Theme.findById(themeId);
  const votes = theme?.votes;

  const changeStream = Theme.watch();

  changeStream.on("change", (change) => {
    console.log(change);
  });

  return votes;
};

export const voteTheme = async (
  eventId: string,
  themeId: string,
  username: string
) => {
  await connectDB();
  const theme = await Theme.findById(themeId);

  if (!theme) return false;

  let action = "POST";
  if (theme.votedBy.includes(username)) {
    theme.votedBy = theme.votedBy.filter(
      (votedBy: string) => votedBy !== username
    );
    theme.votes -= 1;
    action = "DELETE";
  } else {
    theme.votedBy.push(username);
    theme.votes += 1;
  }
  await fetch(
    `https://${process.env.NEXT_PUBLIC_WORKER_URL}/api/votes/${eventId}?topicId=${themeId}`,
    { method: action }
  );
  const updatedTheme = await Theme.findByIdAndUpdate(theme._id, theme, {
    new: true,
  });

  // Aplanamos el objeto antes de retornarlo
  return {
    id: updatedTheme?._id.toString(),
    title: updatedTheme?.title,
    description: updatedTheme?.description,
    author: updatedTheme?.author,
    tags: updatedTheme?.tags,
    schedule: updatedTheme?.schedule,
    votes: updatedTheme?.votes,
    votedBy: updatedTheme?.votedBy,
    event: updatedTheme?.event.toString(),
  };
};
