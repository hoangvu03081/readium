import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { AiOutlineBell } from "react-icons/ai";
import { RiSettings3Line, RiHomeLine } from "react-icons/ri";
import { FiEdit, FiBookmark } from "react-icons/fi";
import { Link } from "react-router-dom";
import { avatarClicked } from "../../../slices/navbar-slice";
import { modalOpened } from "../../../slices/sign-in-slice";
import { Logo, SearchButton, SignInButton, AvatarImage } from "./styles";
import { useMyAvatar } from "../../api/useAvatar";
import MobileSearchBar from "./components/MobileSearchBar";
import useRouter from "../../hooks/useRouter";

const HeaderNav = styled.nav`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.HeaderBackground};
  z-index: 99;
  top: 0;
  width: 100%;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid #c5c5c5;
  display: flex;
  align-items: center;
`;

const MobileLogo = styled(Logo)`
  padding-top: 0;
`;

const FooterNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;
  z-index: 50;
  background-color: white;
  border-top: 1px solid #c5c5c5;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const MobileSignInButton = styled(SignInButton)`
  margin-top: 0;
`;

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
export default function MobileHeader({ isLogin }) {
  const dispatch = useDispatch();
  const handleOpenModal = () => dispatch(modalOpened());
  const handleAvatarClicked = () => dispatch(avatarClicked());
  const [isSearch, setIsSearch] = useState(false);
  const avatarQuery = useMyAvatar();
  const { push, location } = useRouter();

  useEffect(() => {
    setIsSearch(false);
  }, [location.pathname]);
  return (
    <>
      <HeaderNav>
        {!isSearch && (
          <MobileLogo to="/" className="ms-4">
            readium
          </MobileLogo>
        )}
        {isLogin && !isSearch && (
          <>
            <div className="ms-auto me-4">
              <SearchButton onClick={() => setIsSearch(true)}>
                <BiSearchAlt2 size={20} />
              </SearchButton>
            </div>
            <div className="me-4">
              {avatarQuery.data ? (
                <AvatarImage
                  onClick={handleAvatarClicked}
                  src={avatarQuery.data}
                  alt="Avatar"
                />
              ) : (
                <AvatarImage src="https://ui-avatars.com/api/" alt="Avatar" />
              )}
            </div>
          </>
        )}
        {isLogin && isSearch && <MobileSearchBar setIsSearch={setIsSearch} />}
        {!isLogin && (
          <div className="ms-auto me-4">
            <MobileSignInButton onClick={handleOpenModal}>
              Sign in
            </MobileSignInButton>
          </div>
        )}
      </HeaderNav>
      <FooterNav>
        <UnstyledLink to="/">
          <RiHomeLine size={28} />
        </UnstyledLink>
        <UnstyledLink to="/collections">
          <FiBookmark size={28} />
        </UnstyledLink>
        <UnstyledLink to="/write">
          <FiEdit size={28} />
        </UnstyledLink>
        <UnstyledLink to="/notifications">
          <AiOutlineBell size={28} />
        </UnstyledLink>
        <UnstyledLink to="/settings">
          <RiSettings3Line size={28} />
        </UnstyledLink>
      </FooterNav>
    </>
  );
}

MobileHeader.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};
