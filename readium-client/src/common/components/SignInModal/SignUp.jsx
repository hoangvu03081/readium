import React from "react";
import PropTypes from "prop-types";
import {
  Logo,
  InputText,
  Input,
  LoginButton,
  AllSignInOptions,
} from "./styles";
import ModalType from "./ModalType";

export default function SignUp({ setModalType }) {
  const handleChangeModalType = () => setModalType(ModalType.SIGN_IN_OPTIONS);

  return (
    <>
      <Logo>readium</Logo>
      <h2>Log in</h2>
      <InputText>Email</InputText>
      <Input placeholder="Email" className="mb-3" />
      <InputText>Password</InputText>
      <Input placeholder="Password" type="password" className="mb-3" />
      <InputText>Confirm password</InputText>
      <Input placeholder="Password" type="password" />
      <LoginButton className="mt-4">Sign up</LoginButton>
      <AllSignInOptions className="mt-3" onClick={handleChangeModalType}>
        All sign in options
      </AllSignInOptions>
    </>
  );
}

SignUp.propTypes = {
  setModalType: PropTypes.func.isRequired,
};
