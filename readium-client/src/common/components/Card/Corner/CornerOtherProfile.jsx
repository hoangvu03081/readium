import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ModalCollection from "../../ModalCollections";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";

const Layout = styled.div`
  width: 34px;
  height: 34px;
  position: relative;
  svg {
    font-size: 34px;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      transition: all 0.3s;
    }
  }
`;

export default function CornerOtherProfile({ postId }) {
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
    </Layout>
  );
}

CornerOtherProfile.propTypes = {
  postId: PropTypes.string,
};
CornerOtherProfile.defaultProps = {
  postId: "",
};
