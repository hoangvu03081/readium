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

export default function PostInfo({
  postId,
  author,
  publishedDate,
  duration,
  type,
  isMyself,
}) {
  const history = useHistory();
  const modalCollectionRef = useRef(null);
  const [modalCollection, setModalCollection] = useState(false);

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
    console.log("Follow");
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
          <AddCollection onClick={handleModalCollection} />
          <ModalCollection
            postId={postId}
            trigger={modalCollection}
            handleTrigger={handleModalCollection}
            handleCloseTrigger={handleCloseModalCollection}
            modalCollectionRef={modalCollectionRef}
          />
          <Report />
        </Right>
      );
    }
    return (
      <AdditionRow>
        <AdditionLeft
          className={type === "preview" || isMyself ? "opacity-0" : "opacity-1"}
          onClick={handleFollow}
        >
          Follow
        </AdditionLeft>
        <AdditionRight
          className={type === "preview" ? "d-none" : "d-block"}
          isMyself={isMyself}
          ref={modalCollectionRef}
        >
          <AddCollection onClick={handleModalCollection} />
          <ModalCollection
            postId={postId}
            trigger={modalCollection}
            handleTrigger={handleModalCollection}
            handleCloseTrigger={handleCloseModalCollection}
            modalCollectionRef={modalCollectionRef}
          />
          <Report />
        </AdditionRight>
      </AdditionRow>
    );
  };

  return (
    <Layout>
      <Left>
        <Avatar src={author.avatar} onClick={handleProfile} />
        <Info>
          <Author onClick={handleProfile}>{author.displayName}</Author>
          <Time>
            {type === "preview"
              ? "Just now"
              : formatPublishedDate(publishedDate)}
            {`  ·  `}
            {duration > 1 ? `${duration} mins read` : `${duration} min read`}
          </Time>
        </Info>
        <FollowBtn
          className={type === "preview" || isMyself ? "d-none" : "d-block"}
          onClick={handleFollow}
        >
          Follow
        </FollowBtn>
      </Left>
      {render()}
    </Layout>
  );
}

PostInfo.propTypes = {
  postId: PropTypes.string,
  author: PropTypes.objectOf(PropTypes.any).isRequired,
  publishedDate: PropTypes.string,
  duration: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isMyself: PropTypes.bool.isRequired,
};
PostInfo.defaultProps = {
  postId: "",
  publishedDate: "",
};
