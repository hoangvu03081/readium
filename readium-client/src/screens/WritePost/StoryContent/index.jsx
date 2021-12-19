import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import ReactQuill from "react-quill";
import { useContentDraft } from "../../../common/api/draftQuery";
import { ReactComponent as AddImage } from "../../../assets/icons/add_image.svg";
import { Layout, TextEditor, Buttons } from "./styles";
import "react-quill/dist/quill.bubble.css";

const icons = ReactQuill.Quill.import("ui/icons");
icons.code = '<i class="ionicons ion-code"></i>';

export default function StoryContent({ id }) {
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

  const resContentDraft = useContentDraft(id);

  const debounceSendContentDraft = useCallback(
    debounce((editor) => resContentDraft.mutate(editor), 3000),
    [id]
  );

  const handleChange = (content, delta, source, editor) => {
    debounceSendContentDraft(editor);
  };

  const addImage = () => {
    document.getElementsByClassName("ql-image")[0].click();
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
