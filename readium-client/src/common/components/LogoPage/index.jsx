import React from "react";
import styled from "styled-components";

const ScreenCenter = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  font-size: 40px;
  font-family: "Publica Sans";
`;

// eslint-disable-next-line react/prop-types
export default function LogoPage({ children }) {
  return (
    <ScreenCenter className="container w-100 h-100">
      <Logo>readium</Logo>
      {children}
    </ScreenCenter>
  );
}
