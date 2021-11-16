import React from "react";
import styled from "styled-components";

const Outline = styled.div`
  border: 2px solid black;
  border-radius: 6px;
  width: 300px;
  height: 39px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
`;

const Button = styled.button`
  font-family: "Lato";
  font-weight: bold;
  font-size: 16px;
  border: none;
  background-color: ${({ theme }) =>
    theme.colors.FollowingRecommendedBtnBackground};
  color: ${({ theme }) => theme.colors.FollowingRecommendedBtnText};
  position: relative;
  transition: color 0.5s;

  &:hover {
    color: ${({ theme }) => theme.colors.FollowingRecommendedBtnHover};
    transition: all 0.3s;
  }

  &:focus {
    color: ${({ theme }) => theme.colors.FollowingRecommendedBtnHover};
  }

  &:after {
    content: "";
    width: 0;
    border: 2px solid
      ${({ theme }) => theme.colors.FollowingRecommendedBtnHover};
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    transition: all 0.4s;
    opacity: 0;
  }

  &:focus::after {
    opacity: 1;
    width: 65%;
    transition: all 0.4s;
  }
`;

const Line = styled.div`
  position: absolute;
  left: 132px;
  top: 5px;
  border: 1px solid black;
  height: 25px;
`;

export default function FollowingRecommendedBtn() {
  return (
    <Outline>
      <Button>FOLLOWING</Button>
      <Line />
      <Button>RECOMMENDED</Button>
    </Outline>
  );
}
