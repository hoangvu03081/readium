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

export default function Writer({ name, type, avatar }) {
  return (
    <Card>
      <img src={avatar} alt="" />
      <Info>
        <h1>{name}</h1>
        <h2>{type}</h2>
      </Info>
      <FollowBtn />
    </Card>
  );
}

Writer.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
