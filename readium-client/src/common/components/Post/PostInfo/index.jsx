import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import { useHistory } from "react-router-dom";
import ModalCollection from "../../ModalCollections";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as Report } from "../../../../assets/icons/report.svg";
import {
  AdditionLeft,
  AdditionRight,
  AdditionRow,
  Author,
  Avatar,
  FollowBtn,
  Info,
  Layout,
  Left,
  Right,
  Time,
} from "./styles";
import { useFollow, useIsFollowAuth } from "../../../api/userQuery";
import { useAuth } from "../../../hooks/useAuth";
import OnClickRequireAuth from "../../OnClickRequireAuth";

export default function PostInfo({
  postId,
  author,
  publishedDate,
  duration,
  type,
  isMyself,
}) {
  const auth = useAuth();
  const history = useHistory();
  const modalCollectionRef = useRef(null);
  const [modalCollection, setModalCollection] = useState(false);

  const indexOfUserId = author.avatar.lastIndexOf("/");
  const userId = author.avatar.slice(indexOfUserId + 1);
  const follow = useFollow(userId);
  const isFollow = useIsFollowAuth(userId, auth.auth);
  if (isFollow.isFetching) {
    return <div />;
  }
  if (isFollow.isError) {
    return <p>An error occurred while loading information...</p>;
  }
  const isFollowed = isFollow.data?.is_followed;

  // HANDLE ADD COLLECTION
  const handleModalCollection = () => {
    if (modalCollection) {
      setModalCollection(false);
    } else {
      setModalCollection(true);
    }
  };
  const handleCloseModalCollection = () => {
    setModalCollection(false);
  };

  // HANDLE PROFILE
  const handleProfile = () => {
    history.push(`/profile/${author.profileId}`);
  };

  // HANDLE FOLLOW
  const handleFollow = () => {
    follow.mutate();
  };

  // HANDLE PUBLISHED DATE
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  const formatPublishedDate = (timeStamp) => {
    const dateTime = new Moment(timeStamp);
    const result = capitalizeFirstLetter(dateTime.fromNow());
    return result === "A few seconds ago" ? "Just now" : result;
  };

  const render = () => {
    if (window.innerWidth > 550) {
      return (
        <Right
          className={type === "preview" ? "d-none" : "d-block"}
          isMyself={isMyself}
          ref={modalCollectionRef}
        >
          <OnClickRequireAuth>
            <AddCollection onClick={handleModalCollection} />
          </OnClickRequireAuth>
          <ModalCollection
            postId={postId}
            trigger={modalCollection}
            handleTrigger={handleModalCollection}
            handleCloseTrigger={handleCloseModalCollection}
            modalCollectionRef={modalCollectionRef}
          />
          <OnClickRequireAuth>
            <Report />
          </OnClickRequireAuth>
        </Right>
      );
    }
    return (
      <AdditionRow>
        <OnClickRequireAuth>
          <AdditionLeft
            className={
              type === "preview" || isMyself ? "opacity-0" : "opacity-1"
            }
            onClick={handleFollow}
          >
            {isFollowed ? "Following" : "Follow"}
          </AdditionLeft>
        </OnClickRequireAuth>
        <AdditionRight
          className={type === "preview" ? "d-none" : "d-block"}
          isMyself={isMyself}
          ref={modalCollectionRef}
        >
          <OnClickRequireAuth>
            <AddCollection onClick={handleModalCollection} />
          </OnClickRequireAuth>
          <ModalCollection
            postId={postId}
            trigger={modalCollection}
            handleTrigger={handleModalCollection}
            handleCloseTrigger={handleCloseModalCollection}
            modalCollectionRef={modalCollectionRef}
          />
          <OnClickRequireAuth>
            <Report />
          </OnClickRequireAuth>
        </AdditionRight>
      </AdditionRow>
    );
  };

  return (
    <Layout>
      <Left>
        <OnClickRequireAuth>
          <Avatar src={author.avatar} onClick={handleProfile} />
        </OnClickRequireAuth>
        <Info>
          <OnClickRequireAuth>
            <Author onClick={handleProfile}>{author.displayName}</Author>
          </OnClickRequireAuth>
          <Time>
            {type === "preview"
              ? "Just now"
              : formatPublishedDate(publishedDate)}
            {`  ·  `}
            {duration > 1 ? `${duration} mins read` : `${duration} min read`}
          </Time>
        </Info>
        <OnClickRequireAuth>
          <FollowBtn
            className={type === "preview" || isMyself ? "d-none" : "d-block"}
            onClick={handleFollow}
          >
            {isFollowed ? "Following" : "Follow"}
          </FollowBtn>
        </OnClickRequireAuth>
      </Left>
      {render()}
    </Layout>
  );
}

PostInfo.propTypes = {
  postId: PropTypes.string.isRequired,
  author: PropTypes.objectOf(PropTypes.any).isRequired,
  publishedDate: PropTypes.string,
  duration: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isMyself: PropTypes.bool.isRequired,
};
PostInfo.defaultProps = {
  publishedDate: "",
};
