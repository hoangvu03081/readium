/* eslint-disable react/button-has-type */
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useAuth } from "../../common/hooks/useAuth";
import useOutsideClickAlerter from "../../common/hooks/useOutsideClickAlerter";
import {
  useGetAllCollections,
  useCreateCollection,
} from "../../common/api/collectionQuery";
import PuffLoader from "../../common/components/PuffLoader";
import CollectionCardList from "./CollectionCardList";

const Layout = styled.div`
  margin: 140px auto 0;
  padding-bottom: 100px;
  width: 60%;
  @media (min-width: 1440px) {
    width: 850px;
  }
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 90%;
  }
  @media (max-width: 650px) {
    width: 92%;
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  @media (max-width: 575px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
`;
const Title = styled.p`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 36px;
  margin: 0;
  @media (max-width: 575px) {
    width: 100%;
    text-align: center;
  }
  @media (max-width: 400px) {
    font-size: 32px;
  }
`;
const AddCollectionBtn = styled.button`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 16px;
  padding: 10px 15px;
  border: 2px solid black;
  border-radius: 44px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
  i {
    font-size: 20px;
    margin-right: 8px;
  }
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.25s;
  }
  @media (max-width: 575px) {
    width: 100%;
  }
`;

const ModalContainer = styled.div``;
const customStyles = {
  overlay: {
    backgroundColor: "#00000040",
    zIndex: "100",
  },
  content: {
    width: "300px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "5px",
  },
};
const ModalTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;
const ModalTitle = styled.p`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 20px;
  margin: 0;
`;
const ModalCloseBtn = styled.button`
  background-color: white;
  border: none;
  font-size: 20px;
  transition: all 0.25s;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: all 0.25s;
  }
`;
const ModalBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 13px;
`;
const ModalInput = styled.input`
  width: 100%;
  border: 2px solid black;
  padding: 5px 10px;
  font-family: "Lato";
  font-weight: 500;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;
const ModalSubmit = styled.button`
  width: 100%;
  background-color: #e53170;
  color: white;
  border: none;
  padding: 5px 10px;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;
const ModalNote = styled.p`
  margin: 5px auto 0;
  font-family: "Raleway";
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: red;
`;

Modal.setAppElement("#root");

export default function Collection() {
  const { auth } = useAuth();
  const getAllCollections = useGetAllCollections(auth);
  const modalContainer = useRef(null);
  const modalInput = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalNote, setModalNote] = useState(false);
  const createCollection = useCreateCollection();
  useOutsideClickAlerter(modalContainer, () => {
    setOpenModal(false);
    setModalNote(false);
  });

  if (getAllCollections.isFetching) {
    return <PuffLoader />;
  }
  if (!getAllCollections.data || getAllCollections.isError) {
    return <PuffLoader />;
  }

  const handleCreateCollection = () => {
    const collectionName = modalInput.current.value;
    if (collectionName) {
      createCollection.mutate(collectionName);
      setOpenModal(false);
      setTimeout(() => {
        getAllCollections.refetch();
      }, 1000);
    } else {
      setModalNote(true);
    }
  };

  return (
    <Layout className="container">
      <Top>
        <Title>Your collections</Title>
        <AddCollectionBtn
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <i className="ionicons ion-plus-round" /> Add new collection
        </AddCollectionBtn>
      </Top>

      <CollectionCardList data={getAllCollections.data.data} />

      <Modal isOpen={openModal} style={customStyles}>
        <ModalContainer ref={modalContainer}>
          <ModalTop>
            <ModalTitle>Collection name</ModalTitle>
            <ModalCloseBtn
              onClick={() => {
                setOpenModal(false);
                setModalNote(false);
              }}
            >
              <i className="ionicons ion-close-round" />
            </ModalCloseBtn>
          </ModalTop>
          <ModalBottom>
            <ModalInput
              type="text"
              maxLength="25"
              placeholder="1-25 characters"
              ref={modalInput}
            />
            <ModalSubmit onClick={handleCreateCollection}>Create</ModalSubmit>
          </ModalBottom>
          <ModalNote className={modalNote ? "d-block" : "d-none"}>
            Please type in collection name
          </ModalNote>
        </ModalContainer>
      </Modal>
    </Layout>
  );
}
