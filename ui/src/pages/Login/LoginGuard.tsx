import React, { useEffect, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";
import { tokenLogin, whoami } from "../../lib/user";

export const checkLogin = async (setLoggedIn: any, history: any) => {

  try {
    const token = localStorage.getItem("login-token");
    await tokenLogin({ username: token || "", password: token || "" });

    const resp = await whoami();
    if (resp.status >= 400) {
      throw new Error(resp.statusText);
    }
    setLoggedIn(true);
  } catch (e) {
    history.push("?loggedin=false");
    setLoggedIn(false);
  }
}

export const LoginGuard: React.FunctionComponent<any> = ({ }) => {
  const { setLoggedIn } = useContext(LoginContext);
  const history = useHistory();

  useEffect(() => {
    checkLogin(setLoggedIn, history);
  }, [history.location.pathname]);

  // if (!loggedIn) {
  // console.log("Here")
  // history.push("?login=false");
  // return <Redirect to="/" />;
  // }

  return null;
};