import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as AddCollection } from "../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollection } from "../../../assets/icons/added_collection.svg";
import { ReactComponent as Report } from "../../../assets/icons/report.svg";

// STYLES -----------------------------------------------------------------------------
const Layout = styled.div`
  margin: 0 auto 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Avatar = styled.img`
  display: inline-block;
  height: 34px;
  width: 34px;
  border-radius: 50%;
  margin-right: 11px;
  &:hover {
    cursor: pointer;
  }
`;
const Info = styled.div`
  display: inline-block;
  margin-right: 15px;
`;
const Author = styled.p`
  margin: 0;
  font-family: "Nunito";
  font-weight: bold;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;
const Time = styled.p`
  margin: 0;
  font-family: "Lato";
  font-size: 12px;
  color: #888888;
`;
const FollowBtn = styled.button`
  font-family: "Lato";
  font-size: 15px;
  border-radius: 16px;
  border: 1px solid black;
  color: black;
  background-color: white;
  padding: 4px 12px;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.3s;
  }
`;

const Right = styled.div`
  width: 80px;
  height: 32px;
  position: relative;
  svg:first-child {
    font-size: 32px;
    top: 0;
    left: 0;
  }
  svg:nth-child(2) {
    font-size: 32px;
    top: 0;
    left: 0;
  }
  svg:nth-child(3) {
    font-size: 30px;
    top: 0;
    right: 0;
  }
  svg {
    position: absolute;
    transition: all 0.25s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      transition: all 0.25s;
    }
  }
`;
// -------------------------------------------------------------------------------------

export default function PostInfo({
  author,
  publishedDate,
  duration,
  isPreview,
}) {
  // HANDLE ADD COLLECTION
  const [isAdded, setIsAdded] = useState(false);
  const handleAddCollection = () => {
    if (isAdded) {
      setIsAdded(false);
    } else {
      setIsAdded(true);
    }
  };

  return (
    <Layout>
      <Left>
        <Avatar src={author.avatar} />
        <Info>
          <Author>{author.displayName}</Author>
          <Time>
            {publishedDate}
            {` · `}
            {duration > 1 ? `${duration} mins read` : `${duration} min read`}
          </Time>
        </Info>
        <FollowBtn>Follow</FollowBtn>
      </Left>

      <Right className={isPreview ? "d-none" : "d-block"}>
        <AddCollection
          className={isAdded ? "d-none" : "d-block"}
          onClick={handleAddCollection}
        />
        <AddedCollection
          className={isAdded ? "d-block" : "d-none"}
          onClick={handleAddCollection}
        />
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
