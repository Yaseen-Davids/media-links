import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
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

type CardProps = {
  link: MediaLinks;
};

export const Card: React.FC<CardProps> = ({ link }) => {
  const { setCurrentVideo, links, setLinks, currentVideo } = useContext(LinksContext);
  const { setDuration, setProgress, setPlaying } = useContext(MediaPlayerContext);
  const [deleteLink, setDeleteLink] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleDeleteLink = async (id: number) => {
    setDeleteLoading(true);
    await deleteMediaLink(id);
    const linkIndex = links.findIndex(link => link.id === id);
    links.splice(linkIndex, 1);
    setLinks([...links]);
    setDeleteLoading(false);
    setDeleteLink(false);
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
          {deleteLink ? (
            <>
              <Button
                basic
                circular
                size="small"
                icon="close"
                color="grey"
                title="Cancel"
                disabled={deleteLoading}
                style={{ background: "#bf360c" }}
                onClick={() => setDeleteLink(false)}
              />
              <Button
                basic
                circular
                size="small"
                icon="check"
                color="grey"
                title="Confirm"
                loading={deleteLoading}
                onClick={() => handleDeleteLink(link.id)}
              />
            </>
          ) : (
              <>
                <Button
                  basic
                  circular
                  size="small"
                  color="grey"
                  icon="copy"
                  title="Copy Link"
                  style={{ background: "#bf360c" }}
                  onClick={() => navigator.clipboard.writeText(link.author_url)}
                />
                <Button
                  basic
                  circular
                  size="small"
                  color="grey"
                  icon="trash"
                  title="Delete"
                  style={{ background: "#bf360c" }}
                  onClick={() => setDeleteLink(true)}
                />
              </>
            )}
        </CardButtons>
      </CardTitleWrapper>
    </CardContainer >
  )
}