import axios from "axios";

export const getPlaylists = async (): Promise<any> => await axios.get("/api/playlists/all");

export const getPlaylistsByUser = async (id: number): Promise<any> => await axios.get(`/api/playlists/${id}`);

export const createPlaylist = async (data: { name: string; user_id: number }): Promise<any> => await axios.post("/api/playlists/create", data);

export const getCurrentPlaylistById = async (id: string) => await axios.get(`/api/playlists/single/${id}`);

export const updateCurrentPlaylistById = async (id: string, data: any) => await axios.post(`/api/playlists/update/${id}`, data);

export const deletePlaylistById = async (id: any) => await axios.delete(`/api/playlists/delete/${id}`);
