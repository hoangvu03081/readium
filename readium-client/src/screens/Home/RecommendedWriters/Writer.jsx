import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FollowBtn from "./FollowBtn";
import StyledLink from "../../../common/components/StyledLink";

const Card = styled.div`
  width: 100%;
  height: 54px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  img {
    width: 54px;
    height: 54px;
    border-radius: 50%;
  }
  img:hover {
    cursor: pointer;
  }
`;

const Info = styled.div`
  width: 215px;
  h1 {
    margin: 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: bold;
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  h2 {
    margin: 0;
    padding: 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default function Writer({ name, type, avatar, profileId }) {
  return (
    <Card>
      <StyledLink to={`/profile/${profileId}`}>
        <img src={avatar} alt="Avatar" />
      </StyledLink>
      <Info>
        <h1>
          <StyledLink to={`/profile/${profileId}`}>{name}</StyledLink>
        </h1>
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
  profileId: PropTypes.string.isRequired,
};
