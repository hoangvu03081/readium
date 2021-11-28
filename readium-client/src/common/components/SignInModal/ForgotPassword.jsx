import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineMail } from "react-icons/ai";
import { useAuth } from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import { InputText, ErrorText, Input, SubmitButton } from "./styles";
import { validateEmail } from "./validation";

const ReturnButton = styled.button`
  position: absolute;
`;

function isSubmittable(email, emailError) {
  return email !== "" && emailError === "";
}

export default function ForgotPassword({ setModalType }) {
  const { forgotPassword, hasData, isError, isLoading, clearState } = useAuth();
  const [emailInput, handleEmailInput] = useInput("");
  const [emailError, setEmailError] = useState("");

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

  return (
    <>
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
