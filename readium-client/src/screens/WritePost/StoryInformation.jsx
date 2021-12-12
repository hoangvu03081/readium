/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import debounce from "lodash.debounce";
import TextareaAutosize from "react-textarea-autosize";
import { WithContext as ReactTags } from "react-tag-input";
import { useDropzone } from "react-dropzone";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";

const Layout = styled.div`
  text-align: center;
  margin-bottom: 100px;
  h1 {
    margin: 0 0 60px 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 48px;
    @media (max-width: 520px) {
      font-size: 40px;
    }
  }
  h2 {
    margin: 0 0 15px 0;
    padding: 0;
    font-family: "PT Sans";
    font-weight: bold;
    font-size: 24px;
  }
  h3 {
    margin: 60px 0 15px 0;
    padding: 0;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
  }
`;
const InputTitle = styled.div`
  textarea {
    border: none;
    border-bottom: 1px solid #c8c8c8;
    width: 460px;
    font-family: "Raleway";
    font-weight: bold;
    font-size: 24px;
    resize: none;
    &:focus {
      outline: none;
      border-bottom: 2px solid #000000;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    ::-webkit-input-placeholder {
      text-align: center;
      font-family: "Raleway";
      font-weight: 500;
      font-size: 14px;
      padding-top: 9px;
    }
    :-moz-placeholder {
      text-align: center;
      font-family: "Raleway";
      font-weight: 500;
      font-size: 14px;
      padding-top: 9px;
    }
    ::-moz-placeholder {
      text-align: center;
      font-family: "Raleway";
      font-weight: 500;
      font-size: 14px;
      padding-top: 9px;
    }
    :-ms-input-placeholder {
      text-align: center;
      font-family: "Raleway";
      font-weight: 500;
      font-size: 14px;
      padding-top: 9px;
    }
    @media (max-width: 530px) {
      width: 90%;
    }
  }
`;
const InputDescription = styled.div`
  textarea {
    border: none;
    border-bottom: 1px solid #c8c8c8;
    width: 460px;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
    resize: none;
    &:focus {
      outline: none;
      border-bottom: 2px solid #000000;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    ::-webkit-input-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    :-moz-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    ::-moz-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    :-ms-input-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    @media (max-width: 530px) {
      width: 90%;
    }
  }
`;
const InputTags = styled.div`
  & .ReactTags__selected {
    width: 460px;
    margin-top: 15px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    @media (max-width: 530px) {
      width: 90%;
    }
  }
  span {
    padding: 5px 10px;
    border-radius: 41px;
    font-family: "PT Sans";
    font-weight: bold;
    color: ${({ theme }) => theme.colors.TagBtnText};
    background-color: ${({ theme }) => theme.colors.TagBtnBackground};
    transition: all 0.25s;
    > button {
      padding: 0;
      margin-left: 6px;
      color: ${({ theme }) => theme.colors.TagBtnText};
      background-color: ${({ theme }) => theme.colors.TagBtnBackground};
      border: none;
      cursor: pointer;
      transition: all 0.25s;
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.TagBtnHover};
      transition: all 0.25s;
      > button {
        background-color: ${({ theme }) => theme.colors.TagBtnHover};
        transition: all 0.25s;
      }
    }
  }
  input {
    border: none;
    border-bottom: 1px solid #c8c8c8;
    width: 460px;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
    resize: none;
    &:focus {
      outline: none;
      border-bottom: 2px solid #000000;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    ::-webkit-input-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    :-moz-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    ::-moz-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    :-ms-input-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    @media (max-width: 530px) {
      width: 90%;
    }
  }
`;
const Note = styled.p`
  i {
    margin-right: 5px;
  }
  margin: 0;
  color: red;
`;
const UploadImage = styled.div`
  margin: auto;
  height: 250px;
  width: 500px;
  border: 1px solid #cbcbcb;
  border-radius: 4px;
  background-color: #fafafa;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  transition: all 0.25s;
  div {
    display: ${(props) => (props.backgroundImage === "" ? "block" : "none")};
  }
  svg {
    font-size: 60px;
    margin-bottom: 5px;
  }
  p {
    margin: 0;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
    color: #ababab;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid #a3a3a3;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    transition: all 0.25s;
  }
  @media (max-width: 530px) {
    width: 90%;
  }
`;

