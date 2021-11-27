import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.MoreBackground};
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.colors.MoreBlack};
  width: 135px;
  padding: 0;
  h1 {
    margin: 0;
    padding: 8px 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    color: ${({ theme }) => theme.colors.MoreBlack};
    transition: all 0.15s;
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.MoreBackground};
      background-color: ${({ theme }) => theme.colors.MoreBlack};
      transition: all 0.15s;
    }
  }
`;

export default function More() {
  return (
    <Layout>
      <h1>Dismiss story</h1>
      <h1>Report story</h1>
      <h1>Block author</h1>
    </Layout>
  );
}
