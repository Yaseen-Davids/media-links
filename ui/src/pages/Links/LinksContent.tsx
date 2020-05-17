import React, { useContext } from "react";
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
`;

const Header = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 200px 1fr 40%;
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
`;

const CardsWrapper = styled.div`
  overflow-y: auto;
  div:last-child {
    margin-bottom: 0px;
  }
`;

export const LinksContent: React.FC<LinksContentProps> = ({ }) => {
  const { currentVideo, loading, links } = useContext(LinksContext);
  const { loading: userLoading } = useContext(UserContext);

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
        </HeaderActionsWrapper>
        <HeaderPlaylistWrapper>
          {currentVideo.title.length > 0 ? (
            <h4>Playing: {currentVideo.title}</h4>
          ) : (
              <h4>Playlist Stopped</h4>
            )}
        </HeaderPlaylistWrapper>
      </Header>
      <Content>
        {loading.loading || userLoading.loading ? (
          <Loading />
        ) : (
            <CardsWrapper>
              {links.length > 0 ? (
                links.map((link: MediaLinks, index: number) => (
                  <Card key={index} link={link} />
                ))
              ) : (
                  loading.loaded && userLoading.loaded ? <p style={{ color: "#fafafa" }}>No links found.</p> : <></>
                )}
            </CardsWrapper>
          )}
      </Content>
      <VideoPlayerContent>
        <VideoPlayer />
      </VideoPlayerContent>
    </Container>
  )
}