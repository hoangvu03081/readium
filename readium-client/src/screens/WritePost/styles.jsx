import styled from "styled-components";

export const Layout = styled.div`
  margin-top: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
`;

export const SubmitBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitBtn = styled.button`
  border: 2px solid #000000;
  border-radius: 50px;
  color: #000000;
  background-color: #ffffff;
  width: 111px;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  padding: 5px 0;
  margin-top: 40px;
  transition: all 0.35s;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #000000;
    transition: all 0.35s;
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: #00000020;
  display: flex;
  align-items: center;
  justify-content: center;
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;
