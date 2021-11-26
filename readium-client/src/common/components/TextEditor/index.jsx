import React from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";

const Layout = styled.div`
  margin-top: 150px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const InputTitle = styled.input`
  border: 2px solid #bebebe;
  border-radius: 5px;
  width: 100%;
  padding: 12px 15px;
`;

const TextEditorLayout = styled.div`
  border: 2px solid #bebebe;
  border-radius: 5px;
  margin-top: 50px;
`;

const editorFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const editorModules = {
  toolbar: [
    ["bold", "italic", "link"],
    [{header: "1"}, {header: "2"}, "blockquote"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export default function TextEditor() {
  const handleChange = () => {
    
  }
  return (
    <Layout>
      <InputTitle placeholder="Title" />
      <TextEditorLayout>
        <ReactQuill
          theme="bubble"
          onChange={handleChange}
          value=""
          modules={editorModules}
          formats={editorFormats}
          placeholder="Tell your story..."
        />
      </TextEditorLayout>
    </Layout>
  );
}
