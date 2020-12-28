import axios from "axios";
import { MediaLinks } from "../models/media-links";

export const getAllMediaLinks = async (playlistId: string, obj: { sort: { column: string; order: string }; linkState: { removed: number } }): Promise<MediaLinks[]> => {
  try {
    const resp = await axios.post(`/api/youtube/all/${playlistId}`, obj);

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
  playlistId: string;
};

export const createMediaLink = async (body: Link) => await axios.post("/api/youtube/create", body);

export const deleteMediaLink = async (id: string) => {
  try {
    const resp = await axios.delete(`/api/youtube/delete/${id}`);

    if (resp.status > 300 || resp.status < 200) {
      throw "Error deleting YouTube link.";
    }

    return { message: "Successfully deleted YouTube link." };
  } catch (error) {
    return error;
  }
};
