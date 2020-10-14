import React from "react";
import styled from "styled-components";
import { Loader } from "semantic-ui-react";

const LoaderWrapper = styled.div`
  position: relative;
  &&&&& .loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Loading = () => (
  <LoaderWrapper>
    <Loader active inline />
  </LoaderWrapper>
);