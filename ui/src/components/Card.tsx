import React, { useContext, useCallback } from "react";
import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";
import { MediaLinks } from "../models/media-links";
import { deleteMediaLink } from "../lib/media-links";
import { LinksContext } from "../contexts/LinksContext";
import { MediaPlayerContext } from "../contexts/MediaPlayerContext";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

const CardContainer = styled.div`
  width: 100%;
  padding: 0;
  margin-bottom: 10px;
  background-color: ${(props: { bgcolor: string }) => props.bgcolor};
  cursor: pointer;
  &:hover {
    background-color: #1a1a1a;
  }
`;

const CardTitleWrapper = styled.div`
  display: grid;
  grid-template-areas: "title buttons";
  grid-template-columns: 1fr max-content;
  padding: 5px;
  border-radius: 4px;
`;

const CardTitle = styled.div`
  grid-area: title;
  display: grid;
  grid-template-columns: 70px 1fr;
  grid-template-areas: "img title"
                       "img author";
  grid-column-gap: 10px;
  text-align: left;
  color: #d4d4d4;
  img {
    grid-area: img;
    height: 50px;
    width: 70px;
  }
  .link_title {
    grid-area: title;
    margin-bottom: 0;
    padding-top: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .link_author_name {
    grid-area: author;
    margin-bottom: 0;
    color: #666;
    font-size: 12px;
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

const CardButtons = styled.div`
  padding-right: 0;
  grid-area: buttons;
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    position: relative;
  }
`;

const DropdownSelect = styled(Dropdown)`
  &&&&&& {
    z-index: 1000000;
    color: #cecece;
    font-size: 12px;
    .ellipsis.vertical.icon {
      color: #333;
      font-size: 20px;
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

const DropdownItem = styled(Dropdown.Item)`
  &&&& {
    width: 150px;
  }
`;

type CardProps = {
  link: MediaLinks;
};

export const Card: React.FC<CardProps> = ({ link }) => {
  const { links, setLinks, currentVideo } = useContext(LinksContext);
  const { setDuration, setProgress, setPlaying } = useContext(MediaPlayerContext);
  const history = useHistory();
  const { loggedIn } = useContext(LoginContext);

  const handleDeleteLink = async (id: string) => {
    await deleteMediaLink(id);
    const linkIndex = links.findIndex(link => link.id === id);
    links.splice(linkIndex, 1);
    setLinks([...links]);
  };

  const handlePlayVideo = () => {
    setPlaying(true);
    history.push(link.id);
    setDuration(0);
    setProgress(0);
  };

  const handleCopyUrl = useCallback((url: string) => {
    navigator.clipboard.writeText(url);
  }, [navigator]);

  return (
    <CardContainer bgcolor={currentVideo.id === link.id ? "#1a1a1a" : "transparent"}>
      <CardTitleWrapper>
        <CardTitle onClick={handlePlayVideo}>
          <img src={link.thumbnail_url} />
          <p className="link_title" title={link.title}>{link.title}</p>
          <p className="link_author_name" title={link.author_name}>{link.author_name}</p>
        </CardTitle>
        <CardButtons>
          <DropdownSelect
            icon="ellipsis vertical"
            direction="left"
          >
            <Dropdown.Menu style={{ zIndex: 100000 }}>
              <DropdownItem icon="copy" text="Copy link" onClick={() => handleCopyUrl(link.author_url)} />
              {loggedIn && (
                <DropdownItem icon="trash" text="Delete" onClick={() => handleDeleteLink(link.id)} />
              )}
            </Dropdown.Menu>
          </DropdownSelect>
        </CardButtons>
      </CardTitleWrapper>
    </CardContainer >
  )
}