import React from "react";
import PropTypes from "prop-types";
import { ContentLayout, CoverImage, Avatar } from "./components/style";
import ProfileInformation from "./ProfileInformation";
import ProfilePost from "./ProfilePost";
import { useCoverImage, useProfile } from "../../common/api/profileQuery";
import useAvatar from "../../common/api/useAvatar";
import Loading from "../../common/components/Loading";

const SomeModal = () => <h1>hello</h1>;
export default function ProfileContent({ id }) {
  const {
    data: profile,
    isError: profileIsError,
    error: profileError,
  } = useProfile(id);

  if (profileIsError) return <h1>{profileError}</h1>;
  if (profile) {
    //console.log(profile);
    return (
      <ContentLayout>
        <CoverImage src="https://pbs.twimg.com/media/EOPI4BDUUAA0S-u?format=jpg&name=medium">
          <Avatar src={profile.avatar ? `${profile.avatar}` : null} />
        </CoverImage>
        <div className="container">
          <ProfileInformation data={profile} isMyProfile={!id} />
          <ProfilePost id={profile._id} isMyProfile={!id} />
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
