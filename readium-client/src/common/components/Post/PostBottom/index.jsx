/* eslint-disable react/no-array-index-key */
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import TagBtn from "../../Buttons/TagBtn";
import ModalCollection from "../../ModalCollections";
import StyledLink from "../../StyledLink";
import OnClickRequireAuth from "../../OnClickRequireAuth";
import { ReactComponent as Love } from "../../../../assets/icons/love.svg";
import { ReactComponent as Loved } from "../../../../assets/icons/loved.svg";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as Report } from "../../../../assets/icons/report.svg";
import { Layout, Left, Right, RightLeft, RightRight } from "./styles";
import { useIsLiked, useLikePost } from "../../../api/likeQuery";
import { useAuth } from "../../../hooks/useAuth";

export default function PostBottom({ postId, tags, type, isMyself }) {
  const { auth } = useAuth();
  const modalCollectionRef = useRef(null);
  const [modalCollection, setModalCollection] = useState(false);
  const likePost = useLikePost();
  const isLiked = useIsLiked(postId, auth);

  if (isLiked.isFetching || isLiked.isError) {
    return <div />;
  }
  const liked = isLiked.data?.data.isLike;

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

  // HANDLE LIKE POST
  const handleLovePost = () => {
    likePost.mutate(postId);
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
          <OnClickRequireAuth>
            <Love
              className={liked ? "d-none" : "d-block"}
              onClick={handleLovePost}
            />
          </OnClickRequireAuth>
          <Loved
            className={liked ? "d-block" : "d-none"}
            onClick={handleLovePost}
          />
          <OnClickRequireAuth>
            <AddCollection onClick={handleModalCollection} />
          </OnClickRequireAuth>
          <ModalCollection
            postId={postId}
            trigger={modalCollection}
            handleTrigger={handleModalCollection}
            handleCloseTrigger={handleCloseModalCollection}
            modalCollectionRef={modalCollectionRef}
          />
        </RightLeft>
        <RightRight className={isMyself ? "d-none" : "d-block"}>
          <OnClickRequireAuth>
            <Report />
          </OnClickRequireAuth>
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
