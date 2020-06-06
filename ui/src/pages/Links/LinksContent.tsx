import React, { useContext, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { MediaLinks } from "../../models/media-links";
import { Card } from "../../components/Card";
import { CreateLink } from "./CreateLink";
import { Icon } from "semantic-ui-react";
import { Filters } from "./Filters";
import { LinksContext } from "../../contexts/LinksContext";
import { Loading } from "../../components/Loading";
import { VideoPlayer } from "./VideoPlayer";
import { UserContext } from "../../contexts/UserContext";

type LinksContentProps = {};

const Container = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-areas: 
  "header header header"
  ". content playlist"
  ;
  grid-template-columns: 200px 1fr 40%;
  grid-template-rows: min-content 1fr;
  @media (max-width: 850px) and (min-width: 1px) {
    grid-template-areas: 
    "header"
    "playlist"
    "content"
    ;
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content 1fr;
  }
`;

const Header = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 200px 1fr 40%;
  @media (max-width: 850px) and (min-width: 1px) {
    padding: 10px;
    grid-template-columns: 1fr;
    grid-template-row: min-content 1fr 1fr;
  }
`;

const Content = styled.div`
  grid-area: content;
  display: grid;
  grid-template-rows: 1fr;
  overflow-y: hidden;
  margin-bottom: 10px;
`;

const VideoPlayerContent = styled.div`
  position: relative;
  height: 100%;
  grid-area: playlist;
  @media (max-width: 850px) and (min-width: 1px) {
    margin-bottom: 10px;
  };
`;

const AppNameHeader = styled.div`
  color: #fafafa;
  h3 {
    padding: 10px;
    margin: 0;
    i {
      margin-left: 5px;
      font-size: 13px;
    }
    @media (max-width: 850px) and (min-width: 1px) {
      padding: 0px;
    }
  }
`;

const HeaderActionsWrapper = styled.div`
  display: grid;
  grid-template-rows: min-content min-content;
  grid-gap: 10px;
  padding-top: 10px;
`;

const HeaderPlaylistWrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  h4 {
    font-size: 20px;
    color: #b4b4b4;
  }
  @media (max-width: 850px) and (min-width: 1px) {
    padding: 0px;
    h4 {
      font-size: 11px;
    }
  }
`;

const CardsWrapper = styled.div`
  overflow-y: auto;
  div:last-child {
    margin-bottom: 0px;
  }
  @media (max-width: 850px) and (min-width: 1px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const LinksContent: React.FC<LinksContentProps> = ({ }) => {
  const { currentVideo, loading, links } = useContext(LinksContext);
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
    <Container>
      <Header>
        <AppNameHeader>
          <h3>
            <strong>Media</strong>Links
            <Icon name="list" />
          </h3>
        </AppNameHeader>
        <HeaderActionsWrapper>
          <CreateLink />
          <Filters />
        </HeaderActionsWrapper>z
      </Header>
      <Content>
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
      </Content>
      <VideoPlayerContent>
        <VideoPlayer />
      </VideoPlayerContent>
    </Container>
  )
}