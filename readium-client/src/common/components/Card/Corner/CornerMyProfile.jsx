import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.MoreBackground};
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.colors.MoreBlack};
  width: 135px;
  padding: 0;
  p {
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

export default function CornerMyProfile() {
  return (
    <Layout>
      <p>Edit post</p>
      <p>Delete post</p>
    </Layout>
  );
}
