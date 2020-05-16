import axios from "axios";
import { MediaLinks } from "../models/media-links";

export const getAllMediaLinks = async (obj: {
  filters: string[];
  sort: { column: string; order: string };
  downloadState: { downloaded: number };
  userId: number;
}): Promise<MediaLinks[]> => {
  try {
    const resp = await axios.post("/youtube/all", obj);

    if (resp.status > 300 || resp.status < 200) {
      throw "Error getting YouTube links.";
    }

    return resp.data.data;
  } catch (error) {
    return error;
  }
};

type Link = {
  url: string;
  type: string;
  userId: number;
};

export const createMediaLink = async (body: Link) =>
  await axios.post("/youtube/create", body);

export const deleteMediaLink = async (id: number) => {
  try {
    const resp = await axios.delete(`/youtube/delete/${id}`);

    if (resp.status > 300 || resp.status < 200) {
      throw "Error deleting YouTube link.";
    }

    return { message: "Successfully deleted YouTube link." };
  } catch (error) {
    return error;
  }
};
