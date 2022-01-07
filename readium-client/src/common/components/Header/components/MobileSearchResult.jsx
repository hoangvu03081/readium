import React from "react";
import styled from "styled-components";
import PuffLoader from "react-spinners/PuffLoader";
import Card from "../../Card";

const StyledMobileSearchResult = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  max-height: 100%;
  width: 100vw;
  top: 64px;
  z-index: 1000;
  background-color: white;
  overflow: scroll;
`;

const Center = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  width: 80%;
`;

const Spacer = styled.div`
  height: 500px !important;
  width: 100%;
`;

export default function MobileSearchResult({ data, isLoading }) {
  console.log(data);
  return (
    <StyledMobileSearchResult>
      {isLoading && (
        <Center>
          <PuffLoader className="center" />
        </Center>
      )}
      {data && <Spacer />}
      {data &&
        data.map((result) => {
          if (result.type === "post") {
            return (
              <CardContainer>
                {" "}
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
              </CardContainer>
            );
          }
          if (result.type === "user") {
            return null;
          }
          return null;
        })}
    </StyledMobileSearchResult>
  );
}
