import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useUploadAvatar } from "../../../common/api/profileQuery";
import { Avatar } from "./style";

const ClickableAvatar = styled.label`
  cursor: pointer;
  z-index: 2;

  #upload-photo {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  .overlay {
    position: absolute;
    width: 136px;
    height: 136px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: calc(33vh - 68px);
    text-align: center;
    border-radius: 50%;
    border: 2px solid white;
    z-index: 3;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    opacity: 0;
    transition: opacity 0.1s;
  }

  .overlay:hover {
    opacity: 0.3;
  }
`;

export default function MyAvatar({ src, userId }) {
  const fileRef = useRef();
  const uploadAvatar = useUploadAvatar(userId);
  const handleAddImage = (e) => {
    e.preventDefault();
    uploadAvatar.mutate(fileRef.current.files[0]);
  };
  return (
    <ClickableAvatar htmlFor="upload-photo">
      <Avatar src={src} />
      <input
        type="file"
        ref={fileRef}
        id="upload-photo"
        accept=".jpg,.jpeg,.png,.webp,.avif,.tiff,.gif,.svg"
        onChange={handleAddImage}
      />
      <div className="overlay" />
    </ClickableAvatar>
  );
}

MyAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
