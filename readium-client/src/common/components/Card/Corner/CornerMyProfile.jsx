/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useOutsideClickAlerter from "../../../hooks/useOutsideClickAlerter";
import { useDeletePost } from "../../../api/postQuery";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollection } from "../../../../assets/icons/added_collection.svg";
import { ReactComponent as More } from "../../../../assets/icons/more.svg";

const Layout = styled.div`
  width: 82px;
  height: 34px;
  position: relative;
  > svg:first-child {
    font-size: 34px;
    top: 0;
    left: 0;
  }
  > svg:nth-child(2) {
    font-size: 34px;
    top: 0;
    left: 0;
  }
  > div > svg {
    font-size: 32px;
    top: 0;
    right: 0;
    &:hover {
      transform: scale(1.1);
    }
    &.active {
      transform: scale(1.1);
    }
  }
  svg {
    position: absolute;
    transition: all 0.3s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      transition: all 0.3s;
    }
  }
`;

const MoreBtnContainer = styled.div`
  position: relative;
`;

const MoreContent = styled.div`
  background-color: ${({ theme }) => theme.colors.MoreBackground};
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.colors.MoreBlack};
  width: 135px;
  padding: 0;
  position: absolute;
  top: 34px;
  left: -1px;
  z-index: 9;
  p {
    margin: 0;
    padding: 8px 0;
    font-family: "Raleway";
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    color: ${({ theme }) => theme.colors.MoreBlack};
    transition: all 0.15s;
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.MoreBackground};
      background-color: ${({ theme }) => theme.colors.MoreBlack};
      transition: all 0.15s;
    }
  }
  &.show {
    opacity: 1;
    transition: all 0.3s;
  }
  &.hide {
    pointer-events: none;
    opacity: 0;
    transition: all 0.3s;
  }
  @media (max-width: 650px) {
    width: 110px;
    left: 11px;
  }
`;

export default function CornerMyProfile({ postId }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const moreBtnContainer = useRef(null);
  const deletePost = useDeletePost(postId);

  // HANDLE ADD COLLECTION
  const handleAddCollection = () => {
    if (isAdded) {
      setIsAdded(false);
    } else {
      setIsAdded(true);
    }
  };

  // HANDLE MORE OPTIONS
  const handleMore = () => {
    if (isMore) {
      setIsMore(false);
    } else {
      setIsMore(true);
    }
  };
  useOutsideClickAlerter(moreBtnContainer, () => {
    setIsMore(false);
  });

  // HANDLE EDIT POST
  const handleEditPost = () => {
    // do something
  };

  // HANDLE DELETE POST
  const handleDeletePost = () => {
    deletePost.mutate(postId); // done delete
    // refetch card list on profile here...
  };

  return (
    <Layout>
      <AddCollection
        className={isAdded ? "d-none" : "d-block"}
        onClick={handleAddCollection}
      />

      <AddedCollection
        className={isAdded ? "d-block" : "d-none"}
        onClick={handleAddCollection}
      />

      <MoreBtnContainer ref={moreBtnContainer}>
        <More className={isMore ? "active" : ""} onClick={handleMore} />
        <MoreContent className={isMore ? "show" : "hide"}>
          <p onClick={handleEditPost}>Edit post</p>
          <p onClick={handleDeletePost}>Delete post</p>
        </MoreContent>
      </MoreBtnContainer>
    </Layout>
  );
}

CornerMyProfile.propTypes = {
  postId: PropTypes.string,
};
CornerMyProfile.defaultProps = {
  postId: "",
};
