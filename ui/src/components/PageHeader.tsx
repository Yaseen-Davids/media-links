import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { LoginContext } from "../contexts/LoginContext";
import { UserContext } from "../contexts/UserContext";
import { logout } from "../lib/user";
import { useHistory } from "react-router-dom";

type PageHeaderProps = {};

export const PageHeader: React.FC<PageHeaderProps> = ({ }) => {
  const { loggedIn } = useContext(LoginContext);
  const { loading: userLoading } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    setIsLoggedIn(loggedIn);
  }, [loggedIn]);

  const handleLogout = () => {
    logout();
    history.push("/login");
  }

  return (
    <Header>
      <a href="/"><h2>MediaLinks</h2></a>
      {!userLoading.loading && userLoading.loaded ? (
        !isLoggedIn ? (
          <a href="/login">
            <Button basic color="grey" size="tiny">Login</Button>
          </a>
        ) : (
            <Button basic color="grey" onClick={handleLogout} size="tiny">Logout</Button>
          )) : (
          <a href="/login">
            <Button basic color="grey" size="tiny">Login</Button>
          </a>
        )}
    </Header>
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