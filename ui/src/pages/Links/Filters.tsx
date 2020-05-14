import React, { FC, useContext } from "react";
import styled from "styled-components";
import { Dropdown } from "semantic-ui-react";
import { LinksContext } from "../../contexts/LinksContext";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 140px;
  margin-bottom: 20px;
  grid-gap: 10px;
  font-size: 12px;
`;

const DropdownSelect = styled(Dropdown)`
  &&&&&&& {
    color: #cecece;
    background-color: #1f1f1f;
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
  const { filters, setFilters, sort, setSort, downloadState, setDownloadState, setLocalStorageOptions } = useContext(LinksContext);

  const filterOptions = [
    { key: 1, text: "Songs", value: "song" },
    { key: 2, text: "Videos", value: "video" },
  ];

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

  const handleFilterChange = (changes: string[]) => {
    if (changes.length <= 0) {
      setFilters(["song"]);
      setLocalStorageOptions("filters", ["song"]);
    } else {
      setFilters(changes);
      setLocalStorageOptions("filters", changes);
    }
  };

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
      setDownloadState("active");
      setLocalStorageOptions("downloadState", "active");
    } else {
      setDownloadState(changes);
      setLocalStorageOptions("downloadState", changes);
    }
  };

  return (
    <Container>
      <DropdownSelect
        fluid
        multiple
        selection
        closeOnChange
        value={filters}
        options={filterOptions}
        placeholder="Filters"
        onChange={(_: any, event: any) => handleFilterChange(event.value)}
      />
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
        value={downloadState}
        closeOnChange
        placeholder="State"
        options={stateOptions}
        onChange={(_: any, event: any) => handleStateChange(event.value)}
      />
    </Container>
  )
}