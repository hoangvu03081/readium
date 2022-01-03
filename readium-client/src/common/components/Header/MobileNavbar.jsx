import React, { useEffect } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { RiSettings3Line, RiDraftLine } from "react-icons/ri";
import { BiHelpCircle } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { navClosed } from "../../../slices/navbar-slice";
import DimOverlay from "../DimOverlay";
import StyledLink from "../StyledLink";
import { useAuth } from "../../hooks/useAuth";

const StyledNav = styled.nav`
  position: fixed;
  background-color: white;
  width: 325px;
  height: 100vh;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  &.slide-enter {
    left: -100%;
  }
  &.slide-enter-active {
    left: 0;
    transition: all 500ms;
  }
  &.slide-exit {
    left: 0;
  }
  &.slide-exit-active {
    left: -100%;
    transition: all 500ms;
  }
`;

const AnimatedDimOverlay = styled(DimOverlay)`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 0.5;
    transition: opacity 500ms;
  }
  &.fade-exit {
    opacity: 0.5;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 500ms;
  }
`;

const StyledNavItem = styled.div`
  font-size: 24px;
  position: relative;
`;

const AlignMiddle = styled.span`
  margin-left: 110px;
`;

const NavIcon = styled.i`
  position: absolute;
  top: 3px;
  left: 70px;
`;

function NavItem({ text, to, icon, signOut }) {
  const dispatch = useDispatch();
  const handleCloseNav = () => dispatch(navClosed());
  if (signOut) {
    const handleLogout = () => {
      signOut();
      handleCloseNav();
    };
    return (
      <StyledNavItem className="mt-3">
        <AlignMiddle>
          <StyledLink onClick={handleLogout} to="/">
            <NavIcon>{icon}</NavIcon>
            {text}
          </StyledLink>
        </AlignMiddle>
      </StyledNavItem>
    );
  }

  return (
    <StyledNavItem className="mt-3">
      <AlignMiddle>
        <StyledLink onClick={handleCloseNav} to={to}>
          <NavIcon>{icon}</NavIcon>
          {text}
        </StyledLink>
      </AlignMiddle>
    </StyledNavItem>
  );
}

function NavContent() {
  const { auth, signOut } = useAuth();
  return (
    <>
      <NavItem
        text="My profile"
        to={`/profile/${auth.profileId}`}
        icon={<FaRegUserCircle />}
      />
      <NavItem text="Write story" to="/write" icon={<FiEdit />} />
      <NavItem text="Settings" to="/settings" icon={<RiSettings3Line />} />
      {/* <NavItem text="Help" to="/help" icon={<BiHelpCircle />} />
      <NavItem text="My draft" to="/draft" icon={<RiDraftLine />} /> */}
      <NavItem
        text="Logout"
        to="/"
        signOut={signOut}
        icon={<AiOutlineLogout />}
      />
    </>
  );
}

const StyledExitBar = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  border-bottom: 1px solid #efefef;
`;

function ExitBar({ handleCloseNav }) {
  return (
    <StyledExitBar>
      <MdOutlineClose onClick={handleCloseNav} size={28} className="me-2" />
    </StyledExitBar>
  );
}

export default function MobileNavbar() {
  const dispatch = useDispatch();
  const handleCloseNav = () => dispatch(navClosed());
  const isNavOpen = useSelector((state) => state.navbar);
  useEffect(() => {
    if (isNavOpen) disablePageScroll();
    if (!isNavOpen) enablePageScroll();
  }, [isNavOpen]);
  return (
    <>
      <CSSTransition
        in={isNavOpen}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        <StyledNav>
          <ExitBar handleCloseNav={handleCloseNav} />
          <NavContent />
        </StyledNav>
      </CSSTransition>
      <CSSTransition
        in={isNavOpen}
        timeout={500}
        classNames="fade"
        unmountOnExit
        onClick={handleCloseNav}
      >
        <AnimatedDimOverlay />
      </CSSTransition>
    </>
  );
}
