import React from "react";
import PropTypes from "prop-types";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import {
  Logo,
  SignInOptionButton,
  LeadingIcon,
  BoldText,
  ClickableText,
  LoginText,
} from "./styles";
import ModalType from "./ModalType";
import { useAuth } from "../../hooks/useAuth";

export default function SignInOptions({ setModalType }) {
  const { signInWithGoogle, signInWithFacebook } = useAuth();
  const handleChangeModaltype = (modalType) => setModalType(modalType);

  return (
    <>
      <Logo to="/">readium</Logo>
      <LoginText className="mb-5">Log In</LoginText>
      <SignInOptionButton
        className="mb-3"
        onClick={() => handleChangeModaltype(ModalType.EMAIL_SIGN_IN)}
      >
        <LeadingIcon>
          <MdOutlineEmail size={22} />
        </LeadingIcon>
        <span>Sign in with email</span>
      </SignInOptionButton>
      <SignInOptionButton className="mb-3" onClick={signInWithFacebook}>
        <LeadingIcon>
          <BsFacebook size={22} />
        </LeadingIcon>
        <span>Sign in with Facebook</span>
      </SignInOptionButton>
      <SignInOptionButton className="mb-4" onClick={signInWithGoogle}>
        <LeadingIcon>
          <FcGoogle size={22} />
        </LeadingIcon>
        <span>Sign in with Google</span>
      </SignInOptionButton>
      <BoldText>Don&apos;t have an account yet?</BoldText>
      <ClickableText onClick={() => handleChangeModaltype(ModalType.SIGN_UP)}>
        Sign up now!
      </ClickableText>
    </>
  );
}

SignInOptions.propTypes = {
  setModalType: PropTypes.func.isRequired,
};
