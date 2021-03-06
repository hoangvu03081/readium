import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import OnClickRequireAuth from "../../../common/components/OnClickRequireAuth";

const Outline = styled.div`
  border: 2px solid black;
  border-radius: 6px;
  width: 300px;
  height: 39px;
  margin: 50px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  z-index: 1;
  @media (max-width: 650px) {
    margin: 50px 0;
  }
  @media (max-width: 365px) {
    transform: scale(0.8);
  }
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
    cursor: pointer;
    transition: all 0.3s;
  }

  &.active {
    color: ${({ theme }) => theme.colors.FollowingRecommendedBtnHover};
  }

  &:after {
    content: "";
    width: 0;
    border: 2px solid
      ${({ theme }) => theme.colors.FollowingRecommendedBtnHover};
    background-color: ${({ theme }) =>
      theme.colors.FollowingRecommendedBtnHover};
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

  &.active::after {
    opacity: 1;
    width: 65%;
    transition: all 0.4s;
  }
`;

const Line = styled.div`
  position: absolute;
  left: 152px;
  top: 5px;
  border: 1px solid black;
  height: 25px;
`;

export default function FollowingRecommendedBtn({ recommend, setRecommend }) {
  return (
    <Outline>
      <Button
        className={recommend ? "active" : ""}
        onClick={() => setRecommend(true)}
      >
        RECOMMEND
      </Button>
      <Line />
      <OnClickRequireAuth>
        <Button
          className={recommend ? "" : "active"}
          onClick={() => setRecommend(false)}
        >
          FOLLOWING
        </Button>
      </OnClickRequireAuth>
    </Outline>
  );
}

FollowingRecommendedBtn.propTypes = {
  recommend: PropTypes.bool.isRequired,
  setRecommend: PropTypes.func.isRequired,
};
