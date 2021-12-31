import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const Layout = styled.div`
  .ql-editor {
    padding: 0;
    font-size: 21px;
    .image-center {
      display: block;
      margin: 0 auto;
    }
    @media (max-width: 509px) {
      font-size: 18px;
    }
  }
  margin-bottom: 30px;
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
