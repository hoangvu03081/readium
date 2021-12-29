import React from "react";
import styled from "styled-components";
import StyledResult from "./StyledResult";

const SearchAvatar = styled.img`
  vertical-align: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background-color: white;
  overflow: hidden;
`;

export default function UserResult() {
  return (
    <StyledResult>
      <SearchAvatar
        className="me-2"
        alt="avatar"
        src="https://ui-avatars.com/api/?name=John+Doe"
      />
      OniiChan
    </StyledResult>
  );
}
