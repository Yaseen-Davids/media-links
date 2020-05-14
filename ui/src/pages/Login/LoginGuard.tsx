import React from "react";
import { Redirect } from "react-router-dom";
import { whoami } from "../../lib/user";

export const checkLogin = async (setLoggedIn: any) => {
  try {
    const resp = await whoami();
    if (resp.status >= 400) {
      throw new Error(resp.statusText);
    }
    setLoggedIn(true);
  } catch (e) {
    console.log("Login Guard error", e);
    setLoggedIn(false);
  }
}

export const LoginGuard: React.FunctionComponent<any> = ({ match }) => {
  const [loggedIn, setLoggedIn] = React.useState(true);

  React.useEffect(() => {
    checkLogin(setLoggedIn);
  }, [match.url]);

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return null;
};