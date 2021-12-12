import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import Delta from "quill-delta";
import debounce from "lodash.debounce";
import { ReactComponent as AddImage } from "../../assets/icons/add_image.svg";

const icons = ReactQuill.Quill.import("ui/icons");
icons.code = '<i class="ionicons ion-code"></i>';

const Layout = styled.div`
  > h1 {
    margin: 0 0 40px 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 48px;
    text-align: center;
    @media (max-width: 520px) {
      font-size: 40px;
    }
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

export default function StoryContent({ id }) {
  const quill = useRef(null);
  let currentDelta = new Delta();

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

  const addImage = () => {
    document.getElementsByClassName("ql-image")[0].click();
  };

  const sendDraftContent = async (editor) => {
    const newDelta = currentDelta.diff(editor.getContents());
    currentDelta = editor.getContents();
    console.log(newDelta);
    axios.patch(`http://localhost:5000/drafts/${id}/diff`, {
      diff: JSON.stringify(newDelta),
    });
  };

  const debounceSendDraftContent = useCallback(
    debounce((editor) => sendDraftContent(editor), 2000),
    [id]
  );

  const handleChange = (content, delta, source, editor) => {
    debounceSendDraftContent(editor);
  };

  return (
    <Layout>
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
    </Layout>
  );
}

StoryContent.propTypes = {
  id: PropTypes.string.isRequired,
};
