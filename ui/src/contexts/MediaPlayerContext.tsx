import React, { createContext, useMemo, useState, useContext, useCallback, useEffect } from "react";
import { Loading, defaultLoading } from "../models/loading";
import { MediaLinks } from "../models/media-links";
import { LinksContext } from "./LinksContext";

export type MediaPlayerState = {
  loading: Loading;
  playing: boolean;
  autoplay: boolean;
  progress: number;
  volume: number;
  duration: number;
  seek: number | null;
  setPlaying(playing: boolean): void;
  playVideoByCurrent(currentVideo: MediaLinks, index: number): void;
  setAutoplay(autoplay: boolean): void;
  playVideoByIndex(index: number): void;
  setProgress(progress: number): void
  setVolume(volume: number): void;
  setDuration(duration: number): void;
  seekTo(seek: number): void;
};

export const MediaPlayerContext = createContext<MediaPlayerState>({
  loading: defaultLoading,
  playing: false,
  autoplay: false,
  progress: 0,
  volume: 0,
  duration: 0,
  seek: null,
  setPlaying: () => { },
  playVideoByCurrent: () => { },
  setAutoplay: () => { },
  playVideoByIndex: () => { },
  setProgress: () => { },
  setVolume: () => { },
  setDuration: () => { },
  seekTo: () => { }
});

export const MediaPlayerProvider: React.FC = ({ children }) => {
  const { links, currentVideo, setCurrentVideo, localStorageOptions } = useContext(LinksContext);
  const [loading, setLoading] = useState<Loading>(defaultLoading);
  const [playing, setPlaying] = useState<boolean>(false);
  const [autoplay, setAutoplay] = useState<boolean>(localStorageOptions.autoplay || false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(localStorageOptions.volume);
  const [duration, setDuration] = useState<number>(0);
  const [seek, seekTo] = useState<number | null>(null);

  const playVideoByCurrent = async (currentVideo: MediaLinks, index: number) => {
    const nextVideoIndex = links.findIndex(item => item.id == currentVideo.id);
    const nextVideoToPlay = links[nextVideoIndex + index];
    if (nextVideoToPlay) {
      setCurrentVideo(nextVideoToPlay);
    }
  };

  const playVideoByIndex = useCallback((index: number) => playVideoByCurrent(currentVideo, index), [currentVideo]);

  const value = useMemo(() => ({
    loading,
    currentVideo,
    playing,
    autoplay,
    progress,
    volume,
    duration,
    seek,
    setCurrentVideo,
    setPlaying,
    playVideoByCurrent,
    setAutoplay,
    playVideoByIndex,
    setProgress,
    setVolume,
    setDuration,
    seekTo,
  }), [
    loading,
    currentVideo,
    playing,
    autoplay,
    progress,
    volume,
    duration,
    seek
  ]);

  return (
    <MediaPlayerContext.Provider value={value}>{children}</MediaPlayerContext.Provider>
  )
}