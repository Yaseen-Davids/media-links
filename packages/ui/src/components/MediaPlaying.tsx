import React, { useContext } from "react";
import styled from "styled-components";
import { LinksContext } from "../contexts/LinksContext";

export const MediaPlaying = () => {
  const { currentVideo } = useContext(LinksContext);

  return (
    <Container>
      {currentVideo.title.length > 0 ? (
        <CardTitleWrapper>
          <CardTitle>
            <img src={currentVideo.thumbnail_url} />
            <p>{currentVideo.title}</p>
          </CardTitle>
        </CardTitleWrapper>
      ) : (
          <div></div>
        )}
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-areas: ". playing .";
  grid-template-columns: 10% 1fr 10%;
  text-align: center;
  @media (max-width: 850px) and (min-width: 1px) {
    display: none;
  };
`;

const CardTitleWrapper = styled.div`
  grid-area: playing;
  display: grid;
  grid-template-areas: "title buttons";
  grid-template-columns: 1fr max-content;
  padding: 5px;
  border-radius: 4px;
`;

const CardTitle = styled.div`
  grid-area: title;
  display: grid;
  grid-template-columns: 90px 1fr;
  grid-gap: 10px;
  text-align: left;
  color: #d4d4d4;
  img {
    height: 70px;
    width: 90px;
  }
  p {
    display: flex;
    align-items: center;
  }
  @media (max-width: 850px) and (min-width: 1px) {
    font-size: 11px;
  };
  .link-type {
    text-transform: capitalize;
    @media (max-width: 850px) and (min-width: 1px) {
      font-size: 9px;
    };
  }
  .meta-data {
    color: #9f9f9f;
    font-size: 11px;
    @media (max-width: 850px) and (min-width: 1px) {
      font-size: 9px;
    };
  }
`;