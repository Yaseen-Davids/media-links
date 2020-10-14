import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Input, Button, Icon } from "semantic-ui-react";
import { Form, Field } from "react-final-form";
import { LinksContext } from "../../contexts/LinksContext";
import { createMediaLink } from "../../lib/media-links";
import { UserContext } from "../../contexts/UserContext";
import { useRouteMatch } from "react-router-dom";

const Container = styled.div`
  font-size: 12px;
  @media (max-width: 850px) and (min-width: 1px) {
    font-size: 11px;
  };
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
  const required = (value: any) => value ? undefined : "Please enter a YouTube link.";
  const { user } = useContext(UserContext);
  const match = useRouteMatch<any>({ path: "/:playlistId/:videoId?" });

  return (
    <Container>
      <Form
        onSubmit={async (fields: { link: string }) => {
          setLoading(true);
          try {
            const { data } = await createMediaLink({
              url: fields.link,
              type: "video",
              userId: user.id,
              playlistId: match?.params.playlistId
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