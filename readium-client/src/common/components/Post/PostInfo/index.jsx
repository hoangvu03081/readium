import React, { useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollection } from "../../../../assets/icons/added_collection.svg";
import { ReactComponent as Report } from "../../../../assets/icons/report.svg";
import {
  AdditionLeft,
  AdditionRight,
  AdditionRow,
  Author,
  Avatar,
  FollowBtn,
  Info,
  Layout,
  Left,
  Right,
  Time,
} from "./styles";

export default function PostInfo({ author, publishedDate, duration, type }) {
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

      <Right className={type === "preview" ? "d-none" : "d-block"}>
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

      <AdditionRow>
        <AdditionLeft>Follow</AdditionLeft>
        <AdditionRight className={type === "preview" ? "d-none" : "d-block"}>
          <AddCollection
            className={isAdded ? "d-none" : "d-block"}
            onClick={handleAddCollection}
          />
          <AddedCollection
            className={isAdded ? "d-block" : "d-none"}
            onClick={handleAddCollection}
          />
          <Report />
        </AdditionRight>
      </AdditionRow>
    </Layout>
  );
}

PostInfo.propTypes = {
  author: PropTypes.objectOf(PropTypes.any).isRequired,
  publishedDate: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
