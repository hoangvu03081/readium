import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as AddCollection } from "../../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollection } from "../../../../assets/icons/added_collection.svg";
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

export default function CornerGlobal() {
  // HANDLE ADD COLLECTION
  const [isAdded, setIsAdded] = useState(false);
  const handleAddCollection = () => {
    if (isAdded) {
      setIsAdded(false);
    } else {
      setIsAdded(true);
    }
  };

  // HANDLE DISMISS
  const handleDismiss = () => {
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
      <Dismiss onClick={handleDismiss} />
    </Layout>
  );
}
