import React, { useContext } from "react";
import { LinksContext } from "../contexts/LinksContext";
import { Checkbox } from "semantic-ui-react";
import styled from "styled-components";
import { MediaPlayerContext } from "../contexts/MediaPlayerContext";

type VideoPlayButtonsProps = {};

export const AutoplayCheckbox: React.FC<VideoPlayButtonsProps> = ({ }) => {
  const { setLocalStorageOptions } = useContext(LinksContext);
  const { autoplay, setAutoplay } = useContext(MediaPlayerContext);

  const handleAutoplay = (value: boolean) => {
    try {
      setLocalStorageOptions("autoplay", value);
      setAutoplay(value);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <CheckboxWrapper>
      <p>Autoplay</p>
      <Checkbox toggle checked={autoplay} onChange={() => handleAutoplay(!autoplay)} />
    </CheckboxWrapper>
  )
}

const CheckboxWrapper = styled.div`
  display: flex;
  color: #9f9f9f;
  align-items: center;
  flex-direction: row;
  width: 130px;
  justify-content: space-between;
  min-height: 31px;
  p {
    margin: 0 auto;
    @media (max-width: 850px) and (min-width: 1px) {
      font-size: 11px;
    }
  }
  &&&&&& div {
    @media (max-width: 850px) and (min-width: 1px) {
      min-height: 1rem;
    }
  }
  &&&&&& {
    @media (max-width: 850px) and (min-width: 1px) {
      min-height: 1rem;
      label {
        min-height: 1rem;
        height: 1rem;
        width: 3rem;
      }
      label::before {
        min-height: 1rem;
        height: 1rem;
        width: 3rem;
      }
      label::after {
        min-height: 1rem;
        height: 1rem;
        width: 1rem;
      }
    }
    label::before {
      background-color: #666;
    }
  }
`;