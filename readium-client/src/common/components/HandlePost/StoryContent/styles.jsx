import styled from "styled-components";

export const Layout = styled.div`
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

export const TextEditor = styled.div`
  width: 68%;
  margin: auto;
  position: relative;
  .ql-editor {
    min-height: 350px;
    font-family: "PT Sans";
    font-weight: 500;
    font-size: 21px;
    @media (max-width: 509px) {
      font-size: 18px;
    }
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

export const Buttons = styled.div`
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
