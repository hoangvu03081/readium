import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as EditName } from "../../../assets/icons/edit_name.svg";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";

const Layout = styled.div`
  margin: 0 auto 35px;
  padding: 25px 20px;
  width: 500px;
  height: fit-content;
  border: 2px solid black;
  border-radius: 5px;
  @media (max-width: 600px) {
    width: 350px;
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
`;
const CollectionName = styled.p`
  width: 80%;
  margin: 0;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 24px;
`;
const Buttons = styled.div`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  svg {
    transition: all 0.25s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      transition: all 0.25s;
    }
  }
  svg:first-child {
    font-size: 24px;
  }
  svg:nth-child(2) {
    font-size: 32px;
  }
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
const Image = styled.img`
  object-fit: cover;
  width: 70px;
  height: 70px;
  border-radius: 8px;
`;

export default function CollectionCard({ collection }) {
  console.log(collection);
  return (
    <Layout>
      <Top>
        <CollectionName>My Collection</CollectionName>
        <Buttons>
          <EditName />
          <Trash />
        </Buttons>
      </Top>

      <Bottom>
        <Image />
        <Image />
        <Image />
        <Image />
        <Image />
      </Bottom>
    </Layout>
  );
}

CollectionCard.propTypes = {
  collection: PropTypes.objectOf(PropTypes.any).isRequired,
};
