import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ModalCollection from "../../ModalCollections";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as Dismiss } from "../../../../assets/icons/dismiss.svg";

const Layout = styled.div`
  width: 80px;
  height: 34px;
  position: relative;
  svg:first-child {
    font-size: 34px;
    top: 0;
    left: 0;
  }
  svg:nth-child(2) {
    font-size: 32px;
    top: 0;
    left: 0;
  }
  svg:nth-child(3) {
    font-size: 32px;
    top: 0;
    right: 0;
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

export default function CornerGlobal({ postId }) {
  // HANDLE ADD COLLECTION
  const modalCollectionRef = useRef(null);
  const [modalCollection, setModalCollection] = useState(false);
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

  // HANDLE DISMISS
  const handleDismiss = () => {
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
      <Dismiss onClick={handleDismiss} />
    </Layout>
  );
}

CornerGlobal.propTypes = {
  postId: PropTypes.string,
};
CornerGlobal.defaultProps = {
  postId: "",
};
