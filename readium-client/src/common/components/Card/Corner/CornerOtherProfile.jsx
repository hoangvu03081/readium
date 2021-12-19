import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollection } from "../../../../assets/icons/added_collection.svg";

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

export default function CornerOtherProfile() {
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
      <AddCollection
        className={isAdded ? "d-none" : "d-block"}
        onClick={handleAddCollection}
      />
      <AddedCollection
        className={isAdded ? "d-block" : "d-none"}
        onClick={handleAddCollection}
      />
    </Layout>
  );
}
