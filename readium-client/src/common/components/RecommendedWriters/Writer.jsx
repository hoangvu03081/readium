import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FollowBtn from "../Buttons/FollowBtn";

const Card = styled.div`
  position: relative;
  height: 54px;
  margin-bottom: 25px;
  img {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
  }
  img:hover {
    cursor: pointer;
  }
  button {
    position: absolute;
    top: 8px;
    right: 0;
  }
`;

const Info = styled.div`
  position: absolute;
  top: 7px;
  left: 65px;
  width: 205px;
  h1 {
    margin: 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: bold;
    font-size: 18px;
  }
  h2 {
    margin: 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 16px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default function Writer({ Name, Type, Avatar }) {
  return (
    <Card>
      <img src={Avatar} alt="" />
      <Info>
        <h1>{Name}</h1>
        <h2>{Type}</h2>
      </Info>
      <FollowBtn />
    </Card>
  );
}

Writer.propTypes = {
  Name: PropTypes.string.isRequired,
  Type: PropTypes.string.isRequired,
  Avatar: PropTypes.string.isRequired,
};
