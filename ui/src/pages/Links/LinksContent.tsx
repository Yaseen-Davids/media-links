import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { CreateLink } from "./CreateLink";
import { Filters } from "./Filters";
import { VideoPlayer } from "./VideoPlayer";
import { ControlActions } from "./ControlActions";

import { Card } from "../../components/Card";
import { ProgressBar } from "../../components/ProgressBar";
import { Loading } from "../../components/Loading";

import { LinksContext } from "../../contexts/LinksContext";
import { MediaPlayerProvider } from "../../contexts/MediaPlayerContext";
import { PermissionsContext } from "../../contexts/PermissionsContext";

import { MediaLinks } from "../../models/media-links";

type LinksContentProps = {};

const Container = styled.div`
  position: relative;
  height: calc(100% - 50px);
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

const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Controls = styled.div`
  grid-area: control;
  background: #1f1f1f;
`;

export const LinksContent: React.FC<LinksContentProps> = ({ }) => {
  const { loading, links } = useContext(LinksContext);
  const { canCreateMediaLink } = useContext(PermissionsContext);

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (dataLoading) {
      if ((!loading.loading && loading.loaded)) {
        setDataLoading(false);
      }
    }
  }, [loading, dataLoading]);

  return (
    <MediaPlayerProvider>
      <Container>
        <Content>
          <VideoPlayer />
        </Content>
        <VideoPlayerContent>
          <HeaderActionsWrapper>
            {canCreateMediaLink && (
              <CreateLink />
            )}
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
                  : (
                    <NoDataContainer>
                      <p style={{ color: "#fafafa" }}>No links found.</p>
                    </NoDataContainer>
                  )
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