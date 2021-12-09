import React from "react";
import PropTypes from "prop-types";
import { ContentLayout, CoverImage, Avatar } from "./components/style";
import ProfileInformation from "./ProfileInformation";
import ProfilePost from "./ProfilePost";
import { useProfile } from "../../common/api/profileQuery";
import useAvatar from "../../common/api/useAvatar";
import Loading from "../../common/components/Loading";

const SomeModal = () => <h1>hello</h1>;
export default function ProfileContent({ id }) {
  const {
    data: profile,
    isError: profileIsError,
    error: profileError,
  } = useProfile(id);
  const { data: avatar, isError: avatarIsError } = useAvatar(id);
  if (profileIsError) return <h1>{profileError}</h1>;
  if (profile) {
    return (
      <ContentLayout>
        <CoverImage src="https://pbs.twimg.com/media/EOPI4BDUUAA0S-u?format=jpg&name=medium">
          <Avatar src={avatar ? `${avatar}` : ""} />
        </CoverImage>
        <div className="container">
          <ProfileInformation data={profile} isMyProfile={!id} />
          <ProfilePost id={id} />
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
