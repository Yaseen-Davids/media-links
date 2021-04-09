import React, { useContext, useState } from "react";

import { useHistory } from "react-router-dom";
import { Button, Loader } from "semantic-ui-react";
import styled from "styled-components";

import { PlaylistCard } from "../../components/PlaylistCard";
import { LoginContext } from "../../contexts/LoginContext";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import { Playlist } from "../../models/playlists";
import { CreatePlaylistModal } from "./CreatePlaylistModal";
import { LoadingCard } from "./LoadingCards";

export const Playlists = () => {
  const history = useHistory();
  const {
    loading,
    playlists,
    youtubePlaylists,
    youtubePlaylistLoading,
  } = useContext(PlaylistContext);
  const { loggedIn } = useContext(LoginContext);

  const [modalOpen, openModal] = useState<boolean>(false);

  const handleOpenPlaylist = (playlist: Playlist) => {
    history.push(`/${playlist.id}/`);
  };

  return (
    <Content>
      <div style={{ position: "absolute" }}>
        <CreatePlaylistModal open={modalOpen} setOpen={openModal} />
      </div>
      <ContentWrapper>
        <PlaylistSection>
          <PlaylistHeaderText>
            <div style={{ display: "flex" }}>
              <h2>Discover</h2>
              {youtubePlaylistLoading.loading && (
                <PlaylistLoader active inline />
              )}
            </div>
          </PlaylistHeaderText>
          <PlaylistLayout>
            {youtubePlaylistLoading.loading
              ? new Array(3).fill(0).map(() => <LoadingCard />)
              : youtubePlaylists.map((playlist) => (
                  <PlaylistCard
                    title={playlist.name}
                    imageSrc={playlist.image}
                    linksCount={playlist.links_count}
                    onClick={() => handleOpenPlaylist(playlist)}
                  />
                ))}
          </PlaylistLayout>
        </PlaylistSection>
        {loggedIn && (
          <PlaylistSection>
            <PlaylistHeaderText>
              <div style={{ display: "flex" }}>
                <h2>Your Playlists</h2>
                {loading.loading && <PlaylistLoader active inline />}
              </div>
              <CreateButton
                circular
                icon="add"
                onClick={() => openModal(true)}
              />
            </PlaylistHeaderText>
            <PlaylistLayout>
              {loading.loading
                ? new Array(3).fill(0).map(() => <LoadingCard />)
                : (playlists || []).map((playlist) => (
                    <PlaylistCard
                      title={playlist.name}
                      imageSrc={playlist.image}
                      linksCount={playlist.links_count}
                      onClick={() => handleOpenPlaylist(playlist)}
                    />
                  ))}
            </PlaylistLayout>
          </PlaylistSection>
        )}
      </ContentWrapper>
    </Content>
  );
};

const Content = styled.div`
  grid-area: content;
  display: grid;
  background-color: #111;
  overflow-y: auto;
  margin-bottom: 50px;
`;

const ContentWrapper = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  @media (max-width: 850px) and (min-width: 1px) {
    margin-left: 20px;
    margin-right: 10px;
  }
`;

const PlaylistSection = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const PlaylistHeaderText = styled.div`
  display: flex;
  justify-content: space-between;
  h2 {
    font-weight: bolder;
    color: #fdfdfd;
  }
`;

const PlaylistLayout = styled.div`
  display: grid;
  margin-top: 30px;
  gap: 10px;
  grid-template-columns: repeat(8, 1fr);
  @media (max-width: 850px) and (min-width: 1px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 1280px) and (min-width: 850px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const PlaylistLoader = styled(Loader)`
  align-self: center;
  &&&& {
    margin-left: 20px;
    &::after {
      height: 20px;
      width: 20px;
    }
  }
`;

const CreateButton = styled(Button)`
  &&&& {
    background: #202020;
    color: #fff;
  }
`;
