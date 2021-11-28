import React, { useRef } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const Layout = styled.div`
  margin-top: 80px;
  padding-top: 60px;
  padding-bottom: 60px;
`;

const StoryInformation = styled.div`
  text-align: center;
  margin-bottom: 80px;
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

const StoryContent = styled.div`
  h1 {
    margin: 0 0 60px 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 48px;
    text-align: center;
  }
`;

const TextEditorLayout = styled.div`
  width: 60%;
  margin: auto;
`;

const SubmitBtn = styled.button`
  border: 2px solid #000000;
  border-radius: 50px;
  color: #000000;
  background-color: #ffffff;
  width: 105px;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  padding: 5px 0;
  margin-top: 60px;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #000000;
    transition: all 0.3s;
  }
`;

const editorModules = {
  toolbar: [
    ["bold", "italic", "link"],
    [{ header: "1" }, { header: "2" }, { list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code", "code-block", "image"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export default function TextEditor() {
  const quill = useRef(null);

  const handleChange = (event) => {
    console.log(quill.current.getEditor().getText());
    console.log(event);
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
      </StoryInformation>

      <StoryContent>
        <h1>Your story content</h1>
        <TextEditorLayout>
          <ReactQuill
            ref={quill}
            theme="bubble"
            onChange={handleChange}
            value=""
            modules={editorModules}
            placeholder="Tell your story..."
          />
        </TextEditorLayout>
        <div className="d-flex justify-content-center">
          <SubmitBtn>Submit</SubmitBtn>
        </div>
      </StoryContent>
    </Layout>
  );
}
