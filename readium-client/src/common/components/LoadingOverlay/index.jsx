/* eslint-disable react/button-has-type */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Layout = styled.div`
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

const Toast = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-family: "Raleway";
    font-size: 20px;
  }
  button {
    background-color: black;
    color: white;
    font-size: 18px;
    padding: 5px 15px;
    border: none;
    border-radius: 20px;
    transition: all 0.25s;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
      transition: all 0.25s;
    }
  }
`;

export default function LoadingOverlay({ isLoading, text }) {
  const history = useHistory();
  const handleBackToHome = () => {
    history.push("/");
  };
  return (
    <Layout className={isLoading ? "d-flex" : "d-none"}>
      <div className={text ? "" : "lds-ripple"}>
        <div />
        <div />
      </div>
      <Toast className={text ? "d-flex" : "d-none"}>
        <p>{text}</p>
        <button onClick={handleBackToHome}>Back to homepage</button>
      </Toast>
    </Layout>
  );
}

LoadingOverlay.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string,
};
LoadingOverlay.defaultProps = {
  text: "",
};
