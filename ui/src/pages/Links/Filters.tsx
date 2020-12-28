import React, { FC, useContext } from "react";
import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";
import { LinksContext } from "../../contexts/LinksContext";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
  grid-gap: 10px;
  font-size: 12px;
  @media (max-width: 850px) and (min-width: 1px) {
    grid-template-columns: 1fr;
    grid-template-row: 1fr 1fr;
  }
`;

const DropdownSelect = styled(Dropdown)`
  &&&&&&& {
    color: #cecece;
    background-color: #1f1f1f;
    @media (max-width: 850px) and (min-width: 1px) {
      font-size: 11px;
    }
    div.text {
      color: #cecece;
    }
    a {
      background-color: #2a2a2a;
      color: #cecece;
    }
    .menu.transition {
      background-color: #1f1f1f;
      border: 1px solid #333;
      div {
        border-top: 1px solid #333;
        font-size: 12px;
        @media (max-width: 850px) and (min-width: 1px) {
          font-size: 11px;
        }
      }
      span {
        color: #cecece;
      }
      i {
        color: #cecece;
      }
    }
  }
`;

type FiltersProps = {};

export const Filters: FC<FiltersProps> = () => {
  const { sort, setSort, linkState, setLinkState, setLocalStorageOptions, showFilters } = useContext(LinksContext);

  const sortOptions = [
    { key: 1, text: "Sort date ascending", value: "sortDateAscending", icon: "arrow up" },
    { key: 2, text: "Sort date descending", value: "sortDateDescending", icon: "arrow down" },
    { key: 3, text: "Sort title ascending", value: "sortTitleAscending", icon: "sort alphabet up" },
    { key: 4, text: "Sort title descending", value: "sortTitleDescending", icon: "sort alphabet down" },
  ];

  const stateOptions = [
    { key: 1, text: "Active", value: "active" },
    { key: 2, text: "Removed", value: "removed" },
  ];

  const handleSortChange = (changes: any) => {
    if (changes.length <= 0) {
      setSort("sortDateAscending");
      setLocalStorageOptions("sort", "sortDateAscending");
    } else {
      setSort(changes);
      setLocalStorageOptions("sort", changes);
    }
  };

  const handleStateChange = (changes: any) => {
    if (changes.length <= 0) {
      setLinkState("active");
      setLocalStorageOptions("linkState", "active");
    } else {
      setLinkState(changes);
      setLocalStorageOptions("linkState", changes);
    }
  };

  return (
    <>
      {showFilters && (
        <Container>
          <>
            <DropdownSelect
              fluid
              selection
              value={sort}
              closeOnChange
              placeholder="Sort"
              options={sortOptions}
              onChange={(_: any, event: any) => handleSortChange(event.value)}
            />
            <DropdownSelect
              fluid
              selection
              value={linkState}
              closeOnChange
              placeholder="State"
              options={stateOptions}
              onChange={(_: any, event: any) => handleStateChange(event.value)}
            />
          </>
        </Container>
      )}
    </>
  )
}