import React from "react";
import { PuffLoader } from "react-spinners";
import styled from "styled-components";
import { useGetMyDraft } from "../../../common/api/draftQuery";
import useScrollBottomDetect from "../../../common/hooks/useScrollBottomDetect";
import DraftCard from "./DraftCard";

const DraftListLayout = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function DraftList() {
  const { data, error, fetchNextPage, isFetchingNextPage } = useGetMyDraft();
  useScrollBottomDetect(fetchNextPage, 100);

  if (error) {
    return <></>;
  }
  if (data) {
    return (
      <DraftListLayout>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.drafts.map(({ id, title, duration, lastEdit }) => (
              <DraftCard
                id={id}
                title={title === "" ? "Untitled" : title}
                duration={duration}
                key={id}
                lastEdit={lastEdit}
              />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <PuffLoader />}
      </DraftListLayout>
    );
  }
  return <PuffLoader />;
}
