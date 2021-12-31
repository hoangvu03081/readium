import React from "react";
import styled from "styled-components";
import StyledResult from "./StyledResult";
import StyledLink from "../../StyledLink";
import useAvatar from "../../../api/useAvatar";

const SearchAvatar = styled.img`
  vertical-align: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background-color: white;
  overflow: hidden;
`;

export default function UserResult({ user }) {
  const { data: image } = useAvatar(user._id);
  return (
    <StyledLink to={user.url}>
      <StyledResult>
        <SearchAvatar className="me-2" alt="avatar" src={image} />
        {user.displayName}
      </StyledResult>
    </StyledLink>
  );
}
