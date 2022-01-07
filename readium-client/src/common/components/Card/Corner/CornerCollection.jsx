import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDeletePostFromCollection } from "../../../api/collectionQuery";
import ModalCollection from "../../ModalCollections";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as Delete } from "../../../../assets/icons/delete.svg";
import ModalConfirm from "../../ModalConfirm";

const Layout = styled.div`
  width: 82px;
  height: 34px;
  position: relative;
  svg:first-child {
    top: 0;
    left: 0;
  }
  svg:nth-child(2) {
    top: 0;
    left: 0;
  }
  svg:nth-child(3) {
    top: 0;
    right: 0;
  }
  svg {
    font-size: 34px;
    position: absolute;
    transition: all 0.3s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      transition: all 0.3s;
    }
  }
`;

export default function CornerCollection({
  postId,
  collectionId,
  refetchList,
}) {
  const modalCollectionRef = useRef(null);
  const [modalCollection, setModalCollection] = useState(false);
  const deletePostFromCollection = useDeletePostFromCollection();
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

  // HANDLE DELETE
  const deleteAndRefetch = () => {
    deletePostFromCollection.mutate({ postId, collectionId });
    refetchList();
  };
  const handleDelete = () => {
    if (!postId || !collectionId) {
      alert("An error occurred while deleting post from collection.");
      return;
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

      <Delete onClick={handleDelete} />

      <ModalConfirm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        mutateFn={deletePostFromCollection}
        handleConfirm={deleteAndRefetch}
      />
    </Layout>
  );
}

CornerCollection.propTypes = {
  postId: PropTypes.string,
  collectionId: PropTypes.string.isRequired,
  refetchList: PropTypes.func.isRequired,
};
CornerCollection.defaultProps = {
  postId: "",
};
