import React from "react";
import styled from "styled-components";
import PuffLoader from "react-spinners/PuffLoader";
import PostResult from "./PostResult";
import UserResult from "./UserResult";

const StyledSearchResult = styled.div`
  position: absolute;
  width: 388px;
  min-height: 66px;
  border-radius: 5px;
  border: solid 2px black;
  background-color: white;
  z-index: 1;
  top: calc(100% + 8px);
  left: calc((100% - 388px) / 2);
  box-shadow: 0px 4px 4px 0px #00000040;
  padding: 10px 0;
`;

const CenterValue = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SearchResult({ data, isLoading }) {
  if (isLoading)
    return (
      <StyledSearchResult>
        <CenterValue>
          <PuffLoader height={30} width={30} />
        </CenterValue>
      </StyledSearchResult>
    );

  if (data && data.length !== 0)
    return (
      <StyledSearchResult>
        {data.map((sr) => {
          if (sr.type === "user") return <UserResult user={sr} key={sr._id} />;
          if (sr.type === "post")
            return <PostResult title={sr.title} url={sr.url} key={sr.id} />;
          return null;
        })}
      </StyledSearchResult>
    );

  return (
    <StyledSearchResult className="text-center">
      <CenterValue>No result</CenterValue>
    </StyledSearchResult>
  );
}
