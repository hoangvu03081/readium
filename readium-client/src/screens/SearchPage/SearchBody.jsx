import React from "react";
import styled from "styled-components";

const SearchHeader = styled.h2``;

export default function SearchBody({ query }) {
  return (
    <>
      <h2>You search for:</h2>
      <h2 className="mt-0">{query}</h2>
    </>
  );
}
