import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDraft, usePublish } from "../../common/api/draftQuery";
import { useAuth } from "../../common/hooks/useAuth";
import { LoadingOverlay } from "../WritePost/styles";

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
    return (
      <>
        <LoadingOverlay>
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </LoadingOverlay>
      </>
    );
  }

  console.log(data.data);

  return (
    <Layout>
      <SubHeader>
        <ContinueEditingBtn>Continue Editing</ContinueEditingBtn>
        <PublishBtn onClick={handlePublish}>Publish</PublishBtn>
      </SubHeader>
      <div>a</div>
    </Layout>
  );
}
