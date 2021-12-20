import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import Delta from "quill-delta";
import "react-quill/dist/quill.bubble.css";

export default function PostContent({ quillContent }) {
  const quill = useRef(null);
  const delta = new Delta(JSON.parse(quillContent));

  useEffect(() => {
    quill.current.getEditor().setContents(delta);
  }, []);

  return (
    <div>
      <ReactQuill ref={quill} theme="bubble" readOnly />
    </div>
  );
}

PostContent.propTypes = {
  quillContent: PropTypes.string.isRequired,
};
