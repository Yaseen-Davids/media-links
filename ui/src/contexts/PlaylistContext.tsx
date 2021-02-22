import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import { defaultLoading } from "../models/loading";
import { Loading } from "../models/base";
import { deletePlaylistById, getCurrentPlaylistById, getPlaylistsByUser, updateCurrentPlaylistById, getYoutubePlaylists } from "../lib/playlists";
import { Playlist } from "../models/playlists";
import { UserContext } from "./UserContext";

import { useRouteMatch } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { TokenLoginContext } from "./TokenLoginContext";

export type PlaylistContextState = {
  loading: Loading;
  currentPlaylist: Playlist;
  playlists: Playlist[];
  youtubePlaylists: Playlist[];
  currentPlaylistLoading: Loading;
  deletingPlaylist: boolean;
  youtubePlaylistLoading: Loading;
  hydrateCurrentPlaylist(playlistId: string): void;
  handleUpdateCurrentPlaylist(data: any): void;
  handleDeletePlaylist(id?: any): void;
};

export const PlaylistContext = createContext<PlaylistContextState>({
  playlists: [],
  youtubePlaylists: [],
  deletingPlaylist: false,
  currentPlaylist: { id: "", date_added: null, name: "", user_id: 0 },
  loading: { loading: false, loaded: false, error: null },
  currentPlaylistLoading: { loading: false, loaded: false, error: null },
  youtubePlaylistLoading: { loading: false, loaded: false, error: null },
  handleDeletePlaylist: () => { },
  hydrateCurrentPlaylist: () => { },
  handleUpdateCurrentPlaylist: () => { },
});

export const PlaylistProvider: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const { loading: tokenLoginLoading } = useContext(TokenLoginContext);

  const [loading, setLoading] = useState<Loading>(defaultLoading);
  const [currentPlaylistLoading, setCurrentPlaylistLoading] = useState<Loading>(defaultLoading);
  const [youtubePlaylistLoading, setYoutubePlaylistLoading] = useState<Loading>(defaultLoading);

  const [playlists, setPlaylists] = useState<any>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState({ id: "", date_added: null, name: "", user_id: 0 });
  const [deletingPlaylist, setDeletingPlaylist] = useState<boolean>(false);
  const [youtubePlaylists, setYoutubePlaylists] = useState<any>([]);

  const match = useRouteMatch<any>({ path: "/:playlistId/:videoId?" });

  const [openSnackbar] = useSnackbar();

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

  const hydrateYoutubePlaylists = async () => {
    try {
      setYoutubePlaylistLoading({
        loading: true,
        loaded: false,
        error: null,
      });
      const result = await getYoutubePlaylists();
      setYoutubePlaylists(result.data.data);
      setYoutubePlaylistLoading({
        loading: false,
        loaded: true,
        error: null,
      });
    } catch (error) {
      setYoutubePlaylistLoading({
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
      if (result.data.data) {
        setCurrentPlaylist(result.data.data);
      } else {
        throw "Cannot find playlist.";
      }
      setCurrentPlaylistLoading({
        loading: false,
        loaded: true,
        error: null,
      });
    } catch (error) {
      openSnackbar("Cannot find playlist.");
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
    try {
      setDeletingPlaylist(true);
      const playlistId = id ? id : currentPlaylist.id;

      // delete playlist
      await deletePlaylistById(playlistId);
      await hydratePlaylists();

    } catch (error) {
      openSnackbar("Error deleting playlist");
    } finally {
      setDeletingPlaylist(false);
    }
  }

  useEffect(() => {
    hydrateYoutubePlaylists();
    if (user.id != 0) {
      hydratePlaylists();
    }
  }, [user, tokenLoginLoading]);

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
    deletingPlaylist,
    youtubePlaylistLoading,
    youtubePlaylists,
  }), [loading, currentPlaylistLoading, currentPlaylist, playlists, deletingPlaylist, youtubePlaylistLoading, youtubePlaylists]);

  return (
    <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>
  )
}