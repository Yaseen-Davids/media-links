import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Input, Button, Select, Message } from "semantic-ui-react";
import { Form, Field } from "react-final-form";
import { LinksContext } from "../../contexts/LinksContext";
import { createYoutubeLink } from "../../lib/youtube-links";
import { UserContext } from "../../contexts/UserContext";

const Container = styled.div`
  font-size: 12px;
`;

const DropdownSelect = styled(Select)`
  &&&&&&& {
    color: #cecece;
    background-color: #1f1f1f;
    div.text {
      color: #cecece;
    }
    .menu.transition {
      background-color: #1f1f1f;
      border: 1px solid #333;
      div {
        border: 1px solid #333;
        font-size: 12px;
      }
      span {
        color: #cecece;
      }
    }
  }
`;

const FormInput = styled.input`
  &&&&& {
    display: block;
    color: #cecece;
    background-color: #1f1f1f;
  }
`;

type CreateLinkProps = {};

export const CreateLink: React.FC<CreateLinkProps> = () => {
  const { setReload } = useContext(LinksContext);
  const [message, setMessage] = useState<Partial<{ type: string; text: string; active: boolean }>>({ type: "", text: "", active: false });
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const required = (value: any) => value ? undefined : "Please enter a YouTube link.";
  const { user } = useContext(UserContext);

  const handleTypeChange = (e: any, { value }: any) => {
    setType(value);
  };

  const handleDismiss = () => setMessage({ active: false });

  return (
    <Container>
      <Form
        onSubmit={async (fields: { link: string }) => {
          setLoading(true);
          try {
            await createYoutubeLink({
              url: fields.link,
              type: type || "song",
              userId: user.id
            });
            setReload(true);
            setMessage({ type: "success", text: "Successfully added link.", active: true });
          } catch (e) {
            setMessage({ type: "error", text: e.message || "Error creating link.", active: true });
          } finally {
            setLoading(false);
          }
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input action fluid>
              <Field
                name="link"
                type="text"
                validate={required}
                render={({ input, meta }) => (
                  <>
                    <FormInput
                      {...input}
                      placeholder="Enter YouTube link"
                    />
                  </>
                )}
              />
              <DropdownSelect
                compact
                options={[
                  { key: "Song", text: "Song", value: "song" },
                  { key: "Video", text: "Video", value: "video" },
                ]}
                placeholder="Type"
                onChange={handleTypeChange}
              />
              <Button
                basic
                type="submit"
                color="grey"
                size="small"
                loading={loading}
              >
                Add
              </Button>
            </Input>
            {message.active && <Message {...message.type} style={{ marginTop: "10px" }} onDismiss={handleDismiss}>{message.text}</Message>}
          </form>
        )}
      />
    </Container>
  )
}