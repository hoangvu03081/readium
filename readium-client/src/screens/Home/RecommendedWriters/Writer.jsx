import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FollowBtn from "./FollowBtn";
import StyledLink from "../../../common/components/StyledLink";
import { useFollow, useIsFollowAuth } from "../../../common/api/userQuery";
import { useAuth } from "../../../common/hooks/useAuth";
import OnClickRequireAuth from "../../../common/components/OnClickRequireAuth";

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
`;

export default function Writer({ name, type, avatar, profileId }) {
  // HANDLE FOLLOW
  const { auth } = useAuth();
  const indexOfUserId = avatar.lastIndexOf("/");
  const userId = avatar.slice(indexOfUserId + 1);
  const follow = useFollow(userId);
  const isFollow = useIsFollowAuth(userId, auth);
  if (isFollow.isFetching) {
    return <div />;
  }
  if (isFollow.isError) {
    return <p>An error occurred while loading information...</p>;
  }
  const isFollowed = isFollow.data?.is_followed;
  const handleFollow = () => {
    follow.mutate();
  };

  return (
    <Card>
      <OnClickRequireAuth>
        <StyledLink to={`/profile/${profileId}`}>
          <img src={avatar} alt="Avatar" />
        </StyledLink>
      </OnClickRequireAuth>
      <Info>
        <h1>
          <OnClickRequireAuth>
            <StyledLink to={`/profile/${profileId}`}>{name}</StyledLink>
          </OnClickRequireAuth>
        </h1>
        <h2>{type}</h2>
      </Info>
      <FollowBtn isFollowed={isFollowed} handleFollow={handleFollow} />
    </Card>
  );
}

Writer.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
};
