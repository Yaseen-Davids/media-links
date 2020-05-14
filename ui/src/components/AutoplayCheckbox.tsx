import React, { useContext } from "react";
import { LinksContext } from "../contexts/LinksContext";
import { Checkbox } from "semantic-ui-react";
import styled from "styled-components";

export const AutoplayCheckbox = () => {
  const { autoplay, setAutoplay, setLocalStorageOptions } = useContext(LinksContext);

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
      <Checkbox toggle checked={autoplay} onChange={() => handleAutoplay(!autoplay)} />
      <p>Autoplay</p>
    </CheckboxWrapper>
  )
}

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: #9f9f9f;
  p {
    margin-left: 10px;
  }
  &&&&&& label::before {
    background-color: #666;
  }
`;