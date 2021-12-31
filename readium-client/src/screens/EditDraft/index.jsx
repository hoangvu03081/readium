import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import { useDraft } from "../../common/api/draftQuery";
import HandlePost from "../../common/components/HandlePost";
import LoadingOverlay from "../../common/components/LoadingOverlay";

export default function EditDraft() {
  const { auth } = useAuth();
  const { draftId } = useParams();
  const history = useHistory();
  const [id, setId] = useState(history.location.state);
  if (!id) {
    setId(draftId);
  }

  // GET DRAFT & COVER IMAGE DRAFT
  const [
    { isFetched: isFetchedDraft, data: dataDraft },
    { isFetched: isFetchedCoverImage, data: dataCoverImage },
  ] = useDraft(id, auth);

  // WAIT FOR DATA
  if (!isFetchedDraft || !isFetchedCoverImage) {
    return <LoadingOverlay isLoading />;
  }
  const draft = dataDraft.data;

  return (
    <HandlePost id={id} data={draft} dataCoverImage={dataCoverImage.data} />
  );
}
