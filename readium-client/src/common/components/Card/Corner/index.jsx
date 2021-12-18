import React from "react";
import PropTypes from "prop-types";
import CornerMyProfile from "./CornerMyProfile";
import CornerOtherProfile from "./CornerOtherProfile";
import CornerGlobal from "./CornerGlobal";
import CornerCollection from "./CornerCollection";

export default function Corner({ type }) {
  if (type === "myProfile") {
    return <CornerMyProfile />;
  }
  if (type === "otherProfile") {
    return <CornerOtherProfile />;
  }
  if (type === "global") {
    return <CornerGlobal />;
  }
  if (type === "collection") {
    return <CornerCollection />;
  }
  return <>Wrong Type</>;
}

Corner.propTypes = {
  type: PropTypes.string.isRequired,
};
