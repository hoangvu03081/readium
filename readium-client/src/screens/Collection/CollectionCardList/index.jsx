/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CollectionCard from "../CollectionCard";

const Layout = styled.div``;

export default function CollectionCardList({
  data,
  openModalRename,
  setRenameCollectionId,
  setDeleteCollectionId,
}) {
  return (
    <Layout>
      {data.map((item, index) => (
        <CollectionCard
          key={index}
          collection={item}
          openModalRename={openModalRename}
          setRenameCollectionId={setRenameCollectionId}
          setDeleteCollectionId={setDeleteCollectionId}
        />
      ))}
    </Layout>
  );
}

CollectionCardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModalRename: PropTypes.func.isRequired,
  setRenameCollectionId: PropTypes.func.isRequired,
  setDeleteCollectionId: PropTypes.func.isRequired,
};
