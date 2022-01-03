import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDeletePostFromCollection } from "../../../api/collectionQuery";
import ModalCollection from "../../ModalCollections";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as Delete } from "../../../../assets/icons/delete.svg";

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

export default function CornerCollection({ postId }) {
  const modalCollectionRef = useRef(null);
  const [modalCollection, setModalCollection] = useState(false);
  // const deletePostFromCollection = useDeletePostFromCollection();

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
  const handleDelete = () => {
    // do something
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
    </Layout>
  );
}

CornerCollection.propTypes = {
  postId: PropTypes.string,
};
CornerCollection.defaultProps = {
  postId: "",
};