const StoryInformation = React.forwardRef(({ id }, ref) => {
  // TITLE
  const [titleValidation, setTitleValidation] = useState(true);
  const sendTitleDraft = (titleDraft) => {
    axios.put(`http://localhost:5000/drafts/${id}/title`, {
      title: titleDraft.target.value,
    });
  };
  const debounceSendTitleDraft = useCallback(
    debounce((titleDraft) => sendTitleDraft(titleDraft), 3000),
    [id]
  );
  const handleTitleChange = (titleDraft) => {
    if (titleDraft.target.value.length === 100) {
      setTitleValidation(false);
    } else {
      setTitleValidation(true);
    }
    debounceSendTitleDraft(titleDraft);
  };

  const [descriptionValidation, setDescriptionValidation] = useState(true);
  const sendDescriptionDraft = (descriptionDraft) => {
    axios.put(`http://localhost:5000/drafts/${id}/description`, {
      description: descriptionDraft.target.value,
    });
  };
  const debounceSendDescriptionDraft = useCallback(
    debounce(
      (descriptionDraft) => sendDescriptionDraft(descriptionDraft),
      3000
    ),
    [id]
  );
  const handleDescriptionChange = (descriptionDraft) => {
    if (descriptionDraft.target.value.length === 300) {
      setDescriptionValidation(false);
    } else {
      setDescriptionValidation(true);
    }
    debounceSendDescriptionDraft(descriptionDraft);
  };

  // TAGS
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const [tags, setTags] = useState([]);
  const [tagsValidation, setTagsValidation] = useState(true);
  const sendTagsDraft = (tagsDraft) => {
    const data = tagsDraft.map((item) => item.text);
    axios.put(`http://localhost:5000/drafts/${id}/tags`, {
      tags: data,
    });
  };
  const debounceSendTagsDraft = useCallback(
    debounce((tagsDraft) => sendTagsDraft(tagsDraft), 3000),
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
      const newTags = [...tags, tag];
      setTags(newTags);
      debounceSendTagsDraft(newTags);
    }
  };
  const handleDelete = (i) => {
    const result = tags.filter((tag, index) => index !== i);
    setTags(result);
    handleTagsChange(result);
    debounceSendTagsDraft(result);
  };
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
    debounceSendTagsDraft(newTags);
  };

  // COVER IMAGE
  const [coverImageSrc, setCoverImageSrc] = useState("");
  const sendCoverImageDraft = (coverImageDraft) => {
    axios.put(
      `http://localhost:5000/drafts/${id}/cover-image`,
      coverImageDraft
    );
  };
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
        };
        reader.readAsArrayBuffer(file);
      });
      const coverImageDraft = new FormData();
      coverImageDraft.append("coverImage", acceptedFiles[0]);
      sendCoverImageDraft(coverImageDraft);
    },
    [id]
  );
  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
  });
  ref.current[2] = inputRef;

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
      >
        <i className="ionicons ion-ios-information-outline" />
        Maximum 100 characters
      </Note>

      <h3>Your description</h3>
      <InputDescription>
        <TextareaAutosize
          placeholder="Maximum 300 characters"
          minRows={1}
          maxRows={25}
          maxLength="300"
          onChange={handleDescriptionChange}
        />
      </InputDescription>
      <Note className={descriptionValidation ? "d-none" : "d-block"}>
        <i className="ionicons ion-ios-information-outline" />
        Maximum 300 characters
      </Note>

      <h3>Your tags</h3>
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
        ref={(element) => {
          ref.current[3] = element;
        }}
      >
        <i className="ionicons ion-ios-information-outline" />
      </Note>
    </Layout>
  );
});

export default StoryInformation;

StoryInformation.propTypes = {
  id: PropTypes.string.isRequired,
};
