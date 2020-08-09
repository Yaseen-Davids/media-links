import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Input, Button, Select, Icon } from "semantic-ui-react";
import { Form, Field } from "react-final-form";
import { LinksContext } from "../../contexts/LinksContext";
import { createMediaLink } from "../../lib/media-links";
import { UserContext } from "../../contexts/UserContext";

const Container = styled.div`
  font-size: 12px;
  @media (max-width: 850px) and (min-width: 1px) {
    font-size: 11px;
  };
`;

const DropdownSelect = styled(Select)`
  &&&&&&& {
    color: #cecece;
    background-color: #1f1f1f;
    @media (max-width: 850px) and (min-width: 1px) {
      font-size: 11px;
    }
    div.text {
      color: #cecece;
    }
    .menu.transition {
      background-color: #1f1f1f;
      border: 1px solid #333;
      div {
        border: 1px solid #333;
        font-size: 12px;
        @media (max-width: 850px) and (min-width: 1px) {
          font-size: 11px;
        };
      }
      span {
        color: #cecece;
      }
    }
  }
`;

const FormContainer = styled.form`
  &&&&&&& {
    button {
      @media (max-width: 850px) and (min-width: 1px) {
        font-size: 11px;
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
  const { setLinks, links, toggleFilters, showFilters } = useContext(LinksContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const required = (value: any) => value ? undefined : "Please enter a YouTube link.";
  const { user } = useContext(UserContext);

  const handleTypeChange = (e: any, { value }: any) => {
    setType(value);
  };

  return (
    <Container>
      <Form
        onSubmit={async (fields: { link: string }) => {
          setLoading(true);
          try {
            const { data } = await createMediaLink({
              url: fields.link,
              type: type || "song",
              userId: user.id
            });
            links.splice(0, 0, data.data);
            setLinks([...links]);
          } catch (e) {
            alert(e);
          } finally {
            setLoading(false);
          }
        }}
        render={({ handleSubmit }) => (
          <FormContainer onSubmit={handleSubmit}>
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
                defaultValue="song"
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
              <Button
                basic
                type="reset"
                color="grey"
                size="small"
                onClick={() => toggleFilters(!showFilters)}
              >
                <Icon name="filter" />
              </Button>
            </Input>
          </FormContainer>
        )}
      />
    </Container>
  )
}