import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { SearchInput } from "./styles";
import useInput from "../../hooks/useInput";
import SearchResult from "./components/SearchResult";
import useSearch from "../../api/searchQuery";
import useOutsideClickAlerter from "../../hooks/useOutsideClickAlerter";

const StyledSearchBar = styled.div`
  position: relative;
`;

export default function SearchBar() {
  const [searchInput, changeSearchInput] = useInput();
  const [showSearchResult, changeShowSearchResult] = useState(false);
  const { isIdle, isLoading, data } = useSearch(searchInput);
  const searchResultRef = useRef();
  useOutsideClickAlerter(searchResultRef, () => changeShowSearchResult(false));

  useEffect(() => {
    if (isLoading || data) changeShowSearchResult(true);
    if (searchInput.length === 0) changeShowSearchResult(false);
  }, [searchInput]);

  return (
    <StyledSearchBar className="ms-sm-4" ref={searchResultRef}>
      <SearchInput
        type="text"
        placeholder="Search"
        onChange={changeSearchInput}
        value={searchInput}
      />
      {showSearchResult && <SearchResult isLoading={isLoading} data={data} />}
    </StyledSearchBar>
  );
}
