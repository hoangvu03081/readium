/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import StoryInformation from "./StoryInformation";
import StoryContent from "./StoryContent";
import BackToTop from "../Buttons/BackToTop";
import LoadingOverlay from "../LoadingOverlay";
import { Layout, SubmitBtnContainer, SubmitBtn } from "./styles";

export default function HandlePost({ id, data, dataCoverImage }) {
  const history = useHistory();
  const storyInformationRef = useRef([
    null, // [0] title input
    null, // [1] note title
    null, // [2] your tags
    null, // [3] cover image note
    null, // [4] draft title saved
    null, // [5] draft description saved
    null, // [6] draft tags saved
    null, // [7] cover image saved
  ]);
  const storyContentRef = useRef([null]);
  const [isLoading, setIsLoading] = useState(false);

  // HANDLE LEAVE SITE
  useEffect(
    () => () => {
      const storyInformationSaved =
        storyInformationRef.current[4] &&
        storyInformationRef.current[5] &&
        storyInformationRef.current[6];
      const storyContentSaved = storyContentRef.current[0];
      if (!storyInformationSaved || !storyContentSaved) {
        alert("Please wait a second to save your draft.");
      }
    },
    []
  );

  // HANDLE SUBMIT ---------------------------------------------------------------
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
  const checkEmptyCoverImage = (
    yourTags,
    coverImageSaved,
    noteCoverImageRef
  ) => {
    if (dataCoverImage) {
      storyInformationRef.current[7] = true;
      return true;
    }
    if (!coverImageSaved) {
      noteCoverImageRef.innerHTML =
        '<i class="ionicons ion-ios-information-outline"></i>Please insert a picture';
      noteCoverImageRef.classList.remove("d-none");
      noteCoverImageRef.classList.add("d-block");
      yourTags.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const isNotEmpty =
      checkEmptyTitle(
        storyInformationRef.current[0],
        storyInformationRef.current[1]
      ) &&
      checkEmptyCoverImage(
        storyInformationRef.current[2],
        storyInformationRef.current[7],
        storyInformationRef.current[3]
      );

    const storyInformationSaved =
      storyInformationRef.current[4] &&
      storyInformationRef.current[5] &&
      storyInformationRef.current[6] &&
      storyInformationRef.current[7];
    const storyContentSaved = storyContentRef.current[0];

    if (isNotEmpty) {
      if (!storyInformationSaved || !storyContentSaved) {
        setIsLoading(true);
        setTimeout(() => {
          history.push(`/preview/${id}`, id);
        }, 2001);
      } else {
        history.push(`/preview/${id}`, id);
      }
    }
  };
  // -----------------------------------------------------------------------------

  return (
    <Layout className="container">
      <LoadingOverlay isLoading={isLoading} />

      <StoryInformation
        id={id}
        data={data}
        dataCoverImage={dataCoverImage}
        ref={storyInformationRef}
      />

      <StoryContent id={id} data={data} ref={storyContentRef} />

      <SubmitBtnContainer>
        <SubmitBtn onClick={handleSubmit}>Submit</SubmitBtn>
      </SubmitBtnContainer>

      <BackToTop />
    </Layout>
  );
}

HandlePost.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any),
  dataCoverImage: PropTypes.objectOf(PropTypes.any),
};
HandlePost.defaultProps = {
  data: null,
  dataCoverImage: null,
};
