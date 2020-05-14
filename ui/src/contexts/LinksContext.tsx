import React, { createContext, useMemo, useState, useEffect, useContext } from "react";
import { Loading, defaultLoading } from "../models/loading";
import { YoutubeLinks } from "../models/youtube-links";
import { getAllYoutubeLinks } from "../lib/youtube-links";
import { FilterOptions, sortOptions, downloadStateOptions } from "../models/filters";
import { UserContext } from "./UserContext";

const defaultCurrentVideo = { index: 0, author_url: "", downloaded: 0, html_iframe: "", id: 0, thumbnail_url: "", title: "", type: "" };

export type LinksContextState = {
  loading: Loading;
  links: YoutubeLinks[];
  reload: boolean;
  filters: FilterOptions;
  sort: string;
  downloadState: string;
  currentVideo: YoutubeLinks;
  playing: boolean;
  autoplay: boolean;
  setLinks(links: YoutubeLinks[]): void;
  setReload(reload: boolean): void;
  setFilters(filters: FilterOptions): void;
  setSort(sort: string): void;
  setDownloadState(downloadState: string): void;
  setCurrentVideo(currentVideo: YoutubeLinks): void;
  setPlaying(playing: boolean): void;
  playVideoByCurrent(currentVideo: YoutubeLinks, index: number): void;
  setAutoplay(autoplay: boolean): void;
  setLocalStorageOptions(which: string, value: any): void;
};

export const LinksContext = createContext<LinksContextState>({
  loading: defaultLoading,
  links: [],
  reload: true,
  filters: ["song"],
  sort: "sortDateDescending",
  downloadState: "active",
  currentVideo: defaultCurrentVideo,
  playing: false,
  autoplay: false,
  setLinks: () => { },
  setReload: () => { },
  setFilters: () => { },
  setSort: () => { },
  setDownloadState: () => { },
  setCurrentVideo: () => { },
  setPlaying: () => { },
  playVideoByCurrent: () => { },
  setAutoplay: () => { },
  setLocalStorageOptions: () => { },
});

const defaultLocalStorage = "{ options: { autoplay: false, filters: ['song'], sort: 'sortDateDescending', downloadState: 'active' } }";

type localStorageOptions = {
  autoplay: boolean;
  filters: string[];
  sort: string;
  downloadState: string;
}

export const LinksProvider: React.FC = ({ children }) => {
  const localStorageOptions: localStorageOptions = JSON.parse(localStorage.getItem("options") || defaultLocalStorage).options;
  const [loading, setLoading] = useState<Loading>(defaultLoading);
  const [links, setLinks] = useState<YoutubeLinks[]>([]);
  const [reload, setReload] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterOptions>(localStorageOptions.filters);
  const [sort, setSort] = useState<string>(localStorageOptions.sort);
  const [downloadState, setDownloadState] = useState<string>(localStorageOptions.downloadState);
  const [currentVideo, setCurrentVideo] = useState<YoutubeLinks>(defaultCurrentVideo);
  const [playing, setPlaying] = useState<boolean>(false);
  const [autoplay, setAutoplay] = useState<boolean>(localStorageOptions.autoplay || false);
  const { user } = useContext(UserContext);

  const playVideoByCurrent = async (currentVideo: YoutubeLinks, index: number) => {
    const nextVideoIndex = links.findIndex(item => item.id == currentVideo.id);
    const nextVideoToPlay = links[nextVideoIndex + index];
    if (nextVideoToPlay) {
      setCurrentVideo(nextVideoToPlay);
    }
  };

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
      const result = await getAllYoutubeLinks({
        filters,
        sort: sortOptions[sort],
        downloadState: downloadStateOptions[downloadState],
        userId: user.id,
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
  }, [reload, filters, sort, downloadState, user]);

  const value = useMemo(() => ({
    loading,
    links,
    reload,
    filters,
    sort,
    downloadState,
    currentVideo,
    playing,
    autoplay,
    setLinks,
    setReload,
    setFilters,
    setSort,
    setDownloadState,
    setCurrentVideo,
    setPlaying,
    playVideoByCurrent,
    setAutoplay,
    setLocalStorageOptions
  }), [
    loading,
    reload,
    filters,
    sort,
    downloadState,
    currentVideo,
    playing,
    autoplay,
  ]);

  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  )
}