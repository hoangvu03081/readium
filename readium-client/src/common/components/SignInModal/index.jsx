import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { modalClosed } from "../../../slices/sign-in-slice";
import ModalContent from "./ModalContent";

const StyledSignInModal = styled.div`
  width: 400px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  z-index: 9999;
  box-shadow: 1px 1px 14px 8px rgba(51, 51, 51, 0.13);
  -webkit-box-shadow: 1px 1px 14px 8px rgba(51, 51, 51, 0.13);
  -moz-box-shadow: 1px 1px 14px 8px rgba(51, 51, 51, 0.13);

  @media only screen and (max-width: 600px) {
    width: 300px;
  }
`;

const DimOverlay = styled.div`
  background-color: grey;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 999;
  overflow: hidden;
`;

export default function SignInModal() {
  const isModalOpened = useSelector((state) => state.signInModal);
  const dispatch = useDispatch();
  if (isModalOpened)
    return (
      <>
        <StyledSignInModal>
          <ModalContent />
        </StyledSignInModal>
        <DimOverlay onClick={() => dispatch(modalClosed())} />
      </>
    );
  return null;
}
