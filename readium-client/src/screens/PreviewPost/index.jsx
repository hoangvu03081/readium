import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDraft, usePublish } from "../../common/api/draftQuery";
import PostContent from "../../common/components/PostContent";
import { useAuth } from "../../common/hooks/useAuth";
import LoadingOverlay from "../../common/components/LoadingOverlay";

// STYLES ----------------------------------------------------------
const Layout = styled.div`
  margin-top: 80px;
`;

const SubHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContinueEditingBtn = styled.button``;

const PublishBtn = styled.button``;
// -----------------------------------------------------------------

export default function PreviewPost() {
  // GET DRAFT
  const { isAuth } = useAuth();
  const history = useHistory();
  const id = history.location.state;
  const { isFetched, data } = useDraft(id, isAuth);

  //  PUBLISH
  const publish = usePublish(id);
  const handlePublish = () => {
    publish.mutate();
  };

  if (!isFetched) {
    return <LoadingOverlay isLoading />;
  }

  const quillContent = data.data.textEditorContent;
  // console.log(data.data);

  return (
    <Layout className="container">
      <SubHeader>
        <ContinueEditingBtn>Continue Editing</ContinueEditingBtn>
        <PublishBtn onClick={handlePublish}>Publish</PublishBtn>
      </SubHeader>
      <PostContent quillContent={quillContent} />
    </Layout>
  );
}
