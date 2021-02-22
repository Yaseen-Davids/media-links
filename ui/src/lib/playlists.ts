import axios from "axios";

const endpoint = "/api/playlists";

export const getPlaylists = async (): Promise<any> => await axios.get(`${endpoint}/all`);

export const getPlaylistsByUser = async (id: number): Promise<any> => await axios.get(`${endpoint}/getPlaylistByUser/${id}`);

export const createPlaylist = async (data: { name: string; user_id: number }): Promise<any> => await axios.post(`${endpoint}/create`, data);

export const getCurrentPlaylistById = async (id: string) => await axios.get(`${endpoint}/single/${id}`);

export const updateCurrentPlaylistById = async (id: string, data: any) => await axios.post(`${endpoint}/update/${id}`, data);

export const deletePlaylistById = async (id: any) => await axios.delete(`${endpoint}/delete/${id}`);

export const getYoutubePlaylists = async () => await axios.get(`${endpoint}/getYoutubePlaylists`);
