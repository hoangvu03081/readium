import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import DimOverlay from "../DimOverlay";
import { modalClosed } from "../../../slices/sign-in-slice";
import ModalContent from "./ModalContent";

const StyledSignInModal = styled.div`
  width: 400px;
  height: 500px;
  position: fixed;
  top: 50vh;
  left: 50vw;
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

export default function SignInModal() {
  const isModalOpened = useSelector((state) => state.signInModal);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isModalOpened) disablePageScroll();
    if (!isModalOpened) enablePageScroll();
  }, [isModalOpened]);
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
