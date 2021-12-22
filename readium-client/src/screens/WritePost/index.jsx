import React, { useEffect, useState } from "react";
import { useAuth } from "../../common/hooks/useAuth";
import { useDraftID } from "../../common/api/draftQuery";
import HandlePost from "../../common/components/HandlePost";
import LoadingOverlay from "../../common/components/LoadingOverlay";

export default function WritePost() {
  // CREATE DRAFT
  //   const [id, setId] = useState("");
  //   const { auth } = useAuth();
  //   const draftId = useDraftID();
  //   useEffect(() => {
  //     async function initPost() {
  //       if (!id && auth) {
  //         draftId.mutate(null, {
  //           onSuccess: (result) => {
  //             setId(result.data.id);
  //             // console.log(result.data.id);
  //           },
  //         });
  //       }
  //     }
  //     initPost();
  //   }, [id, auth]);
  const [id, setId] = useState("");
  const { auth } = useAuth();
  const draftId = useDraftID();
  useEffect(() => {
    draftId.mutate(null, {
      onSuccess: (result) => {
        setId(result.data.id);
      },
    });
  }, [auth]);

  if (id === "") {
    return <LoadingOverlay isLoading />;
  }

  return <HandlePost id={id} />;
}
