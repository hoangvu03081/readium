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
};
Card.defaultProps = {
  isSuggestion: false,
};
