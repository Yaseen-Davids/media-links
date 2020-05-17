import React, { useState, useMemo, useContext } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { MediaLinks } from "../models/media-links";
import { deleteMediaLink } from "../lib/media-links";
import { LinksContext } from "../contexts/LinksContext";

const CardContainer = styled.div`
  width: 100%;
  padding: 0;
  margin-bottom: 10px;
  background-color: #1f1f1f;
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
  padding: 5px;
  text-align: left;
  color: #d4d4d4;
  .link-type {
    text-transform: capitalize;
  }
  .meta-data {
    color: #9f9f9f;
    font-size: 11px;
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
  const { setReload, setCurrentVideo, playing, setPlaying, currentVideo } = useContext(LinksContext);
  const [deleteLink, setDeleteLink] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleDeleteLink = async (id: number) => {
    setDeleteLoading(true);
    await deleteMediaLink(id);
    setDeleteLink(false);
    setDeleteLoading(false);
    setReload(true);
  };

  const handlePlayVideo = () => {
    setPlaying(true);
    setCurrentVideo(link);
  }

  // const url = useMemo(() => {
  //   return link.author_url.split("https://youtu.be/")[1];
  // }, [link.author_url]);

  return (
    <CardContainer>
      <CardTitleWrapper>
        <CardTitle onClick={() => setActive(!active)}>
          <p>{link.title}</p>
          <p className="meta-data"><span className="link-type">{link.type}</span> - {link.author_url}</p>
        </CardTitle>
        <CardButtons>
          {deleteLink ? (
            <>
              <Button
                basic
                circular
                size="small"
                icon="close"
                color="red"
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
                color="green"
                title="Confirm"
                loading={deleteLoading}
                onClick={() => handleDeleteLink(link.id)}
              />
            </>
          ) : (
              <>
                {playing && currentVideo.author_url == link.author_url ? (
                  <Button
                    basic
                    circular
                    color="grey"
                    size="small"
                    icon="pause"
                    title="Pause"
                    onClick={() => setPlaying(false)}
                  />
                ) : (
                    <Button
                      basic
                      circular
                      size="small"
                      color="grey"
                      icon="play"
                      title="Play"
                      onClick={handlePlayVideo}
                    />
                  )}
                {/* <Button
                  basic
                  circular
                  size="small"
                  color="blue"
                  icon="download"
                  title="Download"
                  target="__blank"
                  href={`https://y2mate.com/youtube/${url}`}
                /> */}
                <Button
                  basic
                  circular
                  size="small"
                  color="red"
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