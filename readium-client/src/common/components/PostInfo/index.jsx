import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as AddCollection } from "../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollection } from "../../../assets/icons/added_collection.svg";
import { ReactComponent as Report } from "../../../assets/icons/report.svg";

// STYLES -----------------------------------------------------------------------------
const Layout = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div``;
const Avatar = styled.img`
  display: inline-block;
  height: 34px;
  width: 34px;
  border-radius: 50%;
`;
const Info = styled.div`
  display: inline-block;
`;
const Author = styled.p`
  margin: 0;
`;
const Time = styled.p`
  margin: 0;
`;
const FollowBtn = styled.button`
  color: black;
`;

const Right = styled.div``;
// -------------------------------------------------------------------------------------

export default function PostInfo({
  author,
  publishedDate,
  duration,
  isPreview,
}) {
  return (
    <Layout>
      <Left>
        <Avatar src={author.avatar} />
        <Info>
          <Author>{author.displayName}</Author>
          <Time>
            {publishedDate}.{duration}
          </Time>
        </Info>
        <FollowBtn>Follow</FollowBtn>
      </Left>

      <Right className={isPreview ? "d-none" : "d-block"}>
        <AddCollection />
        <AddedCollection />
        <Report />
      </Right>
    </Layout>
  );
}

PostInfo.propTypes = {
  author: PropTypes.objectOf(PropTypes.string).isRequired,
  publishedDate: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  isPreview: PropTypes.bool.isRequired,
};
