import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { PuffLoader } from "react-spinners";
import { useAuth } from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import { InputText, ErrorText, Input, SubmitButton } from "./styles";
import { validateEmail } from "./validation";
import ModalType from "./ModalType";

const ReturnButton = styled.div`
  position: absolute;
  left: 11px;
  top: 19px;
  cursor: pointer;
`;

function isSubmittable(email, emailError) {
  return email !== "" && emailError === "";
}

export default function ForgotPassword({ setModalType }) {
  const { forgotPassword, hasData, isError, isLoading, clearState } = useAuth();
  const [emailInput, handleEmailInput] = useInput("");
  const [emailError, setEmailError] = useState("");

  const enterPressed = (e) => {
    if (e?.key === "Enter" && isSubmittable(emailInput, emailError)) {
      forgotPassword(emailInput);
    }
  };

  const handleReturn = () => {
    setModalType(ModalType.EMAIL_SIGN_IN);
  };

  useEffect(() => {
    setEmailError(validateEmail(emailInput));
  }, [emailInput]);
  useEffect(() => () => clearState(), []);

  if (hasData || isError)
    return (
      <>
        <AiOutlineMail size={100} />
        <h3 className="p-4 m-0">
          A password reset instruction will be sent to your email if your
          account is presented in our system
        </h3>
      </>
    );

  if (isLoading) return <PuffLoader />;

  return (
    <>
      <ReturnButton onClick={handleReturn}>
        <IoIosArrowBack size={30} />
      </ReturnButton>
      <h3>Please input your email</h3>
      <InputText className="mt-3">
        <span>Email</span>
        <ErrorText className="ms-auto">{emailError}</ErrorText>
      </InputText>
      <Input
        value={emailInput}
        onChange={handleEmailInput}
        placeholder="Email"
        className="mb-3"
        onKeyPress={enterPressed}
      />
      <SubmitButton
        className="mt-1"
        disabled={!isSubmittable(emailInput, emailError) || isLoading}
        onClick={() => forgotPassword(emailInput)}
      >
        Submit
      </SubmitButton>
    </>
  );
}

ForgotPassword.propTypes = {
  setModalType: PropTypes.func.isRequired,
};
