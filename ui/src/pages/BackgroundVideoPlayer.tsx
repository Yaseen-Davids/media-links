import React, { FC, useEffect, useContext, useRef } from "react";

import ReactPlayer from "react-player";
import styled from "styled-components";

import { LinksContext } from "../contexts/LinksContext";
import { MediaPlayerContext } from "../contexts/MediaPlayerContext";

type BackgroundVideoPlayerProps = {};

const BackgroundVideoPlayer: FC<BackgroundVideoPlayerProps> = () => {
  const { volume, playing, progress } = useContext(MediaPlayerContext);
  const { currentVideo } = useContext(LinksContext);

  const ref: any = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.seekTo(progress);
    }
  }, [progress]);

  return (
    <Container>
      <ReactPlayer
        ref={ref}
        volume={volume}
        playing={playing}
        url={currentVideo.author_url}
        className="react-video-player"
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 500px;
  height: 300px;
  border: 1px solid white;
  z-index: 10000;
  .react-video-player {
    max-height: 298px;
    background: black;
    width: 100% !important;
  }
`;

export default BackgroundVideoPlayer;
