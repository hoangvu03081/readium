/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import TextareaAutosize from "react-textarea-autosize";
import { WithContext as ReactTags } from "react-tag-input";
import { useDropzone } from "react-dropzone";
import {
  useTitleDraft,
  useDescriptionDraft,
  useTagsDraft,
  useCoverImageDraft,
} from "../../../common/api/draftQuery";
import { ReactComponent as UploadIcon } from "../../../assets/icons/upload.svg";
import {
  Layout,
  InputTitle,
  InputDescription,
  InputTags,
  UploadImage,
  Note,
} from "./styles";

const StoryInformation = React.forwardRef(({ id }, ref) => {
  // TITLE
  let titleSaved = true;
  ref.current[5] = titleSaved;
  const [titleValidation, setTitleValidation] = useState(true);
  const resTitleDraft = useTitleDraft(id);
  const debounceSendTitleDraft = useCallback(
    debounce((titleDraft) => {
      titleSaved = true;
      ref.current[5] = titleSaved;
      resTitleDraft.mutate(titleDraft);
    }, 2000),
    [id]
  );
  const handleTitleChange = (titleDraft) => {
    titleSaved = false;
    ref.current[5] = titleSaved;
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
  ref.current[6] = descriptionSaved;
  const [descriptionValidation, setDescriptionValidation] = useState(true);
  const resDescriptionDraft = useDescriptionDraft(id);
  const debounceSendDescriptionDraft = useCallback(
    debounce((descriptionDraft) => {
      descriptionSaved = true;
      ref.current[6] = descriptionSaved;
      resDescriptionDraft.mutate(descriptionDraft);
    }, 2000),
    [id]
  );
  const handleDescriptionChange = (descriptionDraft) => {
    descriptionSaved = false;
    ref.current[6] = descriptionSaved;
    if (descriptionDraft.target.value.length === 250) {
      setDescriptionValidation(false);
    } else {
      setDescriptionValidation(true);
    }
    debounceSendDescriptionDraft(descriptionDraft);
  };

  // TAGS
  let tagsSaved = true;
  ref.current[7] = tagsSaved;
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
      tagsSaved = true;
      ref.current[7] = tagsSaved;
      resTagsDraft.mutate(tagsDraft);
    }, 2000),
    [id]
  );
  const handleTagsChange = (data) => {
    if (data.length === 5) {
      setTagsValidation(false);
    } else {
      setTagsValidation(true);
    }
  };
  const handleAddition = (tag) => {
    if (tagsValidation) {
      tagsSaved = false;
      ref.current[7] = tagsSaved;
      const newTags = [...tags, tag];
      setTags(newTags);
      debounceSendTagsDraft(newTags);
    }
  };
  const handleDelete = (i) => {
    tagsSaved = false;
    ref.current[7] = tagsSaved;
    const result = tags.filter((tag, index) => index !== i);
    setTags(result);
    handleTagsChange(result);
    debounceSendTagsDraft(result);
  };
  const handleDrag = (tag, currPos, newPos) => {
    tagsSaved = false;
    ref.current[7] = tagsSaved;
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
    debounceSendTagsDraft(newTags);
  };

  // COVER IMAGE
  const [coverImageSrc, setCoverImageSrc] = useState("");
  const resCoverImageDraft = useCoverImageDraft(id);
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("File reading was aborted.");
        reader.onerror = () => console.log("File reading has failed.");
        reader.onload = () => {
          const binaryStr = reader.result;
          const arr = new Uint8Array(binaryStr);
          const blob = new Blob([arr.buffer], { type: "image/png" });
          setCoverImageSrc(window.URL.createObjectURL(blob));
          ref.current[4].classList.remove("d-block");
          ref.current[4].classList.add("d-none");
        };
        reader.readAsArrayBuffer(file);
      });
      const coverImageDraft = new FormData();
      coverImageDraft.append("coverImage", acceptedFiles[0]);
      resCoverImageDraft.mutate(coverImageDraft);
    },
    [id]
  );
  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
  });
  ref.current[3] = inputRef;

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
          placeholder="Maximum 250 characters"
          minRows={1}
          maxRows={25}
          maxLength="250"
          onChange={handleDescriptionChange}
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
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
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
      <UploadImage backgroundImage={coverImageSrc} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop a file here ...</p>
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
          ref.current[4] = element;
        }}
      />
    </Layout>
  );
});

export default StoryInformation;

StoryInformation.propTypes = {
  id: PropTypes.string.isRequired,
};
