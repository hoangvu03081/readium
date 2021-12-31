import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  .spinner {
    width: 44px;
    height: 44px;
    margin: 100px auto;
    background-color: none;
    border: 3px solid #000000;
    border-radius: 100%;
    -webkit-animation: scaleout 1.8s infinite ease-in-out;
    animation: scaleout 1.8s infinite ease-in-out;
  }

  @-webkit-keyframes scaleout {
    0% {
      -webkit-transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0;
    }
  }

  @keyframes scaleout {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

export default function PuffLoader() {
  return (
    <Layout>
      <div className="spinner" />
    </Layout>
  );
}
