import React from "react";
import { PuffLoader } from "react-spinners";
import { useGetMyDraft } from "../../../common/api/draftQuery";
import DraftCard from "./DraftCard";

export default function DraftList() {
  const { data, error } = useGetMyDraft();
  if (error) {
    return <></>;
  }
  if (data) {
    return (
      <>
        {data.drafts.map(({ id, title, duration }) => (
          <DraftCard id={id} title={title} duration={duration} key={id} />
        ))}
      </>
    );
  }
  return <PuffLoader />;
}
