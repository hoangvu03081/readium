import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const Layout = styled.div`
  margin-top: 80px;
  padding-top: 80px;
`;

const StoryInformation = styled.div`
  text-align: center;
  h1 {
    margin: 0 0 80px 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 48px;
  }
  h2 {
    margin: 0 0 10px 0;
    padding: 0;
    font-family: "PT Sans";
    font-weight: bold;
    font-size: 24px;
  }
  h3,
  h4 {
    margin: 80px 0 0 0;
    padding: 0;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
  }
`;

const InputTitle = styled.textarea`
  border: none;
  border-bottom: 1px solid black;
  width: 35%;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 24px;
  &:focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    text-align: center;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 12px;
    padding-top: 9px;
  }
  :-moz-placeholder {
    text-align: center;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 12px;
    padding-top: 9px;
  }
  ::-moz-placeholder {
    text-align: center;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 12px;
    padding-top: 9px;
  }
  :-ms-input-placeholder {
    text-align: center;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 12px;
    padding-top: 9px;
  }
`;

const InputDescription = styled.input`
  border: none;
  border-bottom: 1px solid black;
  width: 35%;
  ::-webkit-input-placeholder {
    text-align: center;
  }
  :-moz-placeholder {
    text-align: center;
  }
  ::-moz-placeholder {
    text-align: center;
  }
  :-ms-input-placeholder {
    text-align: center;
  }
`;

const editorModules = {
  toolbar: [
    ["bold", "italic"],
    [{ header: "1" }, { header: "2" }, "blockquote"],
    ["link", "image", "video"],
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
        <TextareaAutosize
          placeholder="Should be between 12 and 50 characters"
          minRows={1}
          maxRows={3}
        />
        <h3>Your description</h3>
        <InputDescription placeholder="Should be between 12 and 50 characters" />
        <h4>Your cover image</h4>
      </StoryInformation>
    </Layout>
  );
}

// const Layout = styled.div`
//   margin-top: 150px;
//   width: 60%;
//   margin-left: auto;
//   margin-right: auto;
//   @media (max-width: 1000px) {
//     width: 70%;
//   }
// `;

// const InputTitle = styled.input`
//   border: 2px solid #bebebe;
//   border-radius: 5px;
//   width: 100%;
//   padding: 12px 15px;
//   &:focus {
//     outline: none;
//   }
//   ::-webkit-input-placeholder {
//     font-style: italic;
//   }
//   :-moz-placeholder {
//     font-style: italic;
//   }
//   ::-moz-placeholder {
//     font-style: italic;
//   }
//   :-ms-input-placeholder {
//     font-style: italic;
//   }
// `;

// const TextEditorLayout = styled.div`
//   border-radius: 5px;
//   margin-top: 50px;
// `;

// const PostBtn = styled.button`
//   border: none;
//   border-radius: 50px;
//   color: white;
//   background-color: black;
//   font-family: "PT Sans";
//   font-weight: bold;
//   font-size: 16px;
//   padding: 4px 20px;
//   margin-top: 20px;
//   float: right;
//   transition: all 0.25s;
//   &:hover {
//     cursor: pointer;
//     opacity: 0.8;
//     transition: all 0.25s;
//   }
// `;

// <Layout>
//   <InputTitle placeholder="Title" />
//   <TextEditorLayout>
//     <ReactQuill
//       ref={quill}
//       theme="snow"
//       onChange={handleChange}
//       value=""
//       modules={editorModules}
//       placeholder="Tell your story..."
//     />
//   </TextEditorLayout>
//   <PostBtn>POST</PostBtn>
// </Layout>
