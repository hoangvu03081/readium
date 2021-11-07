import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  RiSettings3Line,
  RiHomeLine,
  RiNotification4Line,
} from "react-icons/ri";
import { FiEdit, FiBookmark } from "react-icons/fi";
import { Logo, Avatar, SearchButton, SignInButton } from "./styles";

const HeaderNav = styled.nav`
  position: fixed;
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
const MobileAvatar = styled(Avatar)`
  margin-top: 0;
`;

const FooterNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 64px;
  background-color: white;
  border-top: 1px solid #c5c5c5;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const MobileSignInButton = styled(SignInButton)`
  margin-top: 0;
`;

export default function MobileHeader({ isLogin }) {
  return (
    <>
      <HeaderNav>
        <MobileLogo className="ms-4">readium</MobileLogo>
        {isLogin ? (
          <>
            <div className="ms-auto me-4">
              <SearchButton>
                <BiSearchAlt2 size={20} />
              </SearchButton>
            </div>
            <div className="me-4">
              <MobileAvatar
                src="https://i.pinimg.com/280x280_RS/fd/d8/4a/fdd84a2fb86dbef973a86d9fb59d1f5a.jpg"
                alt="Avatar"
              />
            </div>
          </>
        ) : (
          <div className="ms-auto me-4">
            <MobileSignInButton>Sign in</MobileSignInButton>
          </div>
        )}
      </HeaderNav>
      <FooterNav>
        <RiHomeLine size={28} />
        <FiBookmark size={28} />
        <FiEdit size={28} />
        <RiNotification4Line size={28} />
        <RiSettings3Line size={28} />
      </FooterNav>
    </>
  );
}

MobileHeader.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};
