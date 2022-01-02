import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  &.arrow {
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  &.arrow span {
    display: block;
    width: 16px;
    height: 16px;
    border-bottom: 5px solid black;
    border-right: 5px solid black;
    transform: rotate(45deg);
    margin: -10px;
    animation: animate 1.4s infinite;
  }
  @keyframes animate {
    0% {
      opacity: 0;
      transform: rotate(45deg) translate(-5px, -5px);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: rotate(45deg) translate(5px, 5px);
    }
  }
`;

export default function DownArrow() {
  return (
    <Layout className="arrow">
      <span />
    </Layout>
  );
}
