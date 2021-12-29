import React from "react";
import styled from "styled-components";
import { SearchInput } from "./styles";
import useInput from "../../hooks/useInput";
import SearchResult from "./components/SearchResult";

const StyledSearchBar = styled.div`
  position: relative;
`;

export default function SearchBar() {
  const [searchInput, changeSearchInput] = useInput();
  return (
    <StyledSearchBar className="ms-sm-4">
      <SearchInput
        type="text"
        placeholder="Search"
        onChange={changeSearchInput}
        value={searchInput}
      />
      <SearchResult />
    </StyledSearchBar>
  );
}
