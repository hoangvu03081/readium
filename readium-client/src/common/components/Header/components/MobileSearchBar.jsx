import React from "react";
import styled from "styled-components";
import useSearch from "../../../api/searchQuery";
import useInput from "../../../hooks/useInput";
import MobileSearchResult from "./MobileSearchResult";

const StyledMobileSearchBar = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  .search-input {
    -webkit-appearance: none;
    flex-grow: 1;
    margin-left: 20px;
    margin-right: 20px;
    height: 100%;
    border: none;
    font-size: 16px;

    &:focus,
    &:focus {
      outline: none;
    }
  }

  .btn-cancel {
    padding: 0;
    padding-right: 20px;
    font-size: 16px;
    font-weight: bold;
    width: 80px;
    border: none;
    background: none;
  }
`;

export default function MobileSearchBar({ setIsSearch }) {
  const [searchInput, handleSearchInput, setSearchInput] = useInput();
  const { isLoading, data } = useSearch(searchInput);

  return (
    <StyledMobileSearchBar>
      <input
        className="search-input"
        type="text"
        value={searchInput}
        onChange={handleSearchInput}
        autoFocus
      />
      <button
        className="btn-cancel"
        type="button"
        onClick={() => setIsSearch(false)}
      >
        Cancel
      </button>
      {searchInput.length > 1 && (
        <MobileSearchResult data={data} isLoading={isLoading} />
      )}
    </StyledMobileSearchBar>
  );
}
