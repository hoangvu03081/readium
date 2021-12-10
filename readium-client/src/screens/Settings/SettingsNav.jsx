import React from "react";
import styled from "styled-components";
import StyledLink from "../../common/components/StyledLink";
import useRouter from "../../common/hooks/useRouter";

const StyledNav = styled.nav`
  width: 100%;
  border: solid 2px black;
  border-radius: 5px;
  text-align: center;
  a:first-child {
    margin-top: 20px;
  }
  a:last-child {
    margin-bottom: 20px;
  }
  .focused {
    font-weight: bold;
  }
`;

const NavItem = styled(StyledLink)`
  text-align: center;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const url = (endpoint) => `/settings${endpoint}`;
const NavList = [
  { name: "Profile settings", path: url("") },
  { name: "Account settings", path: url("/account") },
];

export default function SettingsNav() {
  const { location } = useRouter();
  return (
    <div className="col-md-3 col-12 pe-md-4 pe-0">
      <StyledNav>
        {NavList.map((item) => (
          <NavItem
            key={item.name}
            to={item.path}
            className={item.path === location.pathname && "focused"}
          >
            {item.name}
          </NavItem>
        ))}
      </StyledNav>
    </div>
  );
}
