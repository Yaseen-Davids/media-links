import React, { createContext, useMemo, useState, useContext, useCallback, useEffect } from "react";
import { Loading, defaultLoading } from "../models/loading";
import { MediaLinks } from "../models/media-links";
import { LinksContext } from "./LinksContext";
import { useHistory } from "react-router-dom";

export type MediaPlayerState = {
  loading: Loading;
  playing: boolean;
  autoplay: boolean;
  progress: number;
  volume: number;
  duration: number;
  seek: number | null;
  loop: boolean;
  setPlaying(playing: boolean): void;
  playVideoByCurrent(currentVideo: MediaLinks, index: number): void;
  setAutoplay(autoplay: boolean): void;
  playVideoByIndex(index: number): void;
  setProgress(progress: number): void
  setVolume(volume: number): void;
  setDuration(duration: number): void;
  seekTo(seek: number): void;
  setLoop(loop: boolean): void;
};

export const MediaPlayerContext = createContext<MediaPlayerState>({
  loading: defaultLoading,
  playing: false,
  autoplay: false,
  progress: 0,
  volume: 0,
  duration: 0,
  seek: null,
  loop: false,
  setPlaying: () => { },
  playVideoByCurrent: () => { },
  setAutoplay: () => { },
  playVideoByIndex: () => { },
  setProgress: () => { },
  setVolume: () => { },
  setDuration: () => { },
  seekTo: () => { },
  setLoop: () => { },
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
  const [loop, setLoop] = useState<boolean>(false);
  const history = useHistory();

  const playVideoByCurrent = async (currentVideo: MediaLinks, index: number) => {
    const nextVideoIndex = links.findIndex(item => item.id == currentVideo.id);
    const nextVideoToPlay = links[nextVideoIndex + index];
    if (nextVideoToPlay) {
      history.push(nextVideoToPlay.id);
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
    loop,
    setCurrentVideo,
    setPlaying,
    playVideoByCurrent,
    setAutoplay,
    playVideoByIndex,
    setProgress,
    setVolume,
    setDuration,
    seekTo,
    setLoop,
  }), [
    loading,
    currentVideo,
    playing,
    autoplay,
    progress,
    volume,
    duration,
    seek,
    loop
  ]);

  return (
    <MediaPlayerContext.Provider value={value}>{children}</MediaPlayerContext.Provider>
  )
}