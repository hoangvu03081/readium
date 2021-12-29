/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import ReactQuill from "react-quill";
import {
  useNewContentDraft,
  useContentDraft,
} from "../../../common/api/draftQuery";
import { ReactComponent as AddImage } from "../../../assets/icons/add_image.svg";
import { Layout, TextEditor, Buttons } from "./styles";
import "react-quill/dist/quill.bubble.css";

const icons = ReactQuill.Quill.import("ui/icons");
icons.code = '<i class="ionicons ion-code"></i>';

const StoryContent = React.forwardRef(({ id }, ref) => {
  let contentSaved = true;
  ref.current[0] = contentSaved;

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

  const contentDraft = useContentDraft(id);

  const debounceSendContentDraft = useCallback(
    debounce((editor) => {
      contentSaved = true;
      ref.current[0] = contentSaved;
      contentDraft.mutate(editor);
    }, 2000),
    [id]
  );

  const handleContentChange = (content, delta, source, editor) => {
    contentSaved = false;
    ref.current[0] = contentSaved;
    debounceSendContentDraft(editor);
  };

  const addImage = () => {
    document.getElementsByClassName("ql-image")[0].click();
  };

  useEffect(() => {
    useNewContentDraft();
  }, []);

  return (
    <Layout>
      <h1>Your story content</h1>
      <TextEditor>
        <ReactQuill
          theme="bubble"
          modules={editorModules}
          onChange={handleContentChange}
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
});

export default StoryContent;

StoryContent.propTypes = {
  id: PropTypes.string.isRequired,
};