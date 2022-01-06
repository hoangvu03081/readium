import React, { useMemo, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AiOutlineFieldTime, AiOutlineRead } from "react-icons/ai";
import { RiDeleteBin6Line, RiCloseFill } from "react-icons/ri";
import Modal from "react-modal";
import { PuffLoader } from "react-spinners";
import StyledLink from "../../../common/components/StyledLink";
import { useDeleteDraft } from "../../../common/api/draftQuery";
import useOutsideClickAlerter from "../../../common/hooks/useOutsideClickAlerter";

const StyledDraftCard = styled.div`
  min-width: 280px;
  height: 162px;
  width: 100%;
  border: solid 2px ${({ theme }) => theme.colors.lightGrey};
  position: relative;
  padding-left: 28px;
  margin-bottom: 30px;
`;

const DraftTitle = styled.span`
  font-size: 24px;
  font-weight: bold;
  display: inline-block;
  margin-top: 22px;
  margin-bottom: 23px;
`;

const DraftDescription = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const DeleteDraftButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: none;
  outline: inherit;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

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

function getLastEdit(lastEdit) {
  const editDate = Date.parse(lastEdit);
  const nowDate = Date.now();
  const dif = nowDate - editDate;
  return Math.floor(dif / (1000 * 3600 * 24));
}

export default function DraftCard({ id, title = "", duration = 0, lastEdit }) {
  const lastEditDay = useMemo(() => getLastEdit(lastEdit), [lastEdit]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const deleteDraft = useDeleteDraft();
  const modalRef = useRef();

  useOutsideClickAlerter(modalRef, () => setDeleteModalOpen(false));

  useEffect(() => {
    setDeleteModalOpen(false);
  }, [deleteDraft.data, deleteDraft.isError]);

  return (
    <StyledDraftCard>
      <Modal isOpen={deleteModalOpen} style={customStyles}>
        <ModalContent ref={modalRef}>
          {deleteDraft.isLoading ? (
            <CenterAll>
              <PuffLoader />
            </CenterAll>
          ) : (
            <>
              <h2>Are you sure?</h2>
              <span>Do you really want to delete this draft?</span>
              <span> This process cannot be undone</span>
              <div className="mt-4 d-flex justify-content-around w-100 px-5">
                <ModalReturnButton onClick={() => setDeleteModalOpen(false)}>
                  <RiCloseFill size={23} />
                </ModalReturnButton>
                <ModalDeleteButton onClick={() => deleteDraft.mutate(id)}>
                  <RiDeleteBin6Line size={23} />
                </ModalDeleteButton>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
      <DeleteDraftButton onClick={() => setDeleteModalOpen(true)}>
        <RiDeleteBin6Line size={26} />
      </DeleteDraftButton>
      <StyledLink to={`/edit/draft/${id}`}>
        <DraftTitle>{title}</DraftTitle>
      </StyledLink>
      <DraftDescription>
        <AiOutlineFieldTime size={26} className="me-2" />
        Last edited: {lastEditDay} days ago
      </DraftDescription>
      <DraftDescription>
        <AiOutlineRead size={26} className="me-2 mt-2" />
        {duration} mins read
      </DraftDescription>
    </StyledDraftCard>
  );
}
