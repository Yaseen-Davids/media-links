import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLoading } from "../models/loading";
import { Loading } from "../models/base";
import { deletePlaylistById, getCurrentPlaylistById, getPlaylistsByUser, updateCurrentPlaylistById } from "../lib/playlists";
import { Playlist } from "../models/playlists";
import { UserContext } from "./UserContext";
import { useRouteMatch } from "react-router-dom";

export type PlaylistContextState = {
  loading: Loading;
  currentPlaylist: Playlist;
  playlists: Playlist[];
  currentPlaylistLoading: Loading;
  hydrateCurrentPlaylist(playlistId: string): void;
  handleUpdateCurrentPlaylist(data: any): void;
  handleDeletePlaylist(id?: any): void;
};

export const PlaylistContext = createContext<PlaylistContextState>({
  playlists: [],
  currentPlaylist: { id: "", date_added: null, name: "", user_id: 0 },
  loading: { loading: false, loaded: false, error: null },
  currentPlaylistLoading: { loading: false, loaded: false, error: null },
  handleDeletePlaylist: () => { },
  hydrateCurrentPlaylist: () => { },
  handleUpdateCurrentPlaylist: () => { },
});

export const PlaylistProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState<Loading>(defaultLoading);
  const [playlists, setPlaylists] = useState<any>([]);
  const [currentPlaylistLoading, setCurrentPlaylistLoading] = useState<Loading>(defaultLoading);
  const [currentPlaylist, setCurrentPlaylist] = useState({ id: "", date_added: null, name: "", user_id: 0 });

  const match = useRouteMatch<any>({ path: "/:playlistId/:videoId?" });

  const hydratePlaylists = async () => {
    try {
      setLoading({
        loading: true,
        loaded: false,
        error: null,
      });
      const result = await getPlaylistsByUser(user.id);
      setPlaylists(result.data.data);
      setLoading({
        loading: false,
        loaded: true,
        error: null,
      });
    } catch (error) {
      setLoading({
        loading: false,
        loaded: false,
        error: error,
      });
    }
  };

  const hydrateCurrentPlaylist = async (playlistId: string) => {
    try {
      setCurrentPlaylistLoading({
        loading: true,
        loaded: false,
        error: null,
      });
      const result = await getCurrentPlaylistById(playlistId);
      setCurrentPlaylist(result.data.data);
      setCurrentPlaylistLoading({
        loading: false,
        loaded: true,
        error: null,
      });
    } catch (error) {
      setCurrentPlaylistLoading({
        loading: false,
        loaded: false,
        error: error,
      });
    }
  };

  const handleUpdateCurrentPlaylist = async (data: any) => {
    const result = await updateCurrentPlaylistById(currentPlaylist.id, data);
    setCurrentPlaylist(result.data.data);
  }

  const handleDeletePlaylist = async (id = undefined) => {
    if (id) {
      await deletePlaylistById(id);
    } else {
      await deletePlaylistById(currentPlaylist.id);
    }
  }

  useEffect(() => {
    hydratePlaylists();
  }, [user]);

  useEffect(() => {
    const playlistId = match?.params.playlistId;
    if (!playlistId || playlistId.length <= 0) {
      setCurrentPlaylist({ id: "", date_added: null, name: "", user_id: 0 });
    } else {
      hydrateCurrentPlaylist(playlistId);
    }
  }, [match?.params.playlistId]);

  const value = useMemo(() => ({
    loading,
    playlists,
    currentPlaylistLoading,
    currentPlaylist,
    hydrateCurrentPlaylist,
    handleDeletePlaylist,
    handleUpdateCurrentPlaylist,
  }), [loading, currentPlaylistLoading, currentPlaylist, playlists]);

  return (
    <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>
  )
}