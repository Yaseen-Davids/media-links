import React, { useContext, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { LinksContext } from "../../contexts/LinksContext";
import { AutoplayCheckbox } from "../../components/AutoplayCheckbox";
import { VideoPlayButtons } from "./VideoPlayButtons";

const Container = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-rows: min-content;
`;

const VideoWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  .react-video-player {
    min-height: 350px;
    background: black;
    width: 100% !important;
  }
`;

const ReactPlayerActions = styled.div`
  background-color: #1f1f1f;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const VideoPlayer = () => {
  const { currentVideo, playing, playVideoByCurrent, autoplay } = useContext(LinksContext);
  const [ended, setEnded] = useState<boolean>(false);

  const handleAutoPlay = () => {
    if (autoplay) {
      playVideoByCurrent(currentVideo, 1);
      setEnded(false);
    }
  };

  useEffect(() => {
    if (ended) {
      handleAutoPlay();
    }
  }, [ended]);

  return (
    <Container>
      <VideoWrapper>
        <ReactPlayer
          controls
          playing={playing}
          url={currentVideo.author_url}
          className="react-video-player"
          onEnded={() => setEnded(true)}
        />
        <ReactPlayerActions>
          <div style={{ margin: "auto 0" }}>
            <AutoplayCheckbox />
          </div>
          <VideoPlayButtons />
        </ReactPlayerActions>
      </VideoWrapper>
    </Container>
  )
}