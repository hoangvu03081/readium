import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { AiOutlineBell } from "react-icons/ai";
import { RiSettings3Line } from "react-icons/ri";
import { FiEdit, FiBookmark } from "react-icons/fi";
import Avatar from "./Avatar";
import { modalOpened } from "../../../slices/sign-in-slice";
import { IconLink, Logo, SearchInput, SignInButton } from "./styles";

const Nav = styled.nav`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid black;
`;

export default function DesktopHeader({ isLogin }) {
  const dispatch = useDispatch();
  const handleOpenModal = () => dispatch(modalOpened());

  return (
    <Nav>
      <Logo to="/">readium</Logo>
      {!isLogin ? (
        <SignInButton className="ms-sm-4" onClick={handleOpenModal}>
          Sign in
        </SignInButton>
      ) : (
        <>
          <IconLink to="/notifications" className="ms-sm-4">
            <AiOutlineBell size={26} />
          </IconLink>
          <IconLink to="/saved" className="ms-sm-4 me-sm-4">
            <FiBookmark size={24} />
          </IconLink>
          <Avatar />
        </>
      )}
      <SearchInput type="text" placeholder="Search" className="ms-sm-4" />
      <IconLink to="/write" className="ms-sm-4">
        <FiEdit size={26} />
      </IconLink>
      <IconLink to="/settings" className="ms-sm-4">
        <RiSettings3Line size={28} />
      </IconLink>
    </Nav>
  );
}

DesktopHeader.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};
