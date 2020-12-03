import React, { createContext, useContext, useMemo } from "react";
import { LoginContext } from "./LoginContext";
import { PlaylistContext } from "./PlaylistContext";
import { UserContext } from "./UserContext";

export type PermissionsContextState = {
  canCreateMediaLink: boolean;
};

export const PermissionsContext = createContext<PermissionsContextState>({
  canCreateMediaLink: false,
});

export const PermissionsProvider: React.FC = ({ children }) => {
  const { loggedIn } = useContext(LoginContext);
  const { user, loading: userLoading } = useContext(UserContext);
  const { currentPlaylist, currentPlaylistLoading } = useContext(PlaylistContext);

  const canCreateMediaLink = useMemo(() => {
    const isLoaded = userLoading.loaded && currentPlaylistLoading.loaded;
    const isUser = user.id === currentPlaylist.user_id;
    return loggedIn && isLoaded && isUser;
  }, [userLoading, currentPlaylistLoading, loggedIn, user, currentPlaylist]);

  const value = useMemo(() => ({
    canCreateMediaLink,
  }), [userLoading, currentPlaylistLoading, loggedIn, user, currentPlaylist]);

  return (
    <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>
  )
}