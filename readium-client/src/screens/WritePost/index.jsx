/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import StoryInformation from "./StoryInformation";
import StoryContent from "./StoryContent";
import BackToTop from "../../common/components/Buttons/BackToTop";
import { Layout, SubmitBtnContainer, SubmitBtn } from "./styles";

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
  const checkEmptyCoverImage = (coverImageRef, noteCoverImageRef) => {
    if (coverImageRef.current.files.length === 0) {
      noteCoverImageRef.innerHTML =
        '<i class="ionicons ion-ios-information-outline"></i>Please insert a picture';
      noteCoverImageRef.classList.remove("d-none");
      noteCoverImageRef.classList.add("d-block");
      return false;
    }
    return true;
  };
  const history = useHistory();
  const handleSubmit = () => {
    const checkEmpty =
      checkEmptyTitle(
        storyInformationRef.current[0],
        storyInformationRef.current[1]
      ) &&
      checkEmptyCoverImage(
        storyInformationRef.current[2],
        storyInformationRef.current[3]
      );
    if (checkEmpty) {
      history.push("/preview");
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
