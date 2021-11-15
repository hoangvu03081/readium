import React, { useState } from "react";
import styled from "styled-components";
import EmailLogin from "./EmailLogin";
import ModalType from "./ModalType";
import SignInOptions from "./SignInOptions";
import SignUp from "./SignUp";

const ContentFlow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function ModalContent() {
  const [modalType, setModalType] = useState(ModalType.SIGN_IN_OPTIONS);
  return (
    <ContentFlow>
      {modalType === ModalType.EMAIL_SIGN_IN && (
        <EmailLogin setModalType={setModalType} />
      )}
      {modalType === ModalType.SIGN_IN_OPTIONS && (
        <SignInOptions setModalType={setModalType} />
      )}
      {modalType === ModalType.SIGN_UP && (
        <SignUp setModalType={setModalType} />
      )}
    </ContentFlow>
  );
}
