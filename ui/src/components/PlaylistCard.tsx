import React from "react";
import styled from "styled-components";

type PlaylistCardProps = {
  title: string;
  bgcolor?: string;
  onClick?(): void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ title, bgcolor, onClick }) => {
  return (
    <Container bgcolor={bgcolor ? bgcolor : "#0077B6"} onClick={onClick}>
      <Title>
        <h3>{title}</h3>
      </Title>
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  background-color: ${(props: { bgcolor: string }) => props.bgcolor};
  height: 200px;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 0.12s ease-in;
  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  text-align: center;
  h3 {
    width: 100%;
    color: #fff;
    font-size: 22px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin: auto 0;
    color: #fff;
  }
`;