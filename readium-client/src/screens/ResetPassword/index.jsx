import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PuffLoader from "react-spinners/PuffLoader";
import { Link } from "react-router-dom";
import LogoPage from "../../common/components/LogoPage";
import useRouter from "../../common/hooks/useRouter";
import {
  InputText,
  Input,
  SubmitButton,
  ErrorText,
} from "../../common/components/SignInModal/styles";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../common/components/SignInModal/validation";
import { useAuth } from "../../common/hooks/useAuth";
import useInput from "../../common/hooks/useInput";

const FitInputText = styled(InputText)`
  width: 90%;
  max-width: 500px;
  padding: 0;
`;

const FitInput = styled(Input)`
  max-width: 500px;
`;
const FitSubmitButton = styled(SubmitButton)`
  max-width: 500px;
`;

function isSubmittable(
  password,
  confirmPassword,
  passwordError,
  confirmPasswordError
) {
  return (
    password !== "" &&
    confirmPassword !== "" &&
    passwordError === "" &&
    confirmPasswordError === ""
  );
}

export default function ResetPassword() {
  const [passwordInput, handlePasswordInput] = useInput("");
  const [confirmPasswordInput, handleConfirmPasswordInput] = useInput("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { query } = useRouter();
  const { resetPassword, isLoading, error, hasData, clearState } = useAuth();

  useEffect(() => {
    setPasswordError(validatePassword(passwordInput));
    setConfirmPasswordError(
      validateConfirmPassword(passwordInput, confirmPasswordInput)
    );
  }, [passwordInput, confirmPasswordInput]);

  useEffect(() => () => clearState());

  if (isLoading)
    return (
      <LogoPage>
        <PuffLoader />
      </LogoPage>
    );

  if (hasData)
    return (
      <LogoPage>
        <h2>Your account has been successfully activated</h2>
        <div>
          <Link to="/">Click here to go back to homepage</Link>
        </div>
      </LogoPage>
    );

  return (
    <LogoPage>
      <FitInputText>
        <span>New password</span>
        <ErrorText className="ms-auto">{passwordError}</ErrorText>
      </FitInputText>
      <FitInput
        placeholder="At least 6 characters"
        className="mt-2"
        onChange={handlePasswordInput}
        value={passwordInput}
        type="password"
      />
      <FitInputText className="mt-4">
        <span>Confirm password</span>
        <ErrorText className="ms-auto">{confirmPasswordError}</ErrorText>
      </FitInputText>
      <FitInput
        placeholder="Retype your password"
        className="mt-2"
        onChange={handleConfirmPasswordInput}
        value={confirmPasswordInput}
        type="password"
      />
      <FitSubmitButton
        className="mt-4"
        disabled={
          !isSubmittable(
            passwordInput,
            confirmPasswordInput,
            passwordError,
            confirmPasswordError
          ) || isLoading
        }
        onClick={() => resetPassword(passwordInput, query.iv, query.id)}
      >
        Submit
      </FitSubmitButton>
      <ErrorText className="mt-3">{error}</ErrorText>
    </LogoPage>
  );
}
