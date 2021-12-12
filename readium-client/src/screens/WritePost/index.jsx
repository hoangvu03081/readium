/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import StoryInformation from "./StoryInformation";
import StoryContent from "./StoryContent";
import BackToTop from "../../common/components/Buttons/BackToTop";

const Layout = styled.div`
  margin-top: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
`;

const SubmitBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.button`
  border: 2px solid #000000;
  border-radius: 50px;
  color: #000000;
  background-color: #ffffff;
  width: 111px;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  padding: 5px 0;
  margin-top: 40px;
  transition: all 0.35s;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #000000;
    transition: all 0.35s;
  }
`;

export default function WritePost() {
  const [id, setId] = useState("");

  useEffect(() => {
    async function initPost() {
      if (!id) {
        const res = await axios.post("http://localhost:5000/drafts");
        setId(res.data.id);
        console.log(res.data);
      }
    }
    initPost();
  }, [id]);
  return (
    <Layout className="container">
      <StoryInformation />
      <StoryContent id={id} />
      <SubmitBtnContainer>
        <SubmitBtn>Submit</SubmitBtn>
      </SubmitBtnContainer>
      <BackToTop />
    </Layout>
  );
}
