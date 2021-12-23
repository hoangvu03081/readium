import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const Layout = styled.div`
  .ql-editor {
    padding: 0;
  }
  margin-bottom: 10px;
`;

export default function PostContent({ quillContent }) {
  const quill = useRef(null);
  const delta = JSON.parse(quillContent);

  useEffect(() => {
    quill.current.getEditor().setContents(delta);
  }, [delta]);

  return (
    <Layout>
      <ReactQuill ref={quill} theme="bubble" readOnly />
    </Layout>
  );
}

PostContent.propTypes = {
  quillContent: PropTypes.string.isRequired,
};
