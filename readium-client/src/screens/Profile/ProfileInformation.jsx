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

export default function ProfileInformation({ data, isMyProfile }) {
  return (
    <>
      {isMyProfile && <EditProfileButton>Edit profile</EditProfileButton>}
      <Displayname>{data.displayName}</Displayname>
      <Job>{data.job && `${data.job}`}</Job>
      {!isMyProfile && (
        <div className="d-flex justify-content-center">
          <UnfollowButton className="me-3">Follow</UnfollowButton>
          <OptionButton>
            <BsThreeDots />
          </OptionButton>
        </div>
      )}
      <div className="row mt-4 position-relative justify-content-center">
        {(data.facebook || data.twitter || data.instagram || data.email) && (
          <>
            <div className="col-md-6 col-sm-12">
              <div className="d-flex justify-content-center justify-content-sm-center justify-content-md-end">
                {data.facebook && (
                  <InformationIcon target="_blank" href="/">
                    <BsFacebook size={32} />
                  </InformationIcon>
                )}
                {data.twitter && (
                  <InformationIcon target="_blank" href="/" className="ms-3">
                    <BsTwitter size={32} />
                  </InformationIcon>
                )}
                {data.instagram && (
                  <InformationIcon target="_blank" href="/" className="ms-3">
                    <BsInstagram size={32} />
                  </InformationIcon>
                )}
                {data.email && (
                  <InformationIcon
                    target="_blank"
                    href={`mailto:${data.email}`}
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
        <div className="col-md-6 col-sm-12 align-content-md-center">
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
