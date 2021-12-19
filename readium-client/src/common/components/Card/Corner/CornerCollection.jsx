import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollection } from "../../../../assets/icons/added_collection.svg";
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

export default function CornerCollection() {
  // HANDLE ADD COLLECTION
  const [isAdded, setIsAdded] = useState(false);
  const handleAddCollection = () => {
    if (isAdded) {
      setIsAdded(false);
    } else {
      setIsAdded(true);
    }
  };

  // HANDLE DELETE
  const handleDelete = () => {
    // do something
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
      <Delete onClick={handleDelete} />
    </Layout>
  );
}
