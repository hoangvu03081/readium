import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDraft } from "../../common/api/draftQuery";

const Layout = styled.div`
  margin-top: 80px;
`;

export default function PreviewPost() {
  const history = useHistory();
  const id = history.location.state;
  const getDraft = useDraft(id);

  console.log(getDraft.data.data);

  return (
    <Layout>
      <div>a</div>
    </Layout>
  );
}
