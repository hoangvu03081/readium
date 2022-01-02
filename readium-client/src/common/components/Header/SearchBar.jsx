import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { SearchInput } from "./styles";
import useInput from "../../hooks/useInput";
import SearchResult from "./components/SearchResult";
import useSearch from "../../api/searchQuery";
import useOutsideClickAlerter from "../../hooks/useOutsideClickAlerter";
import useRouter from "../../hooks/useRouter";

const StyledSearchBar = styled.div`
  position: relative;
`;

export default function SearchBar() {
  const [searchInput, changeSearchInput, setSearchInput] = useInput();
  const [showSearchResult, changeShowSearchResult] = useState(false);
  const { isLoading, data } = useSearch(searchInput);
  const searchResultRef = useRef();
  const { push, location } = useRouter();
  useOutsideClickAlerter(searchResultRef, () => changeShowSearchResult(false));

  useEffect(() => {
    if (isLoading || data) changeShowSearchResult(true);
    if (searchInput.length === 0) changeShowSearchResult(false);
  }, [searchInput]);

  useEffect(() => {
    if (!location.pathname.includes("search")) {
      changeShowSearchResult(false);
      setSearchInput("");
    }
  }, [location.pathname]);

  const enterPressed = (e) => {
    if (e?.key === "Enter" && searchInput.length > 0) {
      push(`/search?q=${encodeURIComponent(searchInput)}`);
      changeShowSearchResult(false);
    }
  };

  return (
    <StyledSearchBar className="ms-sm-4" ref={searchResultRef}>
      <SearchInput
        type="text"
        placeholder="Search"
        onChange={changeSearchInput}
        value={searchInput}
        onKeyPress={enterPressed}
      />
      {showSearchResult && <SearchResult isLoading={isLoading} data={data} />}
    </StyledSearchBar>
  );
}
