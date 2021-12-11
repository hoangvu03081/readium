import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useUploadCoverImage } from "../../../common/api/profileQuery";
import { CoverImage } from "./style";

const ClickableCoverImage = styled.label`
  cursor: pointer;

  #upload-photo {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  .overlay {
    position: absolute;
    width: 100vw;
    height: 33vh;
    max-height: 640px;
    min-height: 176px;
    top: 0;
    z-index: 1;
    background-color: black;
    opacity: 0;
    transition: opacity 0.1s;
  }

  .overlay:hover {
    opacity: 0.3;
  }
`;

export default function MyCoverImage({ src, userId }) {
  const fileRef = useRef();
  const uploadCoverImage = useUploadCoverImage(userId);
  const handleAddImage = (e) => {
    e.preventDefault();
    uploadCoverImage.mutate(fileRef.current.files[0]);
  };
  return (
    <ClickableCoverImage htmlFor="upload-photo">
      <CoverImage src={src} />
      <input
        type="file"
        ref={fileRef}
        id="upload-photo"
        accept=".jpg,.jpeg,.png,.webp,.avif,.tiff,.gif,.svg"
        onChange={handleAddImage}
      />
      <div className="overlay" />
    </ClickableCoverImage>
  );
}

MyCoverImage.propTypes = {
  src: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

MyCoverImage.defaultProps = {
  src: null,
};
