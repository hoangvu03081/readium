import React from "react";
import { PuffLoader } from "react-spinners";
import { useGetMyDraft } from "../../../common/api/draftQuery";

export default function DraftList() {
  const { data, error } = useGetMyDraft();
  if (error) {
    return <></>;
  }
  if (data) {
    console.log(data);
    return <></>;
  }
  return <PuffLoader />;
}
