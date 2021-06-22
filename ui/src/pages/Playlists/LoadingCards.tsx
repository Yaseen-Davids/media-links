import React from "react";

import styled from "styled-components";

export const LoadingCard = () => {
  return (
    <Container>
      <NoImage />
      <Title></Title>
    </Container>
  );
};

const Container = styled.div`
  height: 260px;
  width: 100%;
  padding: 5px;
  opacity: 1;
  /* animation: blinker 1s linear infinite;

  @keyframes blinker {
    50% {
      opacity: 0.5;
    }
  } */
`;

const NoImage = styled.div`
  height: 150px;
  width: 100%;
  background-color: #222;
  border-radius: 10px;
`;

const Title = styled.div`
  margin-top: 10px;
  height: 50px;
  background-color: #222;
  width: 100%;
  border-radius: 10px;
`;
