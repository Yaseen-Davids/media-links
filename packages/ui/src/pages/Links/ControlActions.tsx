import React, { useContext, useMemo, useEffect } from "react";
import 'rc-slider/assets/index.css';
import styled from "styled-components";
import { AutoplayCheckbox } from "../../components/AutoplayCheckbox";
import { Button } from "semantic-ui-react";
import { MediaPlayerContext } from "../../contexts/MediaPlayerContext";
import Slider from "rc-slider";
import addSeconds from "date-fns/addSeconds";
import format from "date-fns/format";
import { LinksContext } from "../../contexts/LinksContext";
import { MediaPlaying } from "../../components/MediaPlaying";
import { Loop } from "../../components/Loop";

type ControlActionsProps = {};

export const ControlActions: React.FC<ControlActionsProps> = ({ }) => {
  const { progress, volume, setVolume, duration } = useContext(MediaPlayerContext);
  const { setLocalStorageOptions } = useContext(LinksContext);

  const fullTime = useMemo(() => {
    if (duration != 0) {
      const helperDate = addSeconds(new Date(0), duration - 1);
      return format(helperDate, "mm:ss");
    }
    return "00:00";
  }, [duration]);

  const playedTime = useMemo(() => {
    if (duration != 0) {
      const helperDate = addSeconds(new Date(0), progress);
      return format(helperDate, "mm:ss");
    }
    return "00:00";
  }, [duration, progress]);

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      setVolume(1);
      setLocalStorageOptions("volume", 1);
    }
  }, []);

  return (
    <Container>
      <VideoPlayActionsWrapper>
        <VideoPlayActions>
          <MediaPlayerButtons />
          <ActionWrapper>
            <span style={{ width: "120px" }}>{playedTime} / {fullTime}</span>
            <SliderWrapper>
              <Slider
                min={0}
                max={1}
                step={0.001}
                defaultValue={volume}
                onAfterChange={(vol: any) => {
                  setVolume(vol);
                  setLocalStorageOptions("volume", vol);
                }}
                style={{ width: "70px", margin: "auto 0" }}
                railStyle={{ background: "#cecece" }}
                trackStyle={{ background: "#dfdfdf" }}
                handleStyle={{
                  background: "#dfdfdf",
                  border: "1px solid #dfdfdf",
                  height: 15,
                  width: 15
                }}
              />
            </SliderWrapper>
          </ActionWrapper>
        </VideoPlayActions>
      </VideoPlayActionsWrapper>
      <MediaPlaying />
      <MediaPlayerOptions>
        <div />
        <Loop />
        <AutoplayCheckbox />
      </MediaPlayerOptions>
    </Container>
  )
};

const MediaPlayerContainer = styled.div`
  display: flex;
`;

const MediaPlayerButtons = () => {
  const { playing, setPlaying, playVideoByIndex } = useContext(MediaPlayerContext);

  return (
    <MediaPlayerContainer>
      <div style={{ margin: "auto 0" }}>
        <MediaPlayingButton
          basic
          circular
          size="medium"
          icon="step backward"
          color="grey"
          title="Previous"
          style={{ background: "#bf360c" }}
          onClick={() => playVideoByIndex(-1)}
        />
      </div>
      {playing ? (
        <MediaPlayingButton
          basic
          circular
          size="huge"
          icon="pause"
          color="grey"
          title="Pause"
          style={{ background: "#bf360c" }}
          onClick={() => setPlaying(false)}
        />
      ) : (
          <MediaPlayingButton
            basic
            circular
            size="huge"
            icon="play"
            color="grey"
            title="Play"
            style={{ background: "#bf360c" }}
            onClick={() => setPlaying(true)}
          />
        )}
      <div style={{ margin: "auto 0" }}>
        <MediaPlayingButton
          basic
          circular
          size="medium"
          icon="step forward"
          color="grey"
          title="Next"
          style={{ background: "#bf360c" }}
          onClick={() => playVideoByIndex(1)}
        />
      </div>
    </MediaPlayerContainer>
  )
};

const SliderWrapper = styled.span`
  @media (max-width: 850px) and (min-width: 1px) {
    display: none;
  }
`;

const MediaPlayingButton = styled(Button)`
  &&&&&&&&& {
    color: #dadada !important;
    box-shadow: 0 0 0 1px #dadada inset !important;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 1fr;
  padding-left: 10px;
  padding-right: 10px;
  @media (max-width: 850px) and (min-width: 1px) {
    grid-template-columns: 1fr min-content;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const MediaPlayerOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  @media (max-width: 850px) and (min-width: 1px) {
    grid-template-columns: min-content min-content min-content;
  }
`;

const VideoPlayActionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  padding: 8px;
`;

const VideoPlayActions = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 10px;
  align-items: center;
  width: 100%;
`;

const ActionWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 10px;
  color: grey;
`;