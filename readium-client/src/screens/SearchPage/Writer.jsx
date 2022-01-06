import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FollowBtn from "../Home/RecommendedWriters/FollowBtn";
import useAvatar from "../../common/api/useAvatar";
import StyledLink from "../../common/components/StyledLink";

const Layout = styled.div`
  border-radius: 5px;
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 60%;
  padding: 30px;
  margin-bottom: 40px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Name = styled.p`
  margin: 0;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const Job = styled.p`
  margin: 0;
  font-family: "Raleway";
  font-weight: 500;
  font-size: 18px;
`;

export default function Writer({ profileId, name, job, profileUrl }) {
  const { data: image } = useAvatar(profileId);
  return (
    <Layout>
      <StyledLink to={profileUrl}>
        <Avatar src={image} alt="Avatar" />
      </StyledLink>
      <Info>
        <StyledLink to={profileUrl}>
          <Name>{name}</Name>
        </StyledLink>
        <Job>{job}</Job>
      </Info>
    </Layout>
  );
}

Writer.propTypes = {
  profileId: PropTypes.objectOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
};
