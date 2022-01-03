import React from "react";
import PropTypes from "prop-types";
import CornerMyProfile from "./CornerMyProfile";
import CornerOtherProfile from "./CornerOtherProfile";
import CornerGlobal from "./CornerGlobal";
import CornerCollection from "./CornerCollection";

export default function Corner({ type, postId, collectionId, refetchList }) {
  if (type === "myProfile") {
    return <CornerMyProfile postId={postId} />;
  }
  if (type === "otherProfile") {
    return <CornerOtherProfile postId={postId} />;
  }
  if (type === "global") {
    return <CornerGlobal postId={postId} />;
  }
  if (type === "collection") {
    return (
      <CornerCollection
        postId={postId}
        collectionId={collectionId}
        refetchList={refetchList}
      />
    );
  }
  return <>Wrong Type</>;
}

Corner.propTypes = {
  type: PropTypes.string.isRequired,
  postId: PropTypes.string,
  collectionId: PropTypes.string,
  refetchList: PropTypes.func,
};
Corner.defaultProps = {
  postId: "",
  collectionId: "",
  refetchList: () => {},
};
