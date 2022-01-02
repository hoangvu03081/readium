import React from "react";
import styled from "styled-components";
import Card from "../../common/components/Card";
import useSearch from "../../common/api/searchQuery";
import { PuffLoader } from "react-spinners";

const SearchResultLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function SearchBody({ query }) {
  const { isLoading, data } = useSearch(query);
  console.log(data);
  return (
    <>
      <h2 className="mb-2">You search for:</h2>
      <h1 className="mt-0 mb-5">{query}</h1>

      <SearchResultLayout>
        {data.map((result) => {
          if (result.type === "post")
            return (
              <Card
                key={result.id}
                postId={result.id}
                profileId={result.author.profileId}
                userId={result.author.profileId}
                preview={result.coverImage}
                title={result.title}
                content={result.content || result.description}
                tags={result.tags}
                duration={result.duration}
                user={result.author.displayName}
                userAvatar={result.author.avatar}
                loveNumber={result.likes}
                commentNumber={result.comments}
                type="otherProfile"
              />
            );
          return null;
        })}
        {isLoading && <PuffLoader />}
      </SearchResultLayout>
    </>
  );
}
