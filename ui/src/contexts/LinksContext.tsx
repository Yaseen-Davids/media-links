import React, { createContext, useMemo, useState, useEffect, useContext } from "react";

import { Loading, defaultLoading } from "../models/loading";
import { MediaLinks } from "../models/media-links";
import { deleteMediaLink, getAllMediaLinks } from "../lib/media-links";
import { sortOptions, linkStateOptions } from "../models/filters";
import { MediaPlayerContext } from "./MediaPlayerContext";

import { useRouteMatch, useHistory } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";

// static
const defaultCurrentVideo = { index: 0, author_url: "", author_name: "", removed: 0, id: "", thumbnail_url: "", title: "", date_added: new Date(), provided_name: "" };
const defaultLocalStorage = '{"options":{"autoplay":true,"filters":["song"],"sort":"sortDateDescending","linkState":"active", "volume": 1}}';

type LocalStorageOptions = {
  autoplay: boolean;
  filters: string[];
  sort: string;
  linkState: string;
  volume: number;
};

export type LinksContextState = {
  loading: Loading;
  links: MediaLinks[];
  reload: boolean;
  sort: string;
  linkState: string;
  currentVideo: MediaLinks;
  localStorageOptions: LocalStorageOptions;
  showFilters: boolean;
  setLinks(links: MediaLinks[]): void;
  setReload(reload: boolean): void;
  setSort(sort: string): void;
  setLinkState(linkState: string): void;
  setCurrentVideo(currentVideo: MediaLinks): void;
  setLocalStorageOptions(which: string, value: any): void;
  toggleFilters(showFilters: boolean): void;
  handleDeleteLinkById(id: string): void;
};

export const LinksContext = createContext<LinksContextState>({
  loading: defaultLoading,
  links: [],
  reload: true,
  sort: "sortDateDescending",
  linkState: "active",
  currentVideo: defaultCurrentVideo,
  localStorageOptions: JSON.parse(defaultLocalStorage).options,
  showFilters: false,
  setLinks: () => { },
  setReload: () => { },
  setSort: () => { },
  setLinkState: () => { },
  setCurrentVideo: () => { },
  setLocalStorageOptions: () => { },
  toggleFilters: () => { },
  handleDeleteLinkById: () => { }
});

export const LinksProvider: React.FC = ({ children }) => {
  const localStorageOptions: LocalStorageOptions = JSON.parse(localStorage.getItem("options") || defaultLocalStorage).options;

  const [loading, setLoading] = useState<Loading>(defaultLoading);
  const [links, setLinks] = useState<MediaLinks[]>([]);
  const [reload, setReload] = useState<boolean>(true);
  const [sort, setSort] = useState<string>(localStorageOptions.sort);
  const [linkState, setLinkState] = useState<string>(localStorageOptions.linkState);
  const [currentVideo, setCurrentVideo] = useState<MediaLinks>(defaultCurrentVideo);
  const [showFilters, toggleFilters] = useState<boolean>(false);

  const [openSnackbar] = useSnackbar();

  const match = useRouteMatch<any>({ path: "/:playlistId/:videoId?" });
  const history = useHistory();

  const setLocalStorageOptions = (which: string, value: any) => {
    const options = {
      options: {
        ...localStorageOptions,
        [which]: value
      }
    }
    localStorage.setItem("options", JSON.stringify(options));
  }

  const handleDeleteLinkById = async (id: string) => {
    // delete link call
    await deleteMediaLink(id);

    // remove link from state
    const linkIndex = links.findIndex(link => link.id === id);
    links.splice(linkIndex, 1);

    // remove link from url
    history.push(`/${match?.params.playlistId}/`);

    setCurrentVideo(defaultCurrentVideo);

    setLinks([...links]);

    openSnackbar("Link has been removed.");
  }

  const setData = async () => {
    try {
      setLoading({
        loaded: false,
        loading: true,
        error: undefined
      });
      const playlistId = match?.params.playlistId;
      const result = await getAllMediaLinks(playlistId, {
        sort: sortOptions[sort],
        linkState: linkStateOptions[linkState],
      });
      setLinks(result.map((item, i) => ({ ...item, index: i + 1 })));
      setLoading({
        loaded: true,
        loading: false,
        error: undefined
      });
    } catch (error) {
      setLinks([]);
      setLoading({
        loaded: true,
        loading: false,
        error: error
      });
    }
  }

  useEffect(() => {
    setReload(false);
    setData();
  }, [reload, sort, linkState]);

  useEffect(() => {
    if (history.location.search.includes("loggedin=false")) {
      toggleFilters(true);
    }
  }, [history.location]);

  useEffect(() => {
    if (currentVideo.title.length > 0) {
      document.title = currentVideo.title + " - MediaLinks";
    } else {
      document.title = "MediaLinks";
    }
  }, [currentVideo]);

  useEffect(() => {
    if (links.length > 0 && match?.params.videoId && match?.params.videoId.length > 0) {
      const video: any = links.find(link => link.id === match.params.videoId);
      if (video) {
        setCurrentVideo(video);
      }
    }
  }, [match]);

  const value = useMemo(() => ({
    localStorageOptions,
    loading,
    links,
    reload,
    sort,
    linkState,
    currentVideo,
    showFilters,
    setLinks,
    setReload,
    setSort,
    setLinkState,
    setCurrentVideo,
    setLocalStorageOptions,
    toggleFilters,
    handleDeleteLinkById,
  }), [
    localStorageOptions,
    loading,
    reload,
    sort,
    linkState,
    currentVideo,
    links,
    showFilters
  ]);

  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  )
}