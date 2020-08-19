import React, { useContext } from "react";
import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";
import { MediaLinks } from "../models/media-links";
import { deleteMediaLink } from "../lib/media-links";
import { LinksContext } from "../contexts/LinksContext";
import { MediaPlayerContext } from "../contexts/MediaPlayerContext";

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
  grid-template-columns: 90px 1fr;
  grid-gap: 10px;
  text-align: left;
  color: #d4d4d4;
  img {
    height: 70px;
    width: 90px;
  }
  p {
    padding-top: 5px;
    padding-bottom: 5px;
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

type CardProps = {
  link: MediaLinks;
};

export const Card: React.FC<CardProps> = ({ link }) => {
  const { setCurrentVideo, links, setLinks, currentVideo } = useContext(LinksContext);
  const { setDuration, setProgress, setPlaying } = useContext(MediaPlayerContext);

  const handleDeleteLink = async (id: number) => {
    await deleteMediaLink(id);
    const linkIndex = links.findIndex(link => link.id === id);
    links.splice(linkIndex, 1);
    setLinks([...links]);
  };

  const handlePlayVideo = () => {
    setPlaying(true);
    setCurrentVideo(link);
    setDuration(0);
    setProgress(0);
  };

  return (
    <CardContainer bgcolor={currentVideo.id === link.id ? "#1a1a1a" : "transparent"}>
      <CardTitleWrapper>
        <CardTitle onClick={handlePlayVideo}>
          <img src={link.thumbnail_url} />
          <p>{link.title}</p>
        </CardTitle>
        <CardButtons>
          <DropdownSelect
            icon="ellipsis vertical"
            direction="left"
          >
            <Dropdown.Menu>
              <Dropdown.Item icon="copy" text="Copy link" onClick={() => navigator.clipboard.writeText(link.author_url)} />
              <Dropdown.Item icon="trash" text="Delete" onClick={() => handleDeleteLink(link.id)} />
            </Dropdown.Menu>
          </DropdownSelect>
        </CardButtons>
      </CardTitleWrapper>
    </CardContainer >
  )
}