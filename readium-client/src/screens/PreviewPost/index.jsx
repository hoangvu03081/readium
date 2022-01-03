import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import { useDraft, usePublish } from "../../common/api/draftQuery";
import LoadingOverlay from "../../common/components/LoadingOverlay";
import Post from "../../common/components/Post";
import BackToTop from "../../common/components/Buttons/BackToTop";

// STYLES ----------------------------------------------------------
const Layout = styled.div`
  padding-bottom: 50px;
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
  @media (max-width: 290px) {
    height: 100px;
  }
`;

const SubHeaderContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 90%;
  }
  @media (max-width: 650px) {
    width: 92%;
  }
  @media (max-width: 290px) {
    flex-wrap: wrap;
    gap: 10px;
  }
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
  @media (max-width: 400px) {
    font-size: 16px;
    padding: 5px 15px;
  }
  @media (max-width: 330px) {
    font-size: 15px;
  }
  @media (max-width: 290px) {
    width: 100%;
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
  @media (max-width: 400px) {
    font-size: 16px;
    padding: 5px 15px;
  }
  @media (max-width: 330px) {
    font-size: 15px;
  }
  @media (max-width: 290px) {
    width: 100%;
  }
`;

const PostContainer = styled.div`
  width: 60%;
  margin-top: 150px;
  margin-bottom: 50px;
  padding-top: 15px;
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 90%;
  }
  @media (max-width: 650px) {
    width: 92%;
  }
  @media (max-width: 290px) {
    margin-top: 185px;
  }
`;
// -----------------------------------------------------------------

export default function PreviewPost() {
  const { auth } = useAuth();
  const { draftId } = useParams();
  const history = useHistory();
  const [id, setId] = useState(history.location.state);
  const [isLoading, setIsLoading] = useState(false);
  if (!id) {
    setId(draftId);
  }
  if (id === "published") {
    return <LoadingOverlay isLoading text="No post found" />;
  }

  // GET DRAFT & COVER IMAGE DRAFT
  const [
    { isFetched: isFetchedDraft, data: dataDraft, isError: isErrorDraft },
    {
      isFetched: isFetchedCoverImage,
      data: dataCoverImage,
      isError: isErrorCoverImage,
    },
  ] = useDraft(id, auth);

  //  HANDLE PUBLISH
  const publish = usePublish(id, auth);
  const handlePublish = () => {
    if (auth) {
      publish.mutate();
      setIsLoading(true);
      setTimeout(() => {
        history.replace({ pathname: `/preview/${id}`, state: "published" });
        history.push(`/post/${id}`, id);
      }, 1250);
    } else {
      // eslint-disable-next-line no-alert
      alert("An error has occurred when publishing post.");
    }
  };

  // HANDLE CONTINUE EDITING
  const handleContinueEditing = () => {
    history.push(`/edit/draft/${id}`, id);
  };

  // WAIT FOR DATA
  if (
    !isFetchedDraft ||
    !isFetchedCoverImage ||
    !dataDraft.data ||
    !dataCoverImage
  ) {
    return <LoadingOverlay isLoading />;
  }
  if (isErrorDraft || isErrorCoverImage) {
    return (
      <LoadingOverlay
        isLoading
        text="Some errors occurred while loading draft..."
      />
    );
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

      <PostContainer className="container">
        <Post data={draft} coverImageSrc={coverImageSrc} type="preview" />
      </PostContainer>

      <BackToTop />
    </Layout>
  );
}
