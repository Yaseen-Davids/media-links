import React, { useContext, useEffect } from "react";
import { MediaPlayerContext } from "../contexts/MediaPlayerContext";
import BigNumber from "bignumber.js";
import styled from "styled-components";

type ProgressBarProps = {};

export const ProgressBar: React.FC<ProgressBarProps> = ({ }) => {
  const { playing, progress, seek, duration, setProgress, seekTo } = useContext(MediaPlayerContext);

  useEffect(() => {
    const progressBarMain: HTMLDivElement = document.getElementsByClassName("progress-bar-main")[0] as HTMLDivElement;
    const progressBar: any = document.getElementsByClassName('progress-bar')[0];

    if (playing) {
      progressBar.style.width = `${new BigNumber(progressBarMain.clientWidth).dividedBy(duration).multipliedBy(progress).toNumber()}px`;
    } else {
      progressBar.style.width = 0;
    }
  }, [playing, progress, seek]);

  const handleDrop = (event: any) => {
    const progressBarMain: HTMLDivElement = document.getElementsByClassName("progress-bar-main")[0] as HTMLDivElement;
    const newProgress = new BigNumber(event.clientX).dividedBy(progressBarMain.clientWidth).multipliedBy(100).toNumber();
    const p1 = new BigNumber(duration).multipliedBy(newProgress).dividedBy(100).toNumber();
    setProgress(p1);
    seekTo(newProgress);
  };

  const handleMouseDown = (event: any) => {
    const progressBar: any = document.getElementsByClassName('progress-bar')[0];
    progressBar.style.width = `${event.clientX}px`;
  }

  return (
    <ProgressBarWrapper
      draggable
      onClick={(e) => handleDrop(e)}
      onMouseDown={(e) => handleMouseDown(e)}
      className="progress-bar-main"
    >
      <ProgressBarContainer className="progress-bar" />
    </ProgressBarWrapper>
  )
}

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0.5em;
  background-color: #222;
  color: white;
  transition: all 0.1s ease;
  cursor: pointer;
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  left: 0.1em;
  top: 0.1em;
  bottom: 0.1em;
  width: calc(var(--width, 0) * 1%);
  background-color: #069;
`;