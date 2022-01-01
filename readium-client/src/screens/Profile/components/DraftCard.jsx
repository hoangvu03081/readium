import React from "react";
import styled from "styled-components";
import { AiOutlineFieldTime, AiOutlineRead } from "react-icons/ai";
import StyledLink from "../../../common/components/StyledLink";

const StyledDraftCard = styled.div`
  min-width: 280px;
  height: 162px;
  width: 85%;
  border: solid 2px ${({ theme }) => theme.colors.lightGrey};
  display: relative;
  padding-left: 33px;
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

export default function DraftCard({ id, title = "", duration = 0 }) {
  return (
    <StyledDraftCard>
      <StyledLink to={`/edit/draft/${id}`}>
        <DraftTitle>{title}</DraftTitle>
      </StyledLink>
      <DraftDescription>
        <AiOutlineFieldTime size={26} className="me-2" />
        Last edited: 4 days ago
      </DraftDescription>
      <DraftDescription>
        <AiOutlineRead size={26} className="me-2 mt-2" />
        {duration} mins read
      </DraftDescription>
    </StyledDraftCard>
  );
}
