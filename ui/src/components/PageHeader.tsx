import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Modal, Dropdown } from "semantic-ui-react";
import { LoginContext } from "../contexts/LoginContext";
import { UserContext } from "../contexts/UserContext";
import { logout } from "../lib/user";
import { useHistory } from "react-router-dom";
import { PlaylistContext } from "../contexts/PlaylistContext";
import { PermissionsContext } from "../contexts/PermissionsContext";

type PageHeaderProps = {};

export const PageHeader: React.FC<PageHeaderProps> = ({ }) => {
  const { loggedIn } = useContext(LoginContext);
  const { loading: userLoading } = useContext(UserContext);
  const { currentPlaylist, handleUpdateCurrentPlaylist, handleDeletePlaylist } = useContext(PlaylistContext);
  const { canCreateMediaLink } = useContext(PermissionsContext);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [deletePlaylistConfirm, setDeletePlaylistConfirm] = useState<boolean>(false);
  const [deletingPlaylist, setDeletingPlaylist] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    setIsLoggedIn(loggedIn);
  }, [loggedIn]);

  const handleLogout = () => {
    logout();
    history.push("/");
  }

  useEffect(() => {
    setPlaylistName(currentPlaylist.name);
  }, [currentPlaylist]);

  const handleChangePlaylistName = (event: any) => {
    setPlaylistName(event.target.value);
  }

  const handleUpdateCurrentPlaylistName = () => {
    handleUpdateCurrentPlaylist({ name: playlistName });
  }

  const handleConfirmDeletePlaylist = async () => {
    try {
      setDeletingPlaylist(true);
      await handleDeletePlaylist();
      setDeletePlaylistConfirm(false);
      setDeletingPlaylist(false);
      history.push("/");
    } catch (error) {
      setDeletingPlaylist(false);
      console.log("Error deleting playlist:: ", error);
    }
  }

  const handleLoginRedirect = () => {
    history.push(`/login`);
    // const currentUrl = window.location.href;
    // const redirectUrl = currentUrl.replace("/?loggedin=false", "/");
    // history.push(`/login?loggedin=false&redirectUrl=${redirectUrl}`);
  }

  return (
    <>
      {deletePlaylistConfirm && (
        <Modal
          open={true}
          size="tiny"
          onClose={() => setDeletePlaylistConfirm(false)}
        >
          <Modal.Header>Delete Playlist</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete <strong>{playlistName}?</strong></p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleConfirmDeletePlaylist} negative size="tiny" loading={deletingPlaylist}>
              Delete
            </Button>
            <Button onClick={() => setDeletePlaylistConfirm(false)} positive size="tiny">
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      )}
      <Header>
        <a href="/"><h2>MediaLinks</h2></a>
        {currentPlaylist.id.length > 0 ? (
          <PlaylistName>
            <EditInput
              value={playlistName}
              onBlur={handleUpdateCurrentPlaylistName}
              onChange={handleChangePlaylistName}
              disabled={!canCreateMediaLink}
            />
          </PlaylistName>
        ) : (
            <></>
          )}
        <div style={{ minWidth: "200px", textAlign: "right" }}>
          <DropdownSelect
            button
            floating
            icon="setting"
            direction="left"
            className="icon"
          >
            <Dropdown.Menu>
              {canCreateMediaLink && (
                <WarningDropdownItem icon="trash" text="Delete Playlist" onClick={() => setDeletePlaylistConfirm(true)} />
              )}
              {!userLoading.loading && userLoading.loaded ? (
                !isLoggedIn ? (
                  <Dropdown.Item icon="arrow right" text="Login" onClick={handleLoginRedirect} />
                ) : (
                    <Dropdown.Item icon="arrow left" text="Logout" onClick={handleLogout} />
                  )) : (
                  <Dropdown.Item icon="arrow right" text="Login" onClick={handleLoginRedirect} />
                )}
            </Dropdown.Menu>
          </DropdownSelect>
        </div>
      </Header>
    </>
  )
}

const Header = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #222;
  height: 50px;
  h2 {
    color: #fff;
  }
`;

const DropdownSelect = styled(Dropdown)`
  &&&& {
    color: #cecece;
    background-color: #1f1f1f;
    @media (max-width: 850px) and (min-width: 1px) {
      font-size: 11px;
    }
    div.text {
      color: #cecece;
    }
    a {
      background-color: #2a2a2a;
      color: #cecece;
    }
    .menu.transition {
      background-color: #1f1f1f;
      border: 1px solid #333;
      div {
        border-top: 1px solid #333;
        font-size: 12px;
        @media (max-width: 850px) and (min-width: 1px) {
          font-size: 11px;
        }
      }
      span {
        color: #cecece;
      }
      i {
        color: #cecece;
      }
    }
  }
`;

const WarningDropdownItem = styled(Dropdown.Item)`
  &&&&&&&&&& {
    i {
      font-weight: bold;
      color: #9F0000;
    }
    span {
      font-weight: bold;
      color: #9F0000;
    }
  }
`;

const PlaylistName = styled.div`
  display: flex;
  justify-content: center;
  .edit-icon {
    cursor: pointer;
    color: #ececec;
    margin-left: 10px;
    align-self: center;
    visibility: hidden;
  }
  &:hover {
    .edit-icon {
      visibility: visible;
    }
  }
`;

const EditInput = styled.input`
  &&&&& {
    text-align: center;
    background-color: transparent;
    padding: 0;
    margin: 0;
    outline: none;
    color: #ececec;
    border: none;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-size: 20px;
    font-weight: 700;
    &:disabled {
      opacity: 1;
    }
  }
`;