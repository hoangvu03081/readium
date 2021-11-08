import React from "react";
import PropTypes from "prop-types";
import {
  Logo,
  InputText,
  Input,
  LoginButton,
  AllSignInOptions,
  ForgotPassword,
  LoginText,
} from "./styles";
import ModalType from "./ModalType";

export default function EmailLogin({ setModalType }) {
  const handleChangeModalType = () => setModalType(ModalType.SIGN_IN_OPTIONS);

  return (
    <>
      <Logo>readium</Logo>
      <LoginText className="mb-3">Log In</LoginText>
      <InputText>Email</InputText>
      <Input placeholder="Email" className="mb-3" />
      <InputText>Password</InputText>
      <Input placeholder="Password" type="password" />
      <LoginButton className="mt-4">Log In</LoginButton>
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
