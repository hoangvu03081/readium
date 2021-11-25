import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Logo,
  InputText,
  Input,
  LoginButton,
  AllSignInOptions,
  ErrorText,
  EmailConfirmation,
} from "./styles";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "./validation";
import ModalType from "./ModalType";
import useInput from "../../hooks/useInput";
import { AiOutlineMail } from "react-icons/ai";
import { useAuth } from "../../hooks/useAuth";

function isSubmittable(
  email,
  password,
  confirmPassword,
  emailError,
  passwordError,
  confirmPasswordError
) {
  return (
    email !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    emailError === "" &&
    passwordError === "" &&
    confirmPasswordError === ""
  );
}

export default function SignUp({ setModalType }) {
  const handleChangeModalType = () => setModalType(ModalType.SIGN_IN_OPTIONS);
  const [emailInput, handleEmailInput] = useInput("");
  const [passwordInput, handlePasswordInput] = useInput("");
  const [confirmPasswordInput, handleConfirmPasswordInput] = useInput("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { signUp, isLoading, isError, error, data, hasData, clearState } =
    useAuth();
  useEffect(() => {
    setEmailError(validateEmail(emailInput));
    setPasswordError(validatePassword(passwordInput));
    setConfirmPasswordError(
      validateConfirmPassword(passwordInput, confirmPasswordInput)
    );
  }, [emailInput, passwordInput, confirmPasswordInput]);
  useEffect(() => () => clearState(), []);

  if (hasData)
    return (
      <>
        <AiOutlineMail size={100} />
        <EmailConfirmation className="mt-2">{data}</EmailConfirmation>
      </>
    );

  return (
    <>
      <Logo>readium</Logo>
      <h2>Sign Up</h2>
      <InputText>
        <span>Email</span>
        <ErrorText className="ms-auto">{emailError}</ErrorText>
      </InputText>
      <Input
        placeholder="Email"
        className="mb-3"
        value={emailInput}
        onChange={handleEmailInput}
      />
      <InputText>
        <span>Password</span>
        <ErrorText className="ms-auto">{passwordError}</ErrorText>
      </InputText>
      <Input
        placeholder="Password"
        type="password"
        className="mb-3"
        value={passwordInput}
        onChange={handlePasswordInput}
      />
      <InputText>
        <span>Confirm password</span>
        <ErrorText className="ms-auto">{confirmPasswordError}</ErrorText>
      </InputText>
      <Input
        placeholder="Password"
        type="password"
        value={confirmPasswordInput}
        onChange={handleConfirmPasswordInput}
        className="mb-2"
      />
      <ErrorText className="mb-2">{error}</ErrorText>
      <LoginButton
        onClick={() => signUp(emailInput, passwordInput)}
        disabled={
          !isSubmittable(
            emailInput,
            passwordInput,
            confirmPasswordInput,
            emailError,
            passwordError,
            confirmPasswordError
          ) || isLoading
        }
      >
        Sign up
      </LoginButton>
      <AllSignInOptions className="mt-3" onClick={handleChangeModalType}>
        All sign in options
      </AllSignInOptions>
    </>
  );
}

SignUp.propTypes = {
  setModalType: PropTypes.func.isRequired,
};
