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
import OnClickRequireAuth from "../OnClickRequireAuth";

const Nav = styled.nav`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.HeaderBackground};
  z-index: 10;
  top: 0;
  height: 80px;
  width: 100vw;
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
          <IconLink to="/collections" className="ms-sm-4 me-sm-4">
            <FiBookmark size={24} />
          </IconLink>
          <Avatar />
        </>
      )}
      <SearchInput type="text" placeholder="Search" className="ms-sm-4" />
      <OnClickRequireAuth>
        <IconLink to="/write" className="ms-sm-4">
          <FiEdit size={26} />
        </IconLink>
      </OnClickRequireAuth>
      <OnClickRequireAuth>
        <IconLink to="/settings" className="ms-sm-4">
          <RiSettings3Line size={28} />
        </IconLink>
      </OnClickRequireAuth>
    </Nav>
  );
}
