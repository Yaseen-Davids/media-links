import axios from "axios";
import { apiURL } from "./base";

export const getPlaylists = async (): Promise<any> => await axios.get(`${apiURL}/playlists/all`);

export const getPlaylistsByUser = async (id: number): Promise<any> => await axios.get(`${apiURL}/playlists/${id}`);

export const createPlaylist = async (data: { name: string; user_id: number }): Promise<any> => await axios.post(`${apiURL}/playlists/create`, data);
