import React from "react";
import styled from "styled-components";
import { Logo } from "./LogoPage";

const LoadingLayout = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default function LoadingOverlay() {
  return (
    <LoadingLayout>
      <Logo />
    </LoadingLayout>
  );
}
