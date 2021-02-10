import React, { useContext, useState } from "react";

import { login } from "../../lib/user";
import { UserContext } from "../../contexts/UserContext";

import { Form, Field } from "react-final-form";
import { Input, Button, Checkbox } from "semantic-ui-react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const validate = (value: string) => (value ? undefined : "Required");

export const Login = () => {
  const history = useHistory();
  const { hydrateUser } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);

  return (
    <Container>
      <Form
        onSubmit={async (fields: { username: string; password: string; }) => {
          try {
            setLoading(true);
            setError(undefined);
            const resp = await login({ ...fields, keepLoggedIn });

            if (resp.status >= 400) {
              throw "Log in failed.";
            }

            const token = resp.data.token;
            localStorage.setItem("login-token", token);

            await hydrateUser();
            await history.replace("/");
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <LoginWrapper>
              <LoginContent>
                <h2>Login</h2>
                <FieldContainerWrapper>
                  <Field
                    type="text"
                    name="username"
                    validate={validate}
                    render={({ meta, input }) => (
                      <FieldContainer>
                        <label>Username</label>
                        <Input {...input} placeholder="Username" fluid />
                        {meta.error && meta.touched ? <span className="validate-error">Please enter a username</span> : <></>}
                      </FieldContainer>
                    )}
                  />
                  <Field
                    type="password"
                    name="password"
                    validate={validate}
                    render={({ meta, input }) => (
                      <FieldContainer>
                        <label>Password</label>
                        <Input {...input} placeholder="Password" fluid />
                        {meta.error && meta.touched ? <span className="validate-error">Please enter a password</span> : <></>}
                      </FieldContainer>
                    )}
                  />
                  <CheckboxStyled label="Keep me logged in" checked={keepLoggedIn} onChange={() => setKeepLoggedIn(!keepLoggedIn)} />
                </FieldContainerWrapper>
                <Button color="blue" type="submit" loading={loading} disabled={loading}>Login</Button>
                {error && <p className="validate-error">{error}</p>}
              </LoginContent>
            </LoginWrapper>
          </form>
        )}
      />
    </Container>
  )
};

const Container = styled.div`
  max-height: 100vh;
  height: 100vh;
  background-color: #121212;

  .validate-error {
    color: #ff2b2b;
    font-size: 10px;
  }
`;

const LoginWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
`;

const LoginContent = styled.div`
  padding: 20px;
  background-color: #1f1f1f;
  h2 {
    color: #fafafa;
  }
`;

const FieldContainerWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-bottom: 15px;
`;

const FieldContainer = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr 10px;
  label {
    color: #d4d4d4;
  }
  &&&&& input {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const CheckboxStyled = styled(Checkbox)`
  &&&&& label {
    color: #d4d4d4;
  }
`;