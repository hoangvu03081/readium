import React from "react";
import PropTypes from "prop-types";
import CardDesktop from "./CardDesktop";
import CardMobile from "./CardMobile";

export default function Card({
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
}) {
  return (
    <>
      <CardDesktop
        preview={preview}
        title={title}
        content={content}
        tags={tags}
        duration={duration}
        userAvatar={userAvatar}
        loveNumber={loveNumber}
        commentNumber={commentNumber}
        type={type}
      />
      <CardMobile
        title={title}
        content={content}
        tags={tags}
        user={user}
        userAvatar={userAvatar}
        loveNumber={loveNumber}
        commentNumber={commentNumber}
        type={type}
      />
    </>
  );
}

Card.propTypes = {
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
};
