/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import {
  BsFacebook,
  BsThreeDots,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import {
  Displayname,
  Job,
  FollowButton,
  UnfollowButton,
  OptionButton,
  VerticalDivider,
  Biography,
  InformationIcon,
  EditProfileButton,
} from "./components/style";
import { useIsFollow, useFollow } from "../../common/api/userQuery";
import StyledLink from "../../common/components/StyledLink";

function checkInformation(data) {
  return data.facebook || data.twitter || data.instagram || data.email;
}

export default function ProfileInformation({ data, isMyProfile }) {
  const { data: followData } = useIsFollow(data.id);
  const followUser = useFollow(data.id);
  return (
    <>
      {isMyProfile && (
        <StyledLink to="/settings">
          <EditProfileButton>Edit profile</EditProfileButton>
        </StyledLink>
      )}
      <Displayname>{data.displayName}</Displayname>
      <Job>{data.job && `${data.job}`}</Job>
      {!isMyProfile && (
        <div className="d-flex justify-content-center">
          {followData && !followData.is_followed ? (
            <FollowButton className="me-3" onClick={followUser.mutate}>
              Follow
            </FollowButton>
          ) : (
            <UnfollowButton className="me-3" onClick={followUser.mutate}>
              Followed
            </UnfollowButton>
          )}
          <OptionButton>
            <BsThreeDots />
          </OptionButton>
        </div>
      )}
      <div className="row mt-4 position-relative justify-content-center">
        {checkInformation(data) && (
          <>
            <div className="col-md-6 col-sm-12">
              <div className="d-flex justify-content-center justify-content-sm-center justify-content-md-end">
                {data.facebook && (
                  <InformationIcon target="_blank" href={data.facebook}>
                    <BsFacebook size={32} />
                  </InformationIcon>
                )}
                {data.twitter && (
                  <InformationIcon
                    target="_blank"
                    href={data.twitter}
                    className="ms-3"
                  >
                    <BsTwitter size={32} />
                  </InformationIcon>
                )}
                {data.instagram && (
                  <InformationIcon
                    target="_blank"
                    href={data.instagram}
                    className="ms-3"
                  >
                    <BsInstagram size={32} />
                  </InformationIcon>
                )}
                {data.contactEmail && (
                  <InformationIcon
                    target="_blank"
                    href={`mailto:${data.contactEmail}`}
                    className="ms-3 me-2"
                  >
                    <AiOutlineMail size={32} />
                  </InformationIcon>
                )}
              </div>
            </div>
            <VerticalDivider className="d-sm-none d-none d-md-block" />
          </>
        )}
        <div
          className={`${
            checkInformation(data)
              ? "col-md-6"
              : "d-flex col-md-12 justify-content-center"
          } col-sm-12 align-content-md-center`}
        >
          <div className="d-flex justify-content-center justify-content-sm-center  justify-content-md-start mt-sm-3 mt-3 mt-md-0 pt-1">
            <span className="ms-2 me-3">
              {data.followings
                ? `${data.followings} followings`
                : "0 followings"}
            </span>
            <span>
              {data.followers ? `${data.followers} followers` : "0 followers"}
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Biography>{data.biography ? `${data.biography}` : ""}</Biography>
      </div>
    </>
  );
}

// ProfileInformation.propTypes = {
//   id: PropTypes.string,
// };

// ProfileInformation.defaultProps = {
//   id: null,
// };
