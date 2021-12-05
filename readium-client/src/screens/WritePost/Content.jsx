/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import BackToTop from "../../common/components/Buttons/BackToTop";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import { ReactComponent as AddImage } from "../../assets/icons/add_image.svg";
// import { ReactComponent as Code } from "../../assets/icons/code.svg";
// import { ReactComponent as CodeBlock } from "../../assets/icons/code_block.svg";

const icons = ReactQuill.Quill.import("ui/icons");
icons.code = '<i class="ionicons ion-code"></i>';

const Layout = styled.div`
  margin-top: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
`;

// STORY INFORMATION
const StoryInformation = styled.div`
  text-align: center;
  margin-bottom: 100px;
  h1 {
    margin: 0 0 60px 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 48px;
  }
  h2 {
    margin: 0 0 15px 0;
    padding: 0;
    font-family: "PT Sans";
    font-weight: bold;
    font-size: 24px;
  }
  h3,
  h4 {
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

// STORY CONTENT
const StoryContent = styled.div`
  > h1 {
    margin: 0 0 40px 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 48px;
    text-align: center;
  }
`;
const TextEditor = styled.div`
  width: 68%;
  margin: auto;
  position: relative;
  .ql-editor {
    min-height: 350px;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
  }
  .ql-bubble .ql-tooltip {
    z-index: 1;
  }
  .ql-code {
    color: #ccc;
  }
  @media (max-width: 1000px) {
    width: 88%;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 530px) {
    width: 72%;
  }
  @media (max-width: 350px) {
    width: 66%;
  }
`;
const Buttons = styled.div`
  position: absolute;
  top: 7px;
  left: -52px;
  height: 100%;
  div {
    position: sticky;
    top: 130px;
    display: flex;
    flex-direction: column;
  }
  svg {
    font-size: 35px;
    border: 1px solid #000000;
    border-radius: 50%;
    margin-bottom: 15px;
    padding: 5px;
    transition: all 0.3s;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
      transition: all 0.3s;
    }
  }
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

export default function Content() {
  // UPLOAD IMAGE
  const [imgSrc, setImgSrc] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    // send to server
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        const arr = new Uint8Array(binaryStr);
        const blob = new Blob([arr.buffer], { type: "image/png" });
        setImgSrc(window.URL.createObjectURL(blob));
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // TEXT EDITOR
  const quill = useRef(null);
  const editorModules = {
    toolbar: [
      ["bold", "italic", "link"],
      [
        { header: "1" },
        { header: "2" },
        { list: "ordered" },
        { list: "bullet" },
      ],
      ["blockquote", "code", "code-block", "image"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const handleChange = (event, delta) => {
    console.log(quill.current.getEditor().getContents());
    console.log(event);
    console.log(delta);
  };
  const addImage = () => {
    document.getElementsByClassName("ql-image")[0].click();
  };

  return (
    <Layout className="container">
      <StoryInformation>
        <h1>Your story information</h1>
        <h2>Your title</h2>
        <InputTitle>
          <TextareaAutosize
            placeholder="Maximum 100 characters"
            minRows={1}
            maxRows={10}
            required
          />
        </InputTitle>
        <h3>Your description</h3>
        <InputDescription>
          <TextareaAutosize
            placeholder="Optional"
            minRows={1}
            maxRows={25}
            required
          />
        </InputDescription>
        <h4>Your cover image</h4>
        <UploadImage backgroundImage={imgSrc} {...getRootProps()}>
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
      </StoryInformation>

      <StoryContent>
        <h1>Your story content</h1>
        <TextEditor>
          <ReactQuill
            ref={quill}
            theme="bubble"
            modules={editorModules}
            onChange={handleChange}
            placeholder="Tell your story..."
          />
          <Buttons className="ql-buttons">
            <div>
              <AddImage onClick={addImage} />
            </div>
          </Buttons>
        </TextEditor>
        <div className="d-flex justify-content-center">
          <SubmitBtn>Submit</SubmitBtn>
        </div>
      </StoryContent>
      <BackToTop />
    </Layout>
  );
}
