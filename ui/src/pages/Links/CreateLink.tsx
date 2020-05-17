import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Input, Button, Select, Message } from "semantic-ui-react";
import { Form, Field } from "react-final-form";
import { LinksContext } from "../../contexts/LinksContext";
import { createMediaLink } from "../../lib/media-links";
import { UserContext } from "../../contexts/UserContext";
import YouTubeIcon from "../../icons/youtube.svg";
import SoundCloudIcon from "../../icons/soundcloud.svg";

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

const SupportedFormatWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 10px;
  padding-top: 5px;
  p {
    padding-left: 5px;
    color: #d4d4d4;
  }
  div {
    display: grid;
    grid-template-columns: min-content min-content;
    grid-gap: 5px;
  }
`;

const FormInput = styled.input`
  &&&&& {
    display: block;
    color: #cecece;
    background-color: #1f1f1f;
  }
`;

enum ResponseMessageType {
  Success = "success",
  Error = "error",
};

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
      <SupportedFormatWrapper>
        <p>Supported Formats: </p>
        <div>
          <img src={YouTubeIcon} alt="YouTube Logo" style={{ width: "20px" }} />
          <img src={SoundCloudIcon} alt="SoundCloud Logo" style={{ width: "20px" }} />
        </div>
      </SupportedFormatWrapper>
      <Form
        onSubmit={async (fields: { link: string }) => {
          setLoading(true);
          try {
            await createMediaLink({
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
                      placeholder="Enter Media link"
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
                value="song"
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
            {message.active && (
              <Message
                success={message.type == ResponseMessageType.Success}
                error={message.type == ResponseMessageType.Error}
                style={{ marginTop: "10px" }}
                onDismiss={handleDismiss}
              >
                {message.text}
              </Message>
            )}
          </form>
        )}
      />
    </Container>
  )
}