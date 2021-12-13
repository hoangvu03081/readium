/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "../../common/hooks/useAuth";
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
  const { isAuth } = useAuth();
  useEffect(() => {
    async function initPost() {
      if (!id && isAuth) {
        const res = await axios.post("http://localhost:5000/drafts");
        setId(res.data.id);
        // console.log(res.data.id);
      }
    }
    initPost();
  }, [id, isAuth]);

  const storyInformationRef = useRef([null, null, null, null]);
  const checkEmptyTitle = (titleRef, noteTitleRef) => {
    if (titleRef.value === "") {
      titleRef.focus();
      noteTitleRef.innerHTML =
        '<i class="ionicons ion-ios-information-outline"></i>Please fill out this field';
      noteTitleRef.classList.remove("d-none");
      noteTitleRef.classList.add("d-block");
      return false;
    }
    return true;
  };
  const checkEmptyCoverImage = (coverImagRef, noteCoverImageRef) => {
    if (coverImagRef.current.files.length === 0) {
      noteCoverImageRef.innerHTML =
        '<i class="ionicons ion-ios-information-outline"></i>Please insert a picture';
      noteCoverImageRef.classList.add("d-block");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (
      checkEmptyTitle(
        storyInformationRef.current[0],
        storyInformationRef.current[1]
      ) &&
      checkEmptyCoverImage(
        storyInformationRef.current[2],
        storyInformationRef.current[3]
      )
    ) {
      console.log("PREVIEW");
    }
  };

  return (
    <Layout className="container">
      <StoryInformation id={id} ref={storyInformationRef} />
      <StoryContent id={id} />
      <SubmitBtnContainer>
        <SubmitBtn onClick={handleSubmit}>Submit</SubmitBtn>
      </SubmitBtnContainer>
      <BackToTop />
    </Layout>
  );
}
