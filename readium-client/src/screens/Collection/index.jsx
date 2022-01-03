/* eslint-disable react/button-has-type */
import React, { useRef, useState, useEffect } from "react";
import Modal from "react-modal";
import { useAuth } from "../../common/hooks/useAuth";
import useOutsideClickAlerter from "../../common/hooks/useOutsideClickAlerter";
import {
  useGetAllCollections,
  useCreateCollection,
  useRenameCollection,
  useDeleteCollection,
} from "../../common/api/collectionQuery";
import PuffLoader from "../../common/components/PuffLoader";
import CollectionCardList from "./CollectionCardList";
import {
  AddCollectionBtn,
  Layout,
  ModalBottom,
  ModalCloseBtn,
  ModalContainer,
  ModalInput,
  ModalNote,
  ModalSubmit,
  ModalTitle,
  ModalTop,
  Title,
  Top,
} from "./styles";

Modal.setAppElement("#root");
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

export default function Collection() {
  const { auth } = useAuth();
  const getAllCollections = useGetAllCollections(auth);
  const createCollection = useCreateCollection();
  const renameCollection = useRenameCollection();
  const deleteCollection = useDeleteCollection();
  const modalContainer = useRef(null);
  const modalInput = useRef(null);
  const modalInputRename = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalRename, setOpenModalRename] = useState(false);
  const [renameCollectionId, setRenameCollectionId] = useState("");
  const [deleteCollectionId, setDeleteCollectionId] = useState("");
  const [modalNote, setModalNote] = useState(false);
  useOutsideClickAlerter(modalContainer, () => {
    setOpenModal(false);
    setModalNote(false);
  });
  const refetchCollections = () => {
    setTimeout(() => {
      getAllCollections.refetch();
    }, 500);
  };
  useEffect(() => {
    getAllCollections.refetch();
  }, []);

  // HANDLE DELETE COLLECTION
  useEffect(() => {
    if (!deleteCollectionId) {
      return;
    }
    deleteCollection.mutate(deleteCollectionId, {
      onSuccess: () => {
        setDeleteCollectionId("");
      },
    });
    refetchCollections();
  }, [deleteCollectionId]);

  // CHECKING
  if (getAllCollections.isFetching) {
    return <PuffLoader />;
  }
  if (!getAllCollections.data || getAllCollections.isError) {
    return <div />;
  }

  // HANDLE CREATE & RENAME COLLECTION
  const handleCreateCollection = () => {
    const collectionName = modalInput.current.value;
    if (collectionName) {
      createCollection.mutate(collectionName);
      setOpenModal(false);
      refetchCollections();
    } else {
      setModalNote(true);
    }
  };
  const handleRenameCollection = () => {
    const newName = modalInputRename.current.value;
    if (!renameCollectionId) {
      alert("An error occurred while renaming collection.");
      return;
    }
    if (newName) {
      renameCollection.mutate(
        { collectionId: renameCollectionId, newName },
        {
          onSuccess: () => {
            setRenameCollectionId("");
          },
        }
      );
      setOpenModalRename(false);
      refetchCollections();
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

      <CollectionCardList
        data={getAllCollections.data.data}
        openModalRename={() => {
          setOpenModalRename(true);
        }}
        setRenameCollectionId={setRenameCollectionId}
        setDeleteCollectionId={setDeleteCollectionId}
      />

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
              autoFocus
            />
            <ModalSubmit onClick={handleCreateCollection}>Create</ModalSubmit>
          </ModalBottom>
          <ModalNote className={modalNote ? "d-block" : "d-none"}>
            Please type in collection name
          </ModalNote>
        </ModalContainer>
      </Modal>

      <Modal isOpen={openModalRename} style={customStyles}>
        <ModalContainer ref={modalContainer}>
          <ModalTop>
            <ModalTitle>Rename collection</ModalTitle>
            <ModalCloseBtn
              onClick={() => {
                setOpenModalRename(false);
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
              ref={modalInputRename}
              autoFocus
            />
            <ModalSubmit onClick={handleRenameCollection}>Submit</ModalSubmit>
          </ModalBottom>
          <ModalNote className={modalNote ? "d-block" : "d-none"}>
            Please type in collection name
          </ModalNote>
        </ModalContainer>
      </Modal>
    </Layout>
  );
}
