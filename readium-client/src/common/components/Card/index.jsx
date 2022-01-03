import React from "react";
import PropTypes from "prop-types";
import CardDesktop from "./CardDesktop";
import CardMobile from "./CardMobile";

export default function Card({
  postId,
  profileId,
  preview,
  title,
  content,
  tags,
  duration,
  user,
  userAvatar,
  loveNumber,
  commentNumber,
  type,
  isSuggestion,
  refetchList,
  collectionId,
}) {
  return (
    <>
      <CardDesktop
        postId={postId}
        profileId={profileId}
        preview={preview}
        title={title}
        content={content}
        tags={tags}
        duration={duration}
        userAvatar={userAvatar}
        loveNumber={loveNumber}
        commentNumber={commentNumber}
        type={type}
        isSuggestion={isSuggestion}
        refetchList={refetchList}
        collectionId={collectionId}
      />
      <CardMobile
        postId={postId}
        profileId={profileId}
        title={title}
        content={content}
        tags={tags}
        user={user}
        userAvatar={userAvatar}
        loveNumber={loveNumber}
        commentNumber={commentNumber}
        type={type}
        isSuggestion={isSuggestion}
        refetchList={refetchList}
        collectionId={collectionId}
      />
    </>
  );
}

Card.propTypes = {
  postId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  loveNumber: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isSuggestion: PropTypes.bool,
  refetchList: PropTypes.func,
  collectionId: PropTypes.string,
};
Card.defaultProps = {
  isSuggestion: false,
  refetchList: () => {},
  collectionId: "",
};
