import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { RiSettings3Line, RiNotification4Line } from "react-icons/ri";
import { FiEdit, FiBookmark } from "react-icons/fi";
import {
  IconLink,
  Logo,
  Avatar,
  Clickable,
  SearchInput,
  SignInButton,
} from "./styles";

const Nav = styled.nav`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid black;
`;

export default function DesktopHeader({ isLogin }) {
  return (
    <Nav>
      <Logo to="/">readium</Logo>
      {!isLogin ? (
        <SignInButton className="ms-sm-4">Sign in</SignInButton>
      ) : (
        <>
          <IconLink to="/notifications" className="ms-sm-4">
            <RiNotification4Line size={26} />
          </IconLink>
          <IconLink to="/saved" className="ms-sm-4">
            <FiBookmark size={24} />
          </IconLink>
          <Clickable className="ms-sm-4">
            <Avatar src="https://i.pravatar.cc/150?img=47" alt="Avatar" />
          </Clickable>
        </>
      )}
      <SearchInput type="text" placeholder="Search" className="ms-sm-4" />
      <IconLink to="/write" className="ms-sm-4">
        <FiEdit size={26} />
      </IconLink>
      <IconLink to="/settings" className="ms-sm-4">
        <RiSettings3Line size={26} />
      </IconLink>
    </Nav>
  );
}

DesktopHeader.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};
