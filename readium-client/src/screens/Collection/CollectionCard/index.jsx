/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
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
    width: 270px;
    padding: 20px;
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
  width: calc(100% - 71px);
  margin: 0;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 24px;
`;
const Buttons = styled.div`
  width: 71px;
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

const BottomDesktop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  @media (max-width: 600px) {
    display: none;
  }
`;
const BottomMobile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  @media (min-width: 601px) {
    display: none;
  }
`;
const Image = styled.img`
  object-fit: cover;
  width: 75px;
  height: 75px;
  border-radius: 8px;
  @media (max-width: 600px) {
    width: 65px;
    height: 65px;
  }
`;
const MoreImage = styled.div`
  width: 75px;
  height: 75px;
  position: relative;
  @media (max-width: 600px) {
    width: 65px;
    height: 65px;
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: #00000040;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  div {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: #ffffffd9;
  }
`;

export default function CollectionCard({ collection }) {
  const renderBottomDesktop = () => {
    if (collection.posts.length !== 0) {
      return (
        <>
          {collection.posts.map((item, index) => {
            if (index < 4) {
              return (
                <Image key={index} src={item.coverImage} alt="Cover Image" />
              );
            }
            if (index === 4) {
              return (
                <MoreImage key={index}>
                  <Image src={item.coverImage} alt="Cover Image" />
                  <Overlay>
                    <div />
                    <div />
                    <div />
                  </Overlay>
                </MoreImage>
              );
            }
          })}
        </>
      );
    }
    return <>This collection is empty.</>;
  };

  const renderBottomMobile = () => {
    if (collection.posts.length !== 0) {
      return (
        <>
          {collection.posts.map((item, index) => {
            if (index < 2) {
              return (
                <Image key={index} src={item.coverImage} alt="Cover Image" />
              );
            }
            if (index === 2) {
              return (
                <MoreImage key={index}>
                  <Image src={item.coverImage} alt="Cover Image" />
                  <Overlay>
                    <div />
                    <div />
                    <div />
                  </Overlay>
                </MoreImage>
              );
            }
          })}
        </>
      );
    }
    return <>This collection is empty.</>;
  };

  return (
    <Layout>
      <Top>
        <CollectionName>{collection.name}</CollectionName>
        <Buttons>
          <EditName />
          <Trash />
        </Buttons>
      </Top>

      <BottomDesktop>{renderBottomDesktop()}</BottomDesktop>
      <BottomMobile>{renderBottomMobile()}</BottomMobile>
    </Layout>
  );
}

CollectionCard.propTypes = {
  collection: PropTypes.objectOf(PropTypes.any).isRequired,
};
