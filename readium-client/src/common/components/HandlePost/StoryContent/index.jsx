/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import ReactQuill, { Quill } from "react-quill";
import ImageCompress from "quill-image-compress";
import {
  useNewContentDraft,
  useContentDraft,
  useFetchContentDraft,
} from "../../../api/draftQuery";
import { ReactComponent as AddImage } from "../../../../assets/icons/add_image.svg";
import { Layout, TextEditor, Buttons } from "./styles";
import "react-quill/dist/quill.bubble.css";

const icons = ReactQuill.Quill.import("ui/icons");
icons.code = '<i class="ionicons ion-code"></i>';
const Image = Quill.import("formats/image");
Image.className = "image-center";
Quill.register("modules/imageCompress", ImageCompress);

const StoryContent = React.forwardRef(({ id, data }, ref) => {
  const quill = useRef(null);
  let contentSaved = true;
  ref.current[0] = contentSaved;

  const editorModules = {
    toolbar: {
      container: [
        ["bold", "italic", "link"],
        [
          { header: "1" },
          { header: "2" },
          { list: "ordered" },
          { list: "bullet" },
        ],
        ["blockquote", "code", "code-block", "image"],
      ],
    },
    clipboard: {
      matchVisual: false, // toggle to add extra line breaks when pasting HTML
    },
    imageCompress: {
      quality: 1,
      maxWidth: 700,
      maxHeight: 700,
      imageType: "image/jpeg",
      // debug: true,
      // suppressErrorLogging: false,
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
    if (data) {
      const delta = JSON.parse(data.textEditorContent);
      useFetchContentDraft(delta);
      quill.current.getEditor().setContents(delta);
    }
  }, []);

  return (
    <Layout>
      <h1>Your story content</h1>
      <TextEditor>
        <ReactQuill
          ref={quill}
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
  data: PropTypes.objectOf(PropTypes.any),
};
StoryContent.defaultProps = {
  data: null,
};
