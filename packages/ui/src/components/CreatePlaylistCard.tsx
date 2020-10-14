import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { Icon, Input, Button } from "semantic-ui-react";
import { Form, Field } from "react-final-form";
import { UserContext } from "../contexts/UserContext";
import { createPlaylist } from "../lib/playlists";
import { useHistory } from "react-router-dom";

type CreatePlaylistCardProps = {};

const validate = (value: string) => (value ? undefined : "Required");

export const CreatePlaylistCard: React.FC<CreatePlaylistCardProps> = ({ }) => {
  const { user } = useContext(UserContext);
  const [create, toggleCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const inputRef: any = useRef(null);

  return (
    <Container>
      {!create ? (
        <Title onClick={() => toggleCreate(true)}>
          <Icon name="plus" />
        </Title>
      ) : (
          <InputWrapper>
            <Form
              onSubmit={async (fields: any) => {
                setLoading(true);
                try {
                  const id = await createPlaylist({ ...fields, user_id: user.id });
                  history.push(id.data.data[0]);
                } catch (error) {
                  console.log("error", error);
                } finally {
                  setLoading(false);
                }
              }}
              render={({ handleSubmit }) => (
                <InputBox onSubmit={handleSubmit}>
                  <p>Playlist name</p>
                  <Field
                    name="name"
                    validate={validate}
                    render={({ meta, input }) => (
                      <>
                        <FieldInput {...input} focus fluid ref={inputRef} borderColor={meta.error && meta.touched} />
                      </>
                    )}
                  />
                  <Actions>
                    <StyledButton type="reset" style={{ backgroundColor: "transparent", color: "#fff" }} onClick={() => toggleCreate(false)}>Cancel</StyledButton>
                    <StyledButton type="submit" style={{ backgroundColor: "#1db954", color: "#fff" }} loading={loading}>Create</StyledButton>
                  </Actions>
                </InputBox>
              )}
            />
          </InputWrapper>
        )}
    </Container>
  )
};

const Container = styled.div`
  position: relative;
  display: flex;
  background: #222;
  height: 200px;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  &&& i {
    color: #efefef;
    transition: color 0.12s ease-in;
    &:hover {
      color: #fff;
    }
  }
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  text-align: center;
  font-size: 5em;
  && i {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translate(-50%, -50%);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  color: #fff;
`;

const InputBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  margin-top: 12px;
  &&&& button {
    margin-left: 10px;
  }
`;

const StyledButton = styled(Button)`
  &&&& {
    padding: 8px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 12px;
  }
`;

const FieldInput = styled(Input)`
  &&&& {
    input {
      background: transparent;
      color: #fff;
      padding: 8px;
      border: ${(props: { borderColor: boolean }) => props.borderColor ? "1px solid #ff2b2b" : "1px solid #fff"};
    }
  }
`;