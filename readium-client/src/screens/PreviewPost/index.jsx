import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import { useDraft, usePublish } from "../../common/api/draftQuery";
import LoadingOverlay from "../../common/components/LoadingOverlay";
import PostInfo from "../../common/components/PostInfo";
import PostContent from "../../common/components/PostContent";

// STYLES ----------------------------------------------------------
const Layout = styled.div``;

const SubHeader = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d4d4d4;
  background-color: white;
  z-index: 100;
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

const Content = styled.div`
  margin-top: 140px;
  padding-top: 15px;
  width: 55%;
`;
const PreviewTitle = styled.p`
  margin: 0 0 55px 0;
  padding: 0;
  text-align: center;
  font-family: "Raleway";
  font-weight: 500;
  font-size: 46px;
`;
const PostTitle = styled.p`
  margin-top: 0;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 36px;
`;
const PostDescription = styled.p`
  margin-top: 0;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  font-family: "PT Sans";
  font-weight: 500;
  font-size: 26px;
`;
const PostCoverImage = styled.img``;
// -----------------------------------------------------------------

export default function PreviewPost() {
  const { isAuth } = useAuth();
  const history = useHistory();
  const id = history.location.state;

  // GET DRAFT & COVER IMAGE DRAFT
  const { isFetched, data } = useDraft(id, isAuth);

  //  PUBLISH
  const publish = usePublish(id);
  const handlePublish = () => {
    publish.mutate();
  };

  // WAIT FOR DRAFT DATA
  if (!isFetched) {
    return <LoadingOverlay isLoading />;
  }
  const draft = data.data;

  return (
    <Layout>
      <SubHeader>
        <SubHeaderContainer className="container">
          <ContinueEditingBtn>Continue Editing</ContinueEditingBtn>
          <PublishBtn onClick={handlePublish}>Publish</PublishBtn>
        </SubHeaderContainer>
      </SubHeader>

      <Content className="container">
        <PreviewTitle>Preview your post</PreviewTitle>
        <PostTitle>{draft.title}</PostTitle>
        <PostDescription>{draft.description}</PostDescription>
        <PostInfo
          author={draft.author}
          publishedDate="Just now"
          duration={draft.duration}
          isPreview={false}
        />
        <PostCoverImage
          src={`http://localhost:5000/drafts/${id}/cover-image`}
        />
        <PostContent quillContent={draft.textEditorContent} />
      </Content>
    </Layout>
  );
}
