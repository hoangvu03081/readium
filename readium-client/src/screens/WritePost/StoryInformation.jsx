/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { useDropzone } from "react-dropzone";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";

const Layout = styled.div`
  text-align: center;
  margin-bottom: 100px;
  h1 {
    margin: 0 0 60px 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 48px;
  }
  h2 {
    margin: 0 0 15px 0;
    padding: 0;
    font-family: "PT Sans";
    font-weight: bold;
    font-size: 24px;
  }
  h3,
  h4 {
    margin: 60px 0 15px 0;
    padding: 0;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
  }
`;
const InputTitle = styled.div`
  textarea {
    border: none;
    border-bottom: 1px solid #c8c8c8;
    width: 460px;
    font-family: "Raleway";
    font-weight: bold;
    font-size: 24px;
    resize: none;
    &:focus {
      outline: none;
      border-bottom: 2px solid #000000;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    ::-webkit-input-placeholder {
      text-align: center;
      font-family: "Raleway";
      font-weight: 500;
      font-size: 14px;
      padding-top: 9px;
    }
    :-moz-placeholder {
      text-align: center;
      font-family: "Raleway";
      font-weight: 500;
      font-size: 14px;
      padding-top: 9px;
    }
    ::-moz-placeholder {
      text-align: center;
      font-family: "Raleway";
      font-weight: 500;
      font-size: 14px;
      padding-top: 9px;
    }
    :-ms-input-placeholder {
      text-align: center;
      font-family: "Raleway";
      font-weight: 500;
      font-size: 14px;
      padding-top: 9px;
    }
    @media (max-width: 530px) {
      width: 90%;
    }
  }
`;
const InputDescriptionTags = styled.div`
  textarea {
    border: none;
    border-bottom: 1px solid #c8c8c8;
    width: 460px;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
    resize: none;
    &:focus {
      outline: none;
      border-bottom: 2px solid #000000;
    }
    &::-webkit-scrollbar {
      display: none;
    }
    ::-webkit-input-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    :-moz-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    ::-moz-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    :-ms-input-placeholder {
      text-align: center;
      font-family: "PT Sans";
      font-weight: 500;
      font-size: 14px;
      padding-top: 3px;
    }
    @media (max-width: 530px) {
      width: 90%;
    }
  }
`;
const UploadImage = styled.div`
  margin: auto;
  height: 250px;
  width: 500px;
  border: 1px solid #cbcbcb;
  border-radius: 4px;
  background-color: #fafafa;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.25s;
  div {
    display: ${(props) => (props.backgroundImage === "" ? "block" : "none")};
  }
  svg {
    font-size: 60px;
    margin-bottom: 5px;
  }
  p {
    margin: 0;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
    color: #ababab;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid #a3a3a3;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    transition: all 0.25s;
  }
  @media (max-width: 530px) {
    width: 90%;
  }
`;

export default function StoryInformation() {
  const [imgSrc, setImgSrc] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    // send to server
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        const arr = new Uint8Array(binaryStr);
        const blob = new Blob([arr.buffer], { type: "image/png" });
        setImgSrc(window.URL.createObjectURL(blob));
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Layout>
      <h1>Your story information</h1>

      <h2>Your title</h2>
      <InputTitle>
        <TextareaAutosize
          placeholder="Maximum 100 characters"
          minRows={1}
          maxRows={10}
          required
        />
      </InputTitle>

      <h3>Your description</h3>
      <InputDescriptionTags>
        <TextareaAutosize placeholder="Optional" minRows={1} maxRows={25} />
      </InputDescriptionTags>

      <h3>Your tags</h3>
      <InputDescriptionTags>
        <TextareaAutosize placeholder="Optional" minRows={1} maxRows={25} />
      </InputDescriptionTags>

      <h4>Your cover image</h4>
      <UploadImage backgroundImage={imgSrc} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop a file here ...</p>
        ) : (
          <div>
            <UploadIcon />
            <p>Choose a file or drag it here</p>
          </div>
        )}
      </UploadImage>
    </Layout>
  );
}
