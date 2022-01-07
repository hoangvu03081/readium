import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Modal from "react-modal";
import { PuffLoader } from "react-spinners";
import { RiDeleteBin6Line, RiCloseFill } from "react-icons/ri";
import useOutsideClickAlerter from "../../hooks/useOutsideClickAlerter";

const ModalDeleteButton = styled.button`
  border: 1px;
  height: 40px;
  width: 40px;
  border-radius: 90%;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.danger};
  color: white;
  transition: all 0.075s ease-in;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.danger};
    background-color: white;
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const ModalReturnButton = styled.button`
  border: 1px;
  height: 40px;
  width: 40px;
  border-radius: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.grey};
  color: white;
  transition: all 0.075s ease-in;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
    background-color: white;
    color: ${({ theme }) => theme.colors.grey};
  }
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
  line-height: 1.4;
`;

const CenterAll = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const customStyles = {
  overlay: {
    backgroundColor: "#00000040",
    zIndex: "100",
  },
  content: {
    width: "400px",
    height: "250px",
    top: "50%",
    left: "50%",
    zIndex: "1000",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function ModalConfirm({
  modalOpen,
  setModalOpen,
  mutateFn,
  handleConfirm,
}) {
  const modalRef = useRef();

  useOutsideClickAlerter(modalRef, () => setModalOpen(false));

  useEffect(() => {
    setModalOpen(false);
  }, [mutateFn.data, mutateFn.isError]);

  return (
    <Modal isOpen={modalOpen} style={customStyles}>
      <ModalContent ref={modalRef}>
        {mutateFn.isLoading ? (
          <CenterAll>
            <PuffLoader />
          </CenterAll>
        ) : (
          <>
            <h2>Are you sure you want to delete?</h2>
            <span>This process cannot be undone.</span>
            <div className="mt-4 d-flex justify-content-around w-100 px-5">
              <ModalReturnButton onClick={() => setModalOpen(false)}>
                <RiCloseFill size={23} />
              </ModalReturnButton>
              <ModalDeleteButton onClick={() => handleConfirm()}>
                <RiDeleteBin6Line size={23} />
              </ModalDeleteButton>
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

ModalConfirm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  mutateFn: PropTypes.objectOf(PropTypes.any).isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
