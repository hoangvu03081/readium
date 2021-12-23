import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import { useDraft, usePublish } from "../../common/api/draftQuery";
import LoadingOverlay from "../../common/components/LoadingOverlay";
import Post from "../../common/components/Post";
import BackToTop from "../../common/components/Buttons/BackToTop";

// STYLES ----------------------------------------------------------
const Layout = styled.div`
  padding-bottom: 55px;
`;
const SubHeader = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d4d4d4;
  background-color: white;
  z-index: 9;
  position: fixed;
  top: 80px;
`;
const SubHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ContinueEditingBtn = styled.button`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  padding: 5px 20px;
  border-radius: 42px;
  border: 2px solid black;
  background-color: white;
  color: black;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.3s;
  }
`;
const PublishBtn = styled.button`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  padding: 5px 20px;
  border-radius: 42px;
  border: 2px solid #e53170;
  background-color: #e53170;
  color: white;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    border: 2px solid #ff528e;
    background-color: #ff528e;
    transition: all 0.3s;
  }
`;
// -----------------------------------------------------------------

export default function PreviewPost() {
  const { auth } = useAuth();
  const history = useHistory();
  const id = history.location.state;
  const [isLoading, setIsLoading] = useState(false);

  // GET DRAFT & COVER IMAGE DRAFT
  const [
    { isFetched: isFetchedDraft, data: dataDraft },
    { isFetched: isFetchedCoverImage, data: dataCoverImage },
  ] = useDraft(id, auth);

  //  HANDLE PUBLISH
  const publish = usePublish(id, auth);
  const handlePublish = () => {
    if (auth) {
      publish.mutate();
      setIsLoading(true);
      setTimeout(() => {
        history.push(`/post/${id}`, id);
      }, 1250);
    } else {
      // eslint-disable-next-line no-alert
      alert("An error has occurred when publishing post.");
    }
  };

  // HANDLE CONTINUE EDITING
  const handleContinueEditing = () => {
    history.push("/edit/draft", id);
  };

  // WAIT FOR DATA
  if (!isFetchedDraft || !isFetchedCoverImage) {
    return <LoadingOverlay isLoading />;
  }
  const draft = dataDraft.data;
  const coverImageSrc = window.URL.createObjectURL(dataCoverImage.data);

  return (
    <Layout>
      <LoadingOverlay isLoading={isLoading} />

      <SubHeader>
        <SubHeaderContainer className="container">
          <ContinueEditingBtn onClick={handleContinueEditing}>
            Continue Editing
          </ContinueEditingBtn>
          <PublishBtn onClick={handlePublish}>Publish</PublishBtn>
        </SubHeaderContainer>
      </SubHeader>

      <Post data={draft} coverImageSrc={coverImageSrc} type="preview" />

      <BackToTop />
    </Layout>
  );
}
