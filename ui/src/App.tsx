import React, { FC } from 'react';
import styled from "styled-components";
import { LinksContent } from './pages/Links/LinksContent';
import { LinksProvider } from './contexts/LinksContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { UserContext, UserProvider } from './contexts/UserContext';
import { LoginGuard } from './pages/Login/LoginGuard';
import { Loading } from './models/base';

const shouldLoad = (loading: Loading) => {
  return !loading.loading && !loading.loaded && !loading.error;
};

export const HydrateUser = () => {
  const { loading, hydrateUser } = React.useContext(UserContext);
  React.useEffect(() => {
    if (shouldLoad(loading)) {
      hydrateUser();
    }
  }, [loading]);
  return null;
};

// https://youtu.be/XYPCxaOv35s

const App: FC = () => (
  <Router>
    <Route component={LoginGuard} />
    <UserProvider>
      <Route component={HydrateUser} />
      <Route
        render={() => (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/">
              <LinksProvider>
                <Container>
                  <LinksContent />
                </Container>
              </LinksProvider>
            </Route>
          </Switch>
        )}
      />
    </UserProvider>
  </Router>
);

const Container = styled.div`
  max-height: 100vh;
  height: 100vh;
  background-color: #121212;
`;

export default App;
