import React from "react";
import styled from "styled-components";
import PostResult from "./PostResult";
import UserResult from "./UserResult";

const StyledSearchResult = styled.div`
  position: absolute;
  width: 388px;
  min-height: 123px;
  border-radius: 5px;
  border: solid 2px black;
  background-color: white;
  z-index: 1;
  top: calc(100% + 8px);
  left: calc((100% - 388px) / 2);
  box-shadow: 0px 4px 4px 0px #00000040;
  padding: 10px 0;
`;

export default function SearchResult({ searchInput }) {
  return (
    <StyledSearchResult>
      <UserResult />
      <PostResult />
      <PostResult />
    </StyledSearchResult>
  );
}
