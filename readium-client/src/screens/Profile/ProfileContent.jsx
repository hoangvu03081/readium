import React from "react";
import PropTypes from "prop-types";
import { ContentLayout, CoverImage, Avatar } from "./components/style";
import ProfileInformation from "./ProfileInformation";
import ProfilePost from "./ProfilePost";
import { useProfile } from "../../common/api/profileQuery";
import Loading from "../../common/components/Loading";

export default function ProfileContent({ id }) {
  const { data, isError, error } = useProfile(id);
  if (isError) return <h1>{error}</h1>;
  if (data) {
    console.log(data);

    return (
      <ContentLayout>
        <CoverImage src="https://pbs.twimg.com/media/EOPI4BDUUAA0S-u?format=jpg&name=medium">
          <Avatar src="https://i.pravatar.cc/300" />
        </CoverImage>
        <div className="container">
          <ProfileInformation data={data} isMyProfile={!id} />
          <ProfilePost />
        </div>
      </ContentLayout>
    );
  }

  return <Loading />;
}

ProfileContent.propTypes = {
  id: PropTypes.string,
};

ProfileContent.defaultProps = {
  id: null,
};
