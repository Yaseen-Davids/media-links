import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MediaLinks } from "../../models/media-links";
import { Card } from "../../components/Card";
import { CreateLink } from "./CreateLink";
import { Filters } from "./Filters";
import { LinksContext } from "../../contexts/LinksContext";
import { Loading } from "../../components/Loading";
import { VideoPlayer } from "./VideoPlayer";
import { UserContext } from "../../contexts/UserContext";
import { ControlActions } from "./ControlActions";
import { MediaPlayerProvider } from "../../contexts/MediaPlayerContext";
import { ProgressBar } from "../../components/ProgressBar";

type LinksContentProps = {};

const Container = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-areas: 
  "header header header"
  "content content playlist"
  "control control control"
  ;
  grid-template-columns: 1fr 1fr 40%;
  grid-template-rows: min-content 1fr min-content;
  grid-row-gap: 20px;
  @media (max-width: 850px) and (min-width: 1px) {
    grid-template-areas: 
    "header"
    "playlist"
    "control"
    ;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 1fr min-content;
    grid-row-gap: 5px;
    overflow: hidden;
  }
`;

const Content = styled.div`
  grid-area: content;
  display: grid;
  grid-template-rows: 1fr;
  overflow-y: hidden;
  @media (max-width: 850px) and (min-width: 1px) {
    display: none;
  }
`;

const VideoPlayerContent = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  overflow: hidden;
  grid-area: playlist;
  padding-right: 10px;
  @media (max-width: 850px) and (min-width: 1px) {
    padding-right: 5px;
    padding-left: 5px;
  }
`;

const HeaderActionsWrapper = styled.div`
  display: grid;
  grid-template-rows: min-content min-content;
  grid-gap: 10px;
`;

const CardsWrapper = styled.div`
  overflow-y: auto;
  div:last-child {
    margin-bottom: 0px;
  }
`;

const Controls = styled.div`
  grid-area: control;
  background: #1f1f1f;
`;

export const LinksContent: React.FC<LinksContentProps> = ({ }) => {
  const { loading, links } = useContext(LinksContext);
  const { loading: userLoading } = useContext(UserContext);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (dataLoading) {
      if ((!loading.loading && loading.loaded) && (!userLoading.loading && userLoading.loaded)) {
        setDataLoading(false);
      }
    }
  }, [loading, userLoading, dataLoading]);

  return (
    <MediaPlayerProvider>
      <Container>
        <Content>
          <VideoPlayer />
        </Content>
        <VideoPlayerContent>
          <HeaderActionsWrapper>
            <CreateLink />
            <Filters />
          </HeaderActionsWrapper>
          {dataLoading ? (
            <Loading />
          ) : (
              <CardsWrapper>
                {links.length > 0 ? (
                  links.map((link: MediaLinks, index: number) => (
                    <Card key={index} link={link} />
                  )))
                  : <p style={{ color: "#fafafa" }}>No links found.</p>
                }
              </CardsWrapper>
            )}
        </VideoPlayerContent>
        <Controls>
          <ProgressBar />
          <ControlActions />
        </Controls>
      </Container>
    </MediaPlayerProvider>
  )
}