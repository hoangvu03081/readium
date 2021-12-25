/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import TextareaAutosize from "react-textarea-autosize";
import { WithContext as ReactTags } from "react-tag-input";
import { useDropzone } from "react-dropzone";
import Resizer from "react-image-file-resizer";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  useTitleDraft,
  useDescriptionDraft,
  useTagsDraft,
  useCoverImageDraft,
} from "../../../api/draftQuery";
import { ReactComponent as UploadIcon } from "../../../../assets/icons/upload.svg";
import {
  Layout,
  InputTitle,
  InputDescription,
  InputTags,
  UploadImage,
  Note,
  AddTagsBtn,
} from "./styles";

const StoryInformation = React.forwardRef(
  ({ id, data, dataCoverImage }, ref) => {
    // TITLE
    let titleSaved = true;
    ref.current[4] = titleSaved;
    const [titleValidation, setTitleValidation] = useState(true);
    const resTitleDraft = useTitleDraft(id);
    const debounceSendTitleDraft = useCallback(
      debounce((titleDraft) => {
        titleSaved = true;
        ref.current[4] = titleSaved;
        resTitleDraft.mutate(titleDraft);
      }, 2000),
      [id]
    );
    const handleTitleChange = (titleDraft) => {
      titleSaved = false;
      ref.current[4] = titleSaved;
      if (titleDraft.target.value.length === 0) {
        setTitleValidation(false);
        ref.current[1].innerHTML =
          '<i class="ionicons ion-ios-information-outline"></i>Please fill out this field';
      } else if (titleDraft.target.value.length === 100) {
        setTitleValidation(false);
        ref.current[1].innerHTML =
          '<i class="ionicons ion-ios-information-outline"></i>Maximum 100 characters';
      } else {
        setTitleValidation(true);
        ref.current[1].classList.remove("d-block");
        ref.current[1].classList.add("d-none");
      }
      debounceSendTitleDraft(titleDraft);
    };

    // DESCRIPTION
    let descriptionSaved = true;
    ref.current[5] = descriptionSaved;
    const [descriptionValidation, setDescriptionValidation] = useState(true);
    const resDescriptionDraft = useDescriptionDraft(id);
    const debounceSendDescriptionDraft = useCallback(
      debounce((descriptionDraft) => {
        descriptionSaved = true;
        ref.current[5] = descriptionSaved;
        resDescriptionDraft.mutate(descriptionDraft);
      }, 2000),
      [id]
    );
    const handleDescriptionChange = (descriptionDraft) => {
      descriptionSaved = false;
      ref.current[5] = descriptionSaved;
      if (descriptionDraft.target.value.length === 300) {
        setDescriptionValidation(false);
      } else {
        setDescriptionValidation(true);
      }
      debounceSendDescriptionDraft(descriptionDraft);
    };

    // TAGS
    const [tagsSaved, setTagsSaved] = useState(true);
    ref.current[6] = tagsSaved;
    const KeyCodes = {
      comma: 188,
      enter: 13,
    };
    const delimiters = [KeyCodes.comma, KeyCodes.enter];
    const [tags, setTags] = useState([]);
    const [tagsValidation, setTagsValidation] = useState(true);
    const resTagsDraft = useTagsDraft(id);
    const debounceSendTagsDraft = useCallback(
      debounce((tagsDraft) => {
        setTagsSaved(true);
        ref.current[6] = tagsSaved;
        resTagsDraft.mutate(tagsDraft);
      }, 2000),
      [id]
    );
    const handleTagsChange = (newTags) => {
      if (newTags.length === 5) {
        setTagsValidation(false);
      } else {
        setTagsValidation(true);
      }
    };
    const handleAddition = (tag) => {
      if (tagsValidation) {
        setTagsSaved(false);
        ref.current[6] = tagsSaved;
        const newTags = [...tags, tag];
        setTags(newTags);
        handleTagsChange(newTags);
        debounceSendTagsDraft(newTags);
      }
    };
    const handleDelete = (i) => {
      setTagsSaved(false);
      ref.current[6] = tagsSaved;
      const newTags = tags.filter((tag, index) => index !== i);
      setTags(newTags);
      handleTagsChange(newTags);
      debounceSendTagsDraft(newTags);
    };
    const handleDrag = (tag, currPos, newPos) => {
      setTagsSaved(false);
      ref.current[6] = tagsSaved;
      const newTags = tags.slice();
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);
      setTags(newTags);
      debounceSendTagsDraft(newTags);
    };
    const handleAddTagsBtn = () => {
      const tagInputData = document.getElementsByClassName(
        "ReactTags__tagInputField"
      )[0].value;
      if (tagInputData) {
        const newTags = {
          id: tagInputData,
          text: tagInputData,
        };
        handleAddition(newTags);
        document.getElementsByClassName("ReactTags__tagInputField")[0].value =
          "";
      }
    };

    // COVER IMAGE
    const [coverImageSaved, setCoverImageSaved] = useState(false);
    ref.current[7] = coverImageSaved;
    const [coverImage, setCoverImage] = useState("");
    const resCoverImageDraft = useCoverImageDraft(id);
    const onDrop = useCallback(
      (acceptedFiles) => {
        ref.current[3].classList.remove("d-block");
        ref.current[3].classList.add("d-none");
        Resizer.imageFileResizer(
          acceptedFiles[0],
          2048,
          2048,
          "PNG",
          100,
          0,
          (file) => {
            const reader = new FileReader();
            reader.onload = () => {
              setCoverImage(reader.result);
            };
            reader.readAsDataURL(file);
            const coverImageDraft = new FormData();
            coverImageDraft.append("coverImage", file);
            resCoverImageDraft.mutate(coverImageDraft);
            setCoverImageSaved(true);
            ref.current[7] = coverImageSaved;
          },
          "file"
        );
      },
      [id]
    );
    const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone(
      {
        onDrop,
      }
    );
    ref.current[3] = inputRef;

    // BINDING DATA
    const descriptionRef = useRef(null);
    useEffect(() => {
      if (data && dataCoverImage) {
        // title
        ref.current[0].value = data.title;

        // description
        descriptionRef.current.value = data.description;

        // tags
        const tagsData = data.tags.reduce((result, item) => {
          result.push({ id: item, text: item });
          return result;
        }, []);
        setTags(tagsData);

        // cover image
        const reader = new FileReader();
        reader.readAsDataURL(dataCoverImage);
        reader.onloadend = () => {
          setCoverImage(reader.result);
        };
      }
    }, []);

    return (
      <Layout>
        <h1>Your story information</h1>

        <h2>Your title*</h2>
        <InputTitle>
          <TextareaAutosize
            placeholder="Maximum 100 characters"
            minRows={1}
            maxRows={10}
            autoFocus
            maxLength="100"
            onChange={handleTitleChange}
            ref={(element) => {
              ref.current[0] = element;
            }}
          />
        </InputTitle>
        <Note
          className={titleValidation ? "d-none" : "d-block"}
          ref={(element) => {
            ref.current[1] = element;
          }}
        />

        <h3>Your description</h3>
        <InputDescription>
          <TextareaAutosize
            placeholder="Maximum 300 characters"
            minRows={1}
            maxRows={25}
            maxLength="300"
            onChange={handleDescriptionChange}
            ref={descriptionRef}
          />
        </InputDescription>
        <Note className={descriptionValidation ? "d-none" : "d-block"}>
          <i className="ionicons ion-ios-information-outline" />
          Maximum 300 characters
        </Note>

        <h3
          ref={(element) => {
            ref.current[2] = element;
          }}
        >
          Your tags
        </h3>
        <InputTags>
          <AddTagsBtn>
            <IoIosAddCircleOutline onClick={handleAddTagsBtn} />
          </AddTagsBtn>
          <ReactTags
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            allowUnique={false}
            inputFieldPosition="top"
            placeholder="Enter to create a tag"
            autofocus={false}
            autocomplete
          />
        </InputTags>
        <Note className={tagsValidation ? "d-none" : "d-block"}>
          <i className="ionicons ion-ios-information-outline" />
          Maximum 5 tags
        </Note>

        <h3>Your cover image*</h3>
        <UploadImage backgroundImage={coverImage} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop a file here</p>
          ) : (
            <div>
              <UploadIcon />
              <p>Choose a file or drag it here</p>
            </div>
          )}
        </UploadImage>
        <Note
          className="d-none"
          ref={(element) => {
            ref.current[3] = element;
          }}
        />
      </Layout>
    );
  }
);

export default StoryInformation;

StoryInformation.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any),
  dataCoverImage: PropTypes.objectOf(PropTypes.any),
};
StoryInformation.defaultProps = {
  data: null,
  dataCoverImage: null,
};
