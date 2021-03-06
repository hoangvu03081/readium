/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import {
  useAddCollection,
  useGetAllCollections,
} from "../../api/collectionQuery";
import useOutsideClickAlerter from "../../hooks/useOutsideClickAlerter";
import PuffLoader from "../PuffLoader";
import DownArrow from "./DownArrow";

const Layout = styled.div`
  width: 185px;
  height: fit-content;
  position: absolute;
  top: 0;
  left: -190px;
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
  width: 185px;
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
  width: 100%;
  margin: 0;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  padding: 5px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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
  modalCollectionRef,
}) {
  const { auth } = useAuth();
  const getAllCollections = useGetAllCollections(auth);
  const addCollection = useAddCollection();
  useOutsideClickAlerter(modalCollectionRef, () => {
    handleCloseTrigger();
  });

  if (getAllCollections.isFetching) {
    return <PuffLoader />;
  }
  if (!getAllCollections.data || getAllCollections.isError) {
    return <Layout />;
  }
  const allCollections = getAllCollections.data.data;

  const handleAddCollection = (collectionId) => {
    addCollection.mutate({
      postId,
      collectionId,
    });
    handleTrigger();
  };

  return (
    <Layout className={trigger ? "show" : "hide"}>
      <CollectionContainer>
        {allCollections.map((item, index) => (
          <Collection
            key={index}
            onClick={() => {
              handleAddCollection(item.id);
            }}
          >
            {item.name}
          </Collection>
        ))}
      </CollectionContainer>
      <DownArrow length={allCollections.length} />
    </Layout>
  );
}

ModalCollection.propTypes = {
  postId: PropTypes.string.isRequired,
  trigger: PropTypes.bool.isRequired,
  handleTrigger: PropTypes.func.isRequired,
  handleCloseTrigger: PropTypes.func.isRequired,
  modalCollectionRef: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
