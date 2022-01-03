/* eslint-disable react/no-array-index-key */
import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  useAddCollection,
  useGetAllCollections,
} from "../../api/collectionQuery";
import useOutsideClickAlerter from "../../hooks/useOutsideClickAlerter";
import PuffLoader from "../PuffLoader";
import DownArrow from "./DownArrow";

const Layout = styled.div`
  width: 180px;
  height: fit-content;
  position: absolute;
  top: 0;
  left: -185px;
  z-index: 9;
  &.show {
    opacity: 1;
    transition: all 0.25s ease;
  }
  &.hide {
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease;
  }
`;

const CollectionContainer = styled.div`
  width: 180px;
  height: auto;
  min-height: 31px;
  max-height: 128px;
  overflow-y: scroll;
  border: 2px solid black;
  background-color: white;
  z-index: 9;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Collection = styled.p`
  margin: 0;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;

  padding: 5px 10px;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.3s;
  }
`;

export default function ModalCollection({
  postId,
  trigger,
  handleTrigger,
  handleCloseTrigger,
}) {
  const modalCollection = useRef(null);
  const getAllCollections = useGetAllCollections();
  const addCollection = useAddCollection();
  useOutsideClickAlerter(modalCollection, () => {
    handleCloseTrigger();
  });

  if (getAllCollections.isFetching) {
    return <PuffLoader />;
  }
  if (!getAllCollections.data || getAllCollections.isError) {
    return <Layout />;
  }
  const allCollections = getAllCollections.data.data;

  const handleAddCollection = (event) => {
    addCollection.mutate({
      postId,
      collectionName: event.target.innerHTML,
    });
    handleTrigger();
  };

  return (
    <Layout ref={modalCollection} className={trigger ? "show" : "hide"}>
      <CollectionContainer>
        {allCollections.map((item, index) => (
          <Collection key={index} onClick={handleAddCollection}>
            {item.name}
          </Collection>
        ))}
      </CollectionContainer>
      <DownArrow className={allCollections.length > 4 ? "d-block" : "d-none"} />
    </Layout>
  );
}

ModalCollection.propTypes = {
  postId: PropTypes.string.isRequired,
  trigger: PropTypes.bool.isRequired,
  handleTrigger: PropTypes.func.isRequired,
  handleCloseTrigger: PropTypes.func.isRequired,
};
