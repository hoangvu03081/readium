import React, { useState } from "react";
import PropTypes from "prop-types";
import TagBtn from "../../Buttons/TagBtn";
import { ReactComponent as Love } from "../../../../assets/icons/love.svg";
import { ReactComponent as Loved } from "../../../../assets/icons/loved.svg";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollection } from "../../../../assets/icons/added_collection.svg";
import { ReactComponent as Report } from "../../../../assets/icons/report.svg";
import { Layout, Left, Right, RightLeft, RightRight } from "./styles";

export default function PostBottom({ tags, type, isMyself }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoved, setIsLoved] = useState(false);

  // HANDLE ADD COLLECTION
  const handleAddCollection = () => {
    if (isAdded) {
      setIsAdded(false);
    } else {
      setIsAdded(true);
    }
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
          // eslint-disable-next-line react/no-array-index-key
          <TagBtn key={index}>{item}</TagBtn>
        ))}
      </Left>
      <Right className={type === "preview" ? "d-none w-0" : "d-flex"}>
        <RightLeft>
          <Love
            className={isLoved ? "d-none" : "d-block"}
            onClick={handleLovePost}
          />
          <Loved
            className={isLoved ? "d-block" : "d-none"}
            onClick={handleLovePost}
          />
          <AddCollection
            className={isAdded ? "d-none" : "d-block"}
            onClick={handleAddCollection}
          />
          <AddedCollection
            className={isAdded ? "d-block" : "d-none"}
            onClick={handleAddCollection}
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
  tags: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string.isRequired,
  isMyself: PropTypes.bool.isRequired,
};
PostBottom.defaultProps = {
  tags: [],
};
