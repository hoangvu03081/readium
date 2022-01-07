/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import ModalCollection from "../../ModalCollections";
import useOutsideClickAlerter from "../../../hooks/useOutsideClickAlerter";
import { useDeletePost, useEditPost } from "../../../api/postQuery";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as More } from "../../../../assets/icons/more.svg";
import ModalConfirm from "../../ModalConfirm";

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

export default function CornerMyProfile({ postId, refetchList }) {
  const history = useHistory();
  const modalCollectionRef = useRef(null);
  const [modalCollection, setModalCollection] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const moreBtnContainer = useRef(null);
  const editPost = useEditPost();
  const deletePost = useDeletePost();
  const [modalOpen, setModalOpen] = useState(false);

  // HANDLE ADD COLLECTION
  const handleModalCollection = () => {
    if (modalCollection) {
      setModalCollection(false);
    } else {
      setModalCollection(true);
    }
  };
  const handleCloseModalCollection = () => {
    setModalCollection(false);
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
    editPost.mutate(postId, {
      onSuccess: ({ data }) => {
        history.push(`/edit/draft/${data.id}`);
      },
    });
  };

  // HANDLE DELETE POST
  const deleteAndRefetch = () => {
    deletePost.mutate(postId);
    refetchList();
  };
  const handleDeletePost = () => {
    setIsMore(false);
    if (!postId) {
      alert("An error occurred while deleting post.");
    }
    setModalOpen(true);
  };

  return (
    <Layout ref={modalCollectionRef}>
      <AddCollection onClick={handleModalCollection} />
      <ModalCollection
        postId={postId}
        trigger={modalCollection}
        handleTrigger={handleModalCollection}
        handleCloseTrigger={handleCloseModalCollection}
        modalCollectionRef={modalCollectionRef}
      />

      <MoreBtnContainer ref={moreBtnContainer}>
        <More className={isMore ? "active" : ""} onClick={handleMore} />
        <MoreContent className={isMore ? "show" : "hide"}>
          <p onClick={handleEditPost}>Edit post</p>
          <p onClick={handleDeletePost}>Delete post</p>
        </MoreContent>
      </MoreBtnContainer>

      <ModalConfirm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        mutateFn={deletePost}
        handleConfirm={deleteAndRefetch}
      />
    </Layout>
  );
}

CornerMyProfile.propTypes = {
  postId: PropTypes.string.isRequired,
  refetchList: PropTypes.func.isRequired,
};
