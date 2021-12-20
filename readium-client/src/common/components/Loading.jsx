import React from "react";
import styled from "styled-components";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  return (
    <LoadingPage>
      <PuffLoader />
    </LoadingPage>
  );
}
