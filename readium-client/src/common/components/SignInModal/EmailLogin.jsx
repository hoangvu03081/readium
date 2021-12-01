import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PuffLoader from "react-spinners/PuffLoader";
import {
  Logo,
  InputText,
  Input,
  SubmitButton,
  AllSignInOptions,
  ForgotPasswordText,
  LoginText,
  ErrorText,
} from "./styles";
import ModalType from "./ModalType";
import { useAuth } from "../../hooks/useAuth";
import { validateEmail, validatePassword } from "./validation";
import useInput from "../../hooks/useInput";

function isSubmittable(email, password, emailError, passwordError) {
  return (
    email !== "" && password !== "" && emailError === "" && passwordError === ""
  );
}
export default function EmailLogin({ setModalType }) {
  const toSignInOptions = () => setModalType(ModalType.SIGN_IN_OPTIONS);
  const toForgotPassword = () => setModalType(ModalType.FORGOT_PASSWORD);
  const { isLoading, signIn, clearState, error } = useAuth();

  const [emailInput, handleEmailInput] = useInput("");
  const [passwordInput, handlePasswordInput] = useInput("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setEmailError(validateEmail(emailInput));
    setPasswordError(validatePassword(passwordInput));
  }, [emailInput, passwordInput]);
  useEffect(() => () => clearState(), []);

  if (isLoading) return <PuffLoader />;

  return (
    <>
      <Logo>readium</Logo>
      <LoginText className="mb-3">Log In</LoginText>
      <InputText>
        <span>Email</span>
        <ErrorText className="ms-auto">{emailError}</ErrorText>
      </InputText>
      <Input
        value={emailInput}
        onChange={handleEmailInput}
        placeholder="Email"
        className="mb-3"
      />
      <InputText>
        <span>Password</span>
        <ErrorText className="ms-auto">{passwordError}</ErrorText>
      </InputText>
      <Input
        placeholder="Password"
        type="password"
        value={passwordInput}
        onChange={handlePasswordInput}
        className="mb-2"
      />
      <ErrorText className="mb-2">{error}</ErrorText>
      <SubmitButton
        onClick={() => signIn(emailInput, passwordInput)}
        disabled={
          !isSubmittable(
            emailInput,
            passwordInput,
            emailError,
            passwordError
          ) || isLoading
        }
      >
        Log In
      </SubmitButton>
      <ForgotPasswordText className="mt-4" onClick={toForgotPassword}>
        Forgot password
      </ForgotPasswordText>
      <AllSignInOptions className="mt-2" onClick={toSignInOptions}>
        All sign in options
      </AllSignInOptions>
    </>
  );
}

EmailLogin.propTypes = {
  setModalType: PropTypes.func.isRequired,
};
