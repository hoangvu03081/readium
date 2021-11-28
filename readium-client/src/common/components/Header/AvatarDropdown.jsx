import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FiEdit, FiSettings } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { RiDraftLine } from "react-icons/ri";
import { BiHelpCircle } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import StyledLink from "../StyledLink";
import useHover from "../../hooks/useHover";
import { useAuth } from "../../hooks/useAuth";

const StyledAvatarDropdown = styled.nav`
  position: absolute;
  top: 40px;
  right: -100px;
  width: 240px;
  height: 293px;
  background-color: white;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  font-size: 24px;
`;

const DropdownItem = styled.div`
  position: relative;
  margin-left: 60px;
  cursor: pointer;
`;

const DropdownIcon = styled.div`
  position: absolute;
  top: 4px;
  left: -35px;
`;

const DropdownText = styled.span`
  position: relative;
  &:after {
    display: block;
    width: max-content;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: black;
    opacity: 0;
    transition: opacity 300ms, transform 300ms;
  }
  &.hovering:after {
    opacity: 1;
    transform: translate3d(0, 0.2em, 0);
  }
`;

function StyledDropdownItem({ children, to, text }) {
  const [isHover, { onMouseOver, onMouseOut }] = useHover();
  if (to) {
    return (
      <DropdownItem
        className="mt-sm-3"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <StyledLink to={to}>
          <DropdownIcon>{children}</DropdownIcon>
          <DropdownText className={isHover ? "hovering" : ""}>
            {text}
          </DropdownText>
        </StyledLink>
      </DropdownItem>
    );
  }
  return (
    <DropdownItem
      className="mt-sm-3"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <DropdownIcon>{children}</DropdownIcon>
      <DropdownText className={isHover ? "hovering" : ""}>{text}</DropdownText>
    </DropdownItem>
  );
}

StyledDropdownItem.propTypes = {
  children: PropTypes.element.isRequired,
  // eslint-disable-next-line react/require-default-props
  to: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default function AvatarDropdown() {
  const { signOut } = useAuth();
  return (
    <StyledAvatarDropdown>
      <StyledDropdownItem to="/" text="My profile">
        <FaRegUserCircle />
      </StyledDropdownItem>
      <StyledDropdownItem to="/write" text="Write story">
        <FiEdit />
      </StyledDropdownItem>
      <StyledDropdownItem to="/settings" text="Settings">
        <FiSettings />
      </StyledDropdownItem>
      <StyledDropdownItem to="/help" text="Help">
        <BiHelpCircle />
      </StyledDropdownItem>
      <StyledDropdownItem to="/draft" text="My draft">
        <RiDraftLine />
      </StyledDropdownItem>
      <div onClick={signOut} role="button" tabIndex={0} onKeyPress={signOut}>
        <StyledDropdownItem text="Logout">
          <AiOutlineLogout />
        </StyledDropdownItem>
      </div>
    </StyledAvatarDropdown>
  );
  // return (
  //   <StyledAvatarDropdown>
  //     <StyledDropdownItem to="/" text="My profile">
  //       <FaRegUserCircle />
  //     </StyledDropdownItem>
  //     <DropdownItem className="mt-sm-3 mb-sm-3">
  //       <StyledLink to="/">
  //         <DropdownIcon>
  //           <FaRegUserCircle />
  //         </DropdownIcon>
  //         <span>My profile</span>
  //       </StyledLink>
  //     </DropdownItem>
  //     <DropdownItem className="mb-sm-3">
  //       <DropdownIcon>
  //         <FiEdit />
  //       </DropdownIcon>
  //       Write story
  //     </DropdownItem>
  //     <DropdownItem className="mb-sm-3">
  //       <DropdownIcon>
  //         <RiSettings3Line size={22} />
  //       </DropdownIcon>
  //       Settings
  //     </DropdownItem>
  //     <DropdownItem className="mb-sm-3">
  //       <DropdownIcon>
  //         <BiHelpCircle size={22} />
  //       </DropdownIcon>
  //       Help
  //     </DropdownItem>
  //     <DropdownItem className="mb-sm-3">
  //       <DropdownIcon>
  //         <GrLanguage size={22} />
  //       </DropdownIcon>
  //       Languages
  //     </DropdownItem>
  //     <DropdownItem className="mb-sm-3">
  //       <DropdownIcon>
  //         <RiDraftLine size={22} />
  //       </DropdownIcon>
  //       My draft
  //     </DropdownItem>
  //     <DropdownItem className="mb-sm-3">
  //       <DropdownIcon>
  //         <AiOutlineLogout size={22} />
  //       </DropdownIcon>
  //       Logout
  //     </DropdownItem>
  //   </StyledAvatarDropdown>
  // );
}
