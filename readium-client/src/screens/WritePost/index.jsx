/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import { useDraftID } from "../../common/api/draftQuery";
import StoryInformation from "./StoryInformation";
import StoryContent from "./StoryContent";
import BackToTop from "../../common/components/Buttons/BackToTop";
import LoadingOverlay from "../../common/components/LoadingOverlay";
import { Layout, SubmitBtnContainer, SubmitBtn } from "./styles";

export default function WritePost() {
  // GET DRAFT ID
  const [id, setId] = useState("");
  const { auth } = useAuth();
  const draftId = useDraftID();
  useEffect(() => {
    async function initPost() {
      if (!id && auth) {
        draftId.mutate(null, {
          onSuccess: (result) => {
            setId(result.data.id);
            // console.log(result.data.id);
          },
        });
      }
    }
    initPost();
  }, [id, auth]);

  // HANDLE SUBMIT --------------------------------------------------------------
  const storyInformationRef = useRef([
    null, // title input
    null, // note title
    null, // your tags
    null, // cover image input
    null, // cover image note
    null, // draft title saved
    null, // draft description saved
    null, // draft tags saved
  ]);
  const storyContentRef = useRef([null]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

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

  const checkEmptyCoverImage = (yourTags, coverImageRef, noteCoverImageRef) => {
    if (coverImageRef.current.files.length === 0) {
      noteCoverImageRef.innerHTML =
        '<i class="ionicons ion-ios-information-outline"></i>Please insert a picture';
      noteCoverImageRef.classList.remove("d-none");
      noteCoverImageRef.classList.add("d-block");
      yourTags.scrollIntoView();
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
        storyInformationRef.current[3],
        storyInformationRef.current[4]
      );

    const storyInformationSaved =
      storyInformationRef.current[4] &&
      storyInformationRef.current[5] &&
      storyInformationRef.current[6];

    const storyContentSaved = storyContentRef.current[0];

    if (isNotEmpty) {
      if (!storyInformationSaved || !storyContentSaved) {
        setIsLoading(true);
        setTimeout(() => {
          history.push("/preview", id);
        }, 2001);
      } else {
        history.push("/preview", id);
      }
    }
  };
  // -------------------------------------------------------------------

  return (
    <Layout className="container">
      <LoadingOverlay isLoading={isLoading} />
      <StoryInformation id={id} ref={storyInformationRef} />
      <StoryContent id={id} ref={storyContentRef} />
      <SubmitBtnContainer>
        <SubmitBtn onClick={handleSubmit}>Submit</SubmitBtn>
      </SubmitBtnContainer>
      <BackToTop />
    </Layout>
  );
}
