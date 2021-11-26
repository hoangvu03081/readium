import React from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";

const Layout = styled.div`
  margin-top: 150px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1000px) {
    width: 70%;
  }
`;

const InputTitle = styled.input`
  border: 2px solid #bebebe;
  border-radius: 5px;
  width: 100%;
  padding: 12px 15px;
  &:focus {
    outline: none;
  }
`;

const TextEditorLayout = styled.div`
  border: 1px solid #bebebe;
  border-radius: 5px;
  margin-top: 50px;
`;

const PostBtn = styled.button`
  border: none;
  border-radius: 50px;
  color: white;
  background-color: black;
  font-family: "PT Sans";
  font-weight: bold;
  font-size: 16px;
  padding: 4px 20px;
  margin-top: 20px;
  float: right;
  transition: all 0.25s;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.25s;
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
  const handleChange = (event) => {
    console.log(event);
  };
  return (
    <Layout>
      <InputTitle placeholder="Title" />
      <TextEditorLayout>
        <ReactQuill
          theme="snow"
          onChange={handleChange}
          value=""
          modules={editorModules}
          placeholder="Tell your story..."
        />
      </TextEditorLayout>
      <PostBtn>POST</PostBtn>
    </Layout>
  );
}
