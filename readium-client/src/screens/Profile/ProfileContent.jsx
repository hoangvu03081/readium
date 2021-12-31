import React from "react";
import PropTypes from "prop-types";
import { ContentLayout, CoverImage, Avatar } from "./components/style";
import ProfileInformation from "./ProfileInformation";
import ProfilePost from "./ProfilePost";
import { useProfile } from "../../common/api/profileQuery";
import Loading from "../../common/components/Loading";
import MyAvatar from "./components/MyAvatar";
import MyCoverImage from "./components/MyCoverImage";

export default function ProfileContent({ id, isMyProfile }) {
  const [
    { data: profile, isError: profileIsError, error: profileError },
    { data: avatar, isFetched: avatarIsFetched },
    {
      data: coverImage,
      isError: coverImageIsError,
      isFetched: coverImageIsFetched,
    },
  ] = useProfile(id);

  if (profileIsError) return <h1>{profileError}</h1>;
  if (
    profile &&
    (coverImageIsFetched || coverImageIsError) &&
    avatarIsFetched
  ) {
    return (
      <ContentLayout>
        {!isMyProfile ? (
          <>
            <CoverImage src={coverImage} />
            <Avatar src={avatar ? `${avatar}` : null} alt="Avatar" />
          </>
        ) : (
          <>
            <MyCoverImage src={coverImage} userId={profile.id} />
            <MyAvatar src={avatar ? `${avatar}` : null} userId={profile.id} />
          </>
        )}
        <div className="container">
          <ProfileInformation data={profile} isMyProfile={isMyProfile} />
          <ProfilePost userId={profile.id} isMyProfile={isMyProfile} />
        </div>
      </ContentLayout>
    );
  }

  return <Loading />;
}

ProfileContent.propTypes = {
  id: PropTypes.string,
  isMyProfile: PropTypes.bool,
};

ProfileContent.defaultProps = {
  id: null,
  isMyProfile: false,
};
