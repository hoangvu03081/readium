/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CollectionCard from "../CollectionCard";

const Layout = styled.div``;

export default function CollectionCardList({ data }) {
  return (
    <Layout>
      {data.map((item, index) => (
        <CollectionCard key={index} collection={item} />
      ))}
    </Layout>
  );
}

CollectionCardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
