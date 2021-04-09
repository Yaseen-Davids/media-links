import React, { useMemo } from "react";

import styled from "styled-components";

type PlaylistCardProps = {
  title: string;
  imageSrc: string;
  linksCount: number;
  onClick?(): void;
};

export const PlaylistCard: React.FC<PlaylistCardProps> = ({
  title,
  onClick,
  imageSrc,
  linksCount,
}) => {
  const headTitle = useMemo(() => {
    const elipseCount = 51;
    const newTitle =
      title.length > 52 ? title.substr(0, elipseCount).concat("...") : title;
    return newTitle;
  }, [title]);

  return (
    <Container onClick={onClick}>
      {imageSrc ? <Image src={imageSrc} /> : <NoImage />}
      <Title>
        <p className="title">{headTitle}</p>
        <p className="subtitle">&bull; {linksCount} Videos</p>
      </Title>
    </Container>
  );
};

const Container = styled.div`
  height: 260px;
  padding: 5px;
  cursor: pointer;
`;

const NoImage = styled.div`
  height: 150px;
  width: 100%;
  background-color: #020202;
  border-radius: 10px;
`;

const Image = styled.img`
  height: 150px;
  width: 100%;
  border-radius: 10px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .title {
    font-size: 14px;
    color: #fefefe;
    margin: 0;
    margin-top: 5px;
  }
  .subtitle {
    font-size: 13px;
    color: #949494;
  }
`;
