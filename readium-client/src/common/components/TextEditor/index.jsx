import React from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";

const Layout = styled.div`
  margin-top: 80px;
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
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

export default function TextEditor() {
  return (
    <Layout>
      <ReactQuill
        theme="bubble"
        // onChange={this.handleChange}
        value=""
        modules={editorModules}
        formats={editorFormats}
        placeholder="Son Dep Trai"
      />
    </Layout>
  );
}
