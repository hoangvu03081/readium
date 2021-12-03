import React from "react";
import PropTypes from "prop-types";
import CardDesktop from "./CardDesktop";
import CardMobile from "./CardMobile";

export default function Card() {
  //   {
  //   preview,
  //   title,
  //   content,
  //   tags,
  //   duration,
  //   user,
  //   userAvatar,
  //   loveNumber,
  //   commentNumber,
  // }
  return (
    <>
      {/* <CardDesktop
        preview={preview}
        title={title}
        content={content}
        tags={tags}
        duration={duration}
        userAvatar={userAvatar}
        loveNumber={loveNumber}
        commentNumber={commentNumber}
      />
      <CardMobile
        title={title}
        content={content}
        tags={tags}
        user={user}
        userAvatar={userAvatar}
        loveNumber={loveNumber}
        commentNumber={commentNumber}
      /> */}
      <CardDesktop
        preview="./src/assets/images/preview_2.png"
        title="Oniichan, Kimochi ~ ! Please touch me..."
        content="No Nut November? Thảo should be Nut Nut November! He is better than you."
        tags={["#kimochi", "#Okem", "Fresh", "#ikucu"]}
        duration={3}
        userAvatar="./src/assets/images/yasuo.png"
        loveNumber={3049}
        commentNumber={25}
      />
      <CardMobile
        title="Oniichan, Kimochi ~ ! Please touch me..."
        content="No Nut November? Thảo should be Nut Nut November! He is better than you."
        tags={["#kimochi", "#Okem", "Fresh", "#ikucu"]}
        user="VuHandsome"
        userAvatar="./src/assets/images/yasuo.png"
        loveNumber={3049}
        commentNumber={25}
      />
    </>
  );
}

// Card.propTypes = {
//   preview: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
//   tags: PropTypes.arrayOf(PropTypes.string).isRequired,
//   duration: PropTypes.number.isRequired,
//   user: PropTypes.string.isRequired,
//   userAvatar: PropTypes.string.isRequired,
//   loveNumber: PropTypes.number.isRequired,
//   commentNumber: PropTypes.number.isRequired,
// };
