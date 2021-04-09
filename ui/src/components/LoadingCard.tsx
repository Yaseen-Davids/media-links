import React from "react";

import styled from "styled-components";

type LoadingCardProps = {};

export const LoadingCard: React.FC<LoadingCardProps> = ({}) => {
  return (
    <CardContainer>
      <CardTitleWrapper>
        <CardTitle>
          <div className="image" />
          <div className="title" />
          <div className="sub-title" />
        </CardTitle>
      </CardTitleWrapper>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 100%;
  padding: 0;
  margin-bottom: 10px;
  cursor: pointer;
  animation: blinker 1s linear infinite;

  @keyframes blinker {
    50% {
      opacity: 0.5;
    }
  }
`;

const CardTitleWrapper = styled.div`
  padding: 5px;
  border-radius: 4px;
`;

const CardTitle = styled.div`
  grid-area: title;
  display: grid;
  grid-template-columns: 70px 1fr;
  grid-template-areas:
    "img title"
    "img author";
  column-gap: 10px;
  row-gap: 10px;
  .image {
    grid-area: img;
    height: 50px;
    width: 70px;
    background-color: #222;
  }
  .title {
    width: 100%;
    background-color: #232323;
  }
  .sub-title {
    width: 100%;
    background-color: #232323;
  }
`;
