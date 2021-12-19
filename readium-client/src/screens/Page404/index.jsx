import React from "react";
import styled from "styled-components";
import StyledLink from "../../common/components/StyledLink";

const Styled404 = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 48px;
  flex-wrap: wrap;
  flex-direction: column;
  a {
    display: inline-block;
    font-weight: normal;
    font-size: 30px;
    transition: color 0.2s;
    &:hover {
      color: #5ca9f7;
    }
  }

  @media only screen and (max-width: 700px) {
    font-size: 28px;
    a {
      font-size: 18px;
    }
  }
`;

export default function Page404() {
  return (
    <Styled404>
      <div>Something went wrong</div>
      <StyledLink to="/" className="mt-3">
        Click here to go back to homepage
      </StyledLink>
    </Styled404>
  );
}
