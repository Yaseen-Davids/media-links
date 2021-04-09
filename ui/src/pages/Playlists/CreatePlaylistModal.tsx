import React, { useContext, useState } from "react";

import { Modal, Button, Header, Icon, Input } from "semantic-ui-react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { createPlaylist } from "../../lib/playlists";

const validate = (value: string) => (value ? undefined : "Required");

type CreatePlaylistModalProps = {
  open: boolean;
  setOpen(value: boolean): void;
};

export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  open,
  setOpen,
}) => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Form
      onSubmit={async (fields: any) => {
        setLoading(true);
        try {
          const id = await createPlaylist({
            ...fields,
            user_id: user.id,
          });
          history.push(`${id.data.data[0]}/`);
          setOpen(false);
        } catch (error) {
          console.log("error", error);
        } finally {
          setLoading(false);
        }
      }}
      render={({ handleSubmit }) => (
        <Modal
          basic
          open={open}
          size="small"
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <form onSubmit={handleSubmit}>
            <h2>Create Playlist</h2>
            <div>
              <Field
                name="name"
                validate={validate}
                render={({ meta, input }) => (
                  <>
                    <DarkInput
                      focus
                      fluid
                      {...input}
                      placeholder="Enter a playlist name"
                      borderColor={meta.error && meta.touched}
                    />
                  </>
                )}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <Button
                basic
                color="grey"
                inverted
                type="button"
                onClick={() => setOpen(false)}
              >
                <Icon name="remove" /> Cancel
              </Button>
              <Button inverted color="grey" type="submit" loading={loading}>
                <Icon name="checkmark" /> Submit
              </Button>
            </div>
          </form>
        </Modal>
      )}
    />
  );
};

const DarkInput = styled(Input)`
  &&&& input {
    background-color: transparent;
    border: 1px solid #c2c4c5;
    color: #fff;
  }
`;
