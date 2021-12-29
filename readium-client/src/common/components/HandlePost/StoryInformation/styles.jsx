import styled from "styled-components";

export const Layout = styled.div`
  text-align: center;
  margin-bottom: 100px;
  h1 {
    margin: 0 0 60px 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 48px;
    @media (max-width: 520px) {
      font-size: 40px;
    }
  }
  h2 {
    margin: 0 0 15px 0;
    padding: 0;
    font-family: "PT Sans";
    font-weight: bold;
    font-size: 24px;
  }
  h3 {
    margin: 60px 0 15px 0;
    padding: 0;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 18px;
  }
`;

export const InputTitle = styled.div`
  textarea {
    border: none;
    border-bottom: 1px solid #c8c8c8;
    width: 460px;
    font-family: "Raleway";
    font-weight: bold;
    font-size: 36px;
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
      line-height: 47px;
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

export const InputDescription = styled.div`
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

export const InputTags = styled.div`
  position: relative;
  & .ReactTags__selected {
    width: 460px;
    margin-top: 15px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    @media (max-width: 530px) {
      width: 90%;
    }
  }
  span {
    padding: 5px 10px;
    border-radius: 41px;
    font-family: "PT Sans";
    font-weight: bold;
    color: ${({ theme }) => theme.colors.TagBtnText};
    background-color: ${({ theme }) => theme.colors.TagBtnBackground};
    transition: all 0.25s;
    > button {
      padding: 0;
      margin-left: 6px;
      color: ${({ theme }) => theme.colors.TagBtnText};
      background-color: ${({ theme }) => theme.colors.TagBtnBackground};
      border: none;
      cursor: pointer;
      transition: all 0.25s;
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.TagBtnHover};
      transition: all 0.25s;
      > button {
        background-color: ${({ theme }) => theme.colors.TagBtnHover};
        transition: all 0.25s;
      }
    }
  }
  input {
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
  svg {
    z-index: 9;
    margin-top: 4px;
    margin-right: -25px;
    font-size: 20px;
    transition: all 0.25s;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
      transition: all 0.25s;
    }
    @media (max-width: 550px) {
      margin-top: 5px;
      margin-right: -21px;
      font-size: 18px;
    }
  }
`;

export const AddTagsBtn = styled.div`
  width: 460px;
  height: 1px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 530px) {
    width: 90%;
  }
`;

export const UploadImage = styled.div`
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
  margin-bottom: 5px;
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

export const Note = styled.p`
  i {
    margin-right: 5px;
  }
  margin: 0;
  color: red;
`;
