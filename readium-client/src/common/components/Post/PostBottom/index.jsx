/* eslint-disable react/no-array-index-key */
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import TagBtn from "../../Buttons/TagBtn";
import ModalCollection from "../../ModalCollections";
import StyledLink from "../../StyledLink";
import { ReactComponent as Love } from "../../../../assets/icons/love.svg";
import { ReactComponent as Loved } from "../../../../assets/icons/loved.svg";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as Report } from "../../../../assets/icons/report.svg";
import { Layout, Left, Right, RightLeft, RightRight } from "./styles";

export default function PostBottom({ postId, tags, type, isMyself }) {
  const [isLoved, setIsLoved] = useState(false);
  const modalCollectionRef = useRef(null);
  const [modalCollection, setModalCollection] = useState(false);

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

  // HANDLE LOVE POST
  const handleLovePost = () => {
    if (isLoved) {
      setIsLoved(false);
    } else {
      setIsLoved(true);
    }
  };

  return (
    <Layout>
      <Left className={type === "preview" ? "w-100" : ""}>
        {tags.map((item, index) => (
          <StyledLink key={index} to={`search?q=${encodeURIComponent(item)}`}>
            <TagBtn>{item}</TagBtn>
          </StyledLink>
        ))}
      </Left>
      <Right className={type === "preview" ? "d-none w-0" : "d-flex"}>
        <RightLeft ref={modalCollectionRef}>
          <Love
            className={isLoved ? "d-none" : "d-block"}
            onClick={handleLovePost}
          />
          <Loved
            className={isLoved ? "d-block" : "d-none"}
            onClick={handleLovePost}
          />
          <AddCollection onClick={handleModalCollection} />
          <ModalCollection
            postId={postId}
            trigger={modalCollection}
            handleTrigger={handleModalCollection}
            handleCloseTrigger={handleCloseModalCollection}
            modalCollectionRef={modalCollectionRef}
          />
        </RightLeft>
        <RightRight className={isMyself ? "d-none" : "d-block"}>
          <Report />
        </RightRight>
      </Right>
    </Layout>
  );
}

PostBottom.propTypes = {
  postId: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string.isRequired,
  isMyself: PropTypes.bool.isRequired,
};
PostBottom.defaultProps = {
  tags: [],
};
