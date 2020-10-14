import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLoading } from "../models/loading";
import { Loading } from "../models/base";
import { getPlaylistsByUser } from "../lib/playlists";
import { Playlist } from "../models/playlists";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

export type PlaylistContextState = {
  playlists: Playlist[];
  loading: Loading;
};

export const PlaylistContext = createContext<PlaylistContextState>({
  playlists: [],
  loading: { loading: false, loaded: false, error: null },
});

export const PlaylistProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<Loading>(defaultLoading);
  const [playlists, setPlaylists] = useState<any>([]);
  const { user } = useContext(UserContext);

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
  }

  useEffect(() => {
    hydratePlaylists();
  }, [user]);

  const value = useMemo(() => ({
    loading,
    playlists,
  }), [
    loading,
    playlists,
  ]);

  return (
    <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>
  )
}