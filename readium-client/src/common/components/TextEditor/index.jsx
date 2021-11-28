/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { ReactComponent as UploadIcon } from "../../../assets/icons/upload.svg";
import { ReactComponent as AddImage } from "../../../assets/icons/add_image.svg";
// import { ReactComponent as Code } from "../../../assets/icons/code.svg";
// import { ReactComponent as CodeBlock } from "../../../assets/icons/code_block.svg";

const icons = ReactQuill.Quill.import("ui/icons");
icons.code = '<i class="ionicons ion-code"></i>';

const Layout = styled.div`
  margin-top: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
`;

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
    border: 1px solid #000000;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    transition: all 0.25s;
  }
`;

const StoryContent = styled.div`
  h1 {
    margin: 0 0 40px 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 48px;
    text-align: center;
  }
`;
const TextEditorLayout = styled.div`
  width: 75%;
  margin: auto;
  position: relative;
  .ql-editor {
    border: 1px solid black;
    border-radius: 5px;
    min-height: 250px;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
  }
  .ql-code {
    color: #ccc;
  }
`;
const Buttons = styled.div`
  position: absolute;
  top: 7px;
  left: -52px;
  height: 100%;
  div {
    position: sticky;
    top: 460px;
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

export default function TextEditor() {
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
  const handleChange = (event) => {
    console.log(quill.current.getEditor().getText());
    console.log(event);
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
            maxRows={4}
            required
          />
        </InputTitle>
        <h3>Your description</h3>
        <InputDescription>
          <TextareaAutosize
            placeholder="Optional"
            minRows={1}
            maxRows={10}
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
        <TextEditorLayout>
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
        </TextEditorLayout>
        <div className="d-flex justify-content-center">
          <SubmitBtn>Submit</SubmitBtn>
        </div>
      </StoryContent>
    </Layout>
  );
}
