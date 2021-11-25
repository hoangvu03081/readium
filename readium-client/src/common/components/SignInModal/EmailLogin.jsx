import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Logo,
  InputText,
  Input,
  LoginButton,
  AllSignInOptions,
  ForgotPassword,
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
  const handleChangeModalType = () => setModalType(ModalType.SIGN_IN_OPTIONS);
  const { isLoading, signIn } = useAuth();

  const [emailInput, handleEmailInput] = useInput("");
  const [passwordInput, handlePasswordInput] = useInput("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setEmailError(validateEmail(emailInput));
    setPasswordError(validatePassword(passwordInput));
  }, [emailInput, passwordInput]);

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
      />
      <LoginButton
        className="mt-4"
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
      </LoginButton>
      <ForgotPassword className="mt-4">Forgot password</ForgotPassword>
      <AllSignInOptions className="mt-2" onClick={handleChangeModalType}>
        All sign in options
      </AllSignInOptions>
    </>
  );
}

EmailLogin.propTypes = {
  setModalType: PropTypes.func.isRequired,
};
