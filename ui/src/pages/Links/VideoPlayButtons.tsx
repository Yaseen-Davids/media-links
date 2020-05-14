import React, { useContext, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { LinksContext } from "../../contexts/LinksContext";

export const VideoPlayButtons = () => {
  const { currentVideo, playing, playVideoByCurrent, links } = useContext(LinksContext);

  const playVideoByIndex = useCallback((index: number) => playVideoByCurrent(currentVideo, index), [currentVideo]);

  const currentVideoId = useMemo(() => links.findIndex(item => item.id == currentVideo.id), [currentVideo, links]);

  const canPlayNext = useMemo(() => links[currentVideoId + 1] ? false : true, [currentVideo]);
  const canPlayPrev = useMemo(() => links[currentVideoId - 1] ? false : true, [currentVideo]);

  return playing ? (
    <div>
      <Button
        basic
        circular
        color="grey"
        icon="play"
        size="tiny"
        onClick={() => playVideoByIndex(-1)}
        disabled={canPlayPrev}
        style={{ transform: "scaleX(-1)" }}
      />
      <Button
        basic
        circular
        color="grey"
        icon="play"
        size="tiny"
        onClick={() => playVideoByIndex(1)}
        disabled={canPlayNext}
      />
    </div>
  )
    : (<></>)
}
