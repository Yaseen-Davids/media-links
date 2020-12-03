import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";
import { CreatePlaylistCard } from "../../components/CreatePlaylistCard";
import { PlaylistCard } from "../../components/PlaylistCard";
import { LoginContext } from "../../contexts/LoginContext";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import { Playlist } from "../../models/playlists";

// Today's TOP Hits = https://www.youtube.com/watch?v=GrAchTdepsU&list=PLLdPJGHquctFFaYNmcSIZVjpHxjO9dZTS
// US Top 40 Songs This Week = https://www.youtube.com/watch?v=E07s5ZYygMg&list=PLDIoUOhQQPlU2NpvlGKTsQRoCMHTUCLMf
// New music this week = https://www.youtube.com/watch?v=pvPsJFRGleA&list=PLxhnpe8pN3TmqD2EuqUN-BWHCd9NHk9fk

export const Playlists = () => {
  const history = useHistory();
  const { loading, playlists } = useContext(PlaylistContext);
  const { loggedIn } = useContext(LoginContext);

  const handleOpenPlaylist = (playlist: Playlist) => {
    history.push(`/${playlist.id}/`);
  }

  return (
    <Content>
      <ContentWrapper>
        <PlaylistSection>
          <PlaylistHeaderText>
            <h2>Discover</h2>
          </PlaylistHeaderText>
          <PlaylistLayout>
            <PlaylistCard title="New music this week" />
            <PlaylistCard title="US Top 40 Songs This Week" bgcolor="#261132" />
            <PlaylistCard title="Today's TOP Hits" bgcolor="#58B09C" />
          </PlaylistLayout>
        </PlaylistSection>
        {loggedIn && (
          <PlaylistSection>
            <PlaylistHeaderText>
              <h2>Your Playlists</h2>
              {loading.loading && <PlaylistLoader active inline />}
            </PlaylistHeaderText>
            <PlaylistLayout>
              {(playlists || []).map((playlist) => (
                <PlaylistCard
                  title={playlist.name}
                  onClick={() => handleOpenPlaylist(playlist)}
                />
              ))}
              <CreatePlaylistCard />
            </PlaylistLayout>
          </PlaylistSection>
        )}
      </ContentWrapper>
    </Content>
  )
}

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
  h2 {
    font-weight: bolder;
    color: #fdfdfd;
  }
`;

const PlaylistLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  margin-top: 30px;
  @media (max-width: 850px) and (min-width: 1px) {
    grid-template-columns: 1fr;
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