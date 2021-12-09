import React, { useState, useContext, createContext } from "react";
import styled from "styled-components";
import DimOverlay from "../components/DimOverlay";

const ModalArea = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const modalContext = createContext();

export default function useModal(Component) {
  return useContext(modalContext);
}

function initModalProvider() {
  const [modalList, setModalList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseAll = () =>
    setModalList(modalList.map((m) => ({ ...m, isOpen: false }))) &&
    setModalOpen(false);

  const component = () =>
    isModalOpen && (
      <>
        <ModalArea />
        <DimOverlay onClick={handleCloseAll} />
      </>
    );
  const createModal = (Component) => {
    setModalList(modalList.concat({ Component, isOpen: false }));
    const showModal = () =>
      setModalList(
        modalList.map((m) => m === Component && { ...m, isOpen: true })
      ) && setModalOpen(true);
    const hideModal = () =>
      setModalList(
        modalList.map((m) => m === Component && { ...m, isOpen: false })
      ) && setModalOpen(false);

    return { showModal, hideModal };
  };
  return { createModal, component };
}

export function ModalProvider({ children }) {
  const modalProvider = initModalProvider();
  return (
    <modalContext.Provider value={modalProvider.createModal}>
      {children}
      <modalProvider.component />
    </modalContext.Provider>
  );
}
