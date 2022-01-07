import React, { useEffect } from "react";
import styled from "styled-components";
import PuffLoader from "react-spinners/PuffLoader";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Writer from "../../../../screens/SearchPage/Writer";
import Card from "../../Card";

const StyledMobileSearchResult = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 64px);
  width: 100vw;
  top: 64px;
  z-index: 1000;
  background-color: white;
  overflow-y: scroll;
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
  height: 50px;
  width: 10px;
  margin-top: 20px;
`;

export default function MobileSearchResult({ data, isLoading }) {
  console.log(data)
  useEffect(() => {
    disablePageScroll();
    return () => enablePageScroll();
  }, []);
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
            return (
              <Writer
                key={result._id}
                profileId={result._id}
                name={result.displayName}
                job="Student"
                profileUrl={result.url}
              />
            );
          }
          return null;
        })}
      {data && <Spacer />}
    </StyledMobileSearchResult>
  );
}
