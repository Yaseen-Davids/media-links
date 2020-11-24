import axios from "axios";

export const getPlaylists = async (): Promise<any> => await axios.get("/api/playlists/all");

export const getPlaylistsByUser = async (id: number): Promise<any> => await axios.get(`/api/playlists/${id}`);

export const createPlaylist = async (data: { name: string; user_id: number }): Promise<any> => await axios.post("/api/playlists/create", data);
