import React, { createContext, useMemo, useState, useEffect } from "react";
import { Loading, defaultLoading } from "../models/loading";
import { MediaLinks } from "../models/media-links";
import { getAllMediaLinks } from "../lib/media-links";
import { sortOptions, downloadStateOptions } from "../models/filters";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";

const defaultCurrentVideo = { index: 0, author_url: "", downloaded: 0, id: "", thumbnail_url: "", title: "", type: "", date_added: new Date(), provided_name: "" };

const defaultLocalStorage = '{"options":{"autoplay":true,"filters":["song"],"sort":"sortDateDescending","downloadState":"active", "volume": 0}}';

type LocalStorageOptions = {
  autoplay: boolean;
  filters: string[];
  sort: string;
  downloadState: string;
  volume: number;
};

export type LinksContextState = {
  loading: Loading;
  links: MediaLinks[];
  reload: boolean;
  sort: string;
  downloadState: string;
  currentVideo: MediaLinks;
  localStorageOptions: LocalStorageOptions;
  showFilters: boolean;
  setLinks(links: MediaLinks[]): void;
  setReload(reload: boolean): void;
  setSort(sort: string): void;
  setDownloadState(downloadState: string): void;
  setCurrentVideo(currentVideo: MediaLinks): void;
  setLocalStorageOptions(which: string, value: any): void;
  toggleFilters(showFilters: boolean): void;
};

export const LinksContext = createContext<LinksContextState>({
  loading: defaultLoading,
  links: [],
  reload: true,
  sort: "sortDateDescending",
  downloadState: "active",
  currentVideo: defaultCurrentVideo,
  localStorageOptions: JSON.parse(defaultLocalStorage).options,
  showFilters: false,
  setLinks: () => { },
  setReload: () => { },
  setSort: () => { },
  setDownloadState: () => { },
  setCurrentVideo: () => { },
  setLocalStorageOptions: () => { },
  toggleFilters: () => { },
});

export const LinksProvider: React.FC = ({ children }) => {
  const localStorageOptions: LocalStorageOptions = JSON.parse(localStorage.getItem("options") || defaultLocalStorage).options;
  const [loading, setLoading] = useState<Loading>(defaultLoading);
  const [links, setLinks] = useState<MediaLinks[]>([]);
  const [reload, setReload] = useState<boolean>(true);
  const [sort, setSort] = useState<string>(localStorageOptions.sort);
  const [downloadState, setDownloadState] = useState<string>(localStorageOptions.downloadState);
  const [currentVideo, setCurrentVideo] = useState<MediaLinks>(defaultCurrentVideo);
  const [showFilters, toggleFilters] = useState<boolean>(false);
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
        downloadState: downloadStateOptions[downloadState],
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
        loaded: false,
        loading: false,
        error: error
      });
    }
  }

  useEffect(() => {
    setReload(false);
    setData();
  }, [reload, sort, downloadState]);

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
      setCurrentVideo(video);
    }
  }, [match]);

  const value = useMemo(() => ({
    localStorageOptions,
    loading,
    links,
    reload,
    sort,
    downloadState,
    currentVideo,
    showFilters,
    setLinks,
    setReload,
    setSort,
    setDownloadState,
    setCurrentVideo,
    setLocalStorageOptions,
    toggleFilters,
  }), [
    localStorageOptions,
    loading,
    reload,
    sort,
    downloadState,
    currentVideo,
    links,
    showFilters
  ]);

  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  )
}