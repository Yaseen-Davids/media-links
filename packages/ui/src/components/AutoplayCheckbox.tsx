import React, { useContext } from "react";
import { LinksContext } from "../contexts/LinksContext";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { MediaPlayerContext } from "../contexts/MediaPlayerContext";
import { useSnackbar } from "react-simple-snackbar";

type VideoPlayButtonsProps = {};

export const AutoplayCheckbox: React.FC<VideoPlayButtonsProps> = ({ }) => {
  const { setLocalStorageOptions } = useContext(LinksContext);
  const { autoplay, setAutoplay } = useContext(MediaPlayerContext);
  const [openSnackbar] = useSnackbar();

  const handleAutoplay = (value: boolean) => {
    openSnackbar(`Autoplay turned ${autoplay ? "off" : "on"}`);
    setLocalStorageOptions("autoplay", value);
    setAutoplay(value);
  }

  return (
    <CheckboxWrapper>
      <AutoplayIcon name="sync" active={autoplay ? "#d4d4d4" : "grey"} onClick={() => handleAutoplay(!autoplay)} />
    </CheckboxWrapper>
  )
}

const CheckboxWrapper = styled.div`
  &&&&&& {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 70px;
    justify-content: space-between;
    min-height: 31px;
    @media (max-width: 850px) and (min-width: 1px) {
      width: 40px;
    }
  }
`;

const AutoplayIcon = styled(Icon)`
  &&&& {
    margin: 0 auto;
    cursor: pointer;
    font-size: 20px;
    margin-top: -4px;
    color: ${(props: { active: string }) => props.active};
    @media (max-width: 850px) and (min-width: 1px) {
      font-size: 15px;
    }
  }
`;