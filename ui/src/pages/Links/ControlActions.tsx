import React, { useContext, useMemo } from "react";
import 'rc-slider/assets/index.css';
import styled from "styled-components";
import { AutoplayCheckbox } from "../../components/AutoplayCheckbox";
import { Button } from "semantic-ui-react";
import { MediaPlayerContext } from "../../contexts/MediaPlayerContext";
import Slider from "rc-slider";
import addSeconds from "date-fns/addSeconds";
import format from "date-fns/format";
import { LinksContext } from "../../contexts/LinksContext";
import BigNumber from "bignumber.js";

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
      const helperDate = addSeconds(new Date(0), new BigNumber(progress).decimalPlaces(0).toNumber());
      return format(helperDate, "mm:ss");
    }
    return "00:00";
  }, [duration, progress]);

  return (
    <Container>
      <VideoPlayActionsWrapper>
        <VideoPlayActions>
          <MediaPlayerButtons />
          <ActionWrapper>
            <span>{playedTime} / {fullTime}</span>
            <Slider
              min={0}
              max={1}
              step={0.001}
              defaultValue={volume}
              onAfterChange={(vol) => {
                setVolume(vol);
                setLocalStorageOptions("volume", vol);
              }}
              style={{ width: "70px", margin: "auto 0" }}
              railStyle={{
                background: "#cecece"
              }}
              trackStyle={{
                background: "#B00020"
              }}
              handleStyle={{
                background: "#B00020",
                border: "1px solid #B00020",
                height: 15,
                width: 15
              }}
            />
          </ActionWrapper>
        </VideoPlayActions>
      </VideoPlayActionsWrapper>
      <Control />
      <MediaPlayerOptions>
        <div></div>
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
        <Button
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
        <Button
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
          <Button
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
        <Button
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
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 1fr;
  padding-left: 10px;
  padding-right: 10px;
`;

const Control = styled.div`
  /* border: 1px solid #cecece; */
  display: flex;
  padding: 8px;
`;

const MediaPlayerOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
`;

const VideoPlayActionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  padding: 8px;
  /* border: 1px solid #cecece; */
  `;

const VideoPlayActions = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 10px;
  align-items: center;
  width: 100%;
  /* border: 1px solid #cecece; */
`;

const ActionWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 10px;
  color: grey;
  /* border: 1px solid #cecece; */
`;