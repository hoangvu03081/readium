import React from "react";
import PropTypes from "prop-types";
import { ContentLayout, CoverImage, Avatar } from "./components/style";
import ProfileInformation from "./ProfileInformation";
import ProfilePost from "./ProfilePost";

export default function ProfileContent({ id }) {
  return (
    <ContentLayout>
      <CoverImage src="https://pbs.twimg.com/media/EOPI4BDUUAA0S-u?format=jpg&name=medium">
        <Avatar src="https://i.pravatar.cc/300" />
      </CoverImage>
      <div className="container">
        <ProfileInformation />
        <ProfilePost />
      </div>
    </ContentLayout>
  );
}

ProfileContent.propTypes = {
  id: PropTypes.string,
};

ProfileContent.defaultProps = {
  id: null,
};
