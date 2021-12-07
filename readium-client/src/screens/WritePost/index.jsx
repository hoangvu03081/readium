/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import StoryInformation from "./StoryInformation";
import StoryContent from "./StoryContent";
import BackToTop from "../../common/components/Buttons/BackToTop";

const Layout = styled.div`
  margin-top: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
`;

export default function WritePost() {
  return (
    <Layout className="container">
      <StoryInformation />
      <StoryContent />
      <BackToTop />
    </Layout>
  );
}
