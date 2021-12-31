import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Delta from "quill-delta";
import { DRAFT_API } from "./apiConstant";

export function useGetMyDraft() {
  return useQuery("drafts", () =>
    axios.get(DRAFT_API.GET_MY_DRAFT).then(({ data }) => data)
  );
}

export function useDraftID() {
  return useMutation(() => axios.post(DRAFT_API.GET_DRAFT_ID));
}

export function useTitleDraft(id) {
  return useMutation((titleDraft) => {
    axios.put(DRAFT_API.PUT_TITLE(id), {
      title: titleDraft.target.value,
    });
  });
}

export function useDescriptionDraft(id) {
  return useMutation((descriptionDraft) => {
    axios.put(DRAFT_API.PUT_DESCRIPTION(id), {
      description: descriptionDraft.target.value,
    });
  });
}

export function useTagsDraft(id) {
  return useMutation((tagsDraft) => {
    const data = tagsDraft.map((item) => item.text);
    axios.put(DRAFT_API.PUT_TAGS(id), {
      tags: data,
    });
  });
}

export function useCoverImageDraft(id) {
  return useMutation((coverImageDraft) => {
    axios.put(DRAFT_API.PUT_COVER_IMAGE(id), coverImageDraft);
  });
}

let currentDelta = new Delta();
export function useNewContentDraft() {
  currentDelta = new Delta();
}
export function useFetchContentDraft(delta) {
  currentDelta = new Delta(delta);
}
export function useContentDraft(id) {
  return useMutation((editor) => {
    const newDelta = currentDelta.diff(editor.getContents());
    currentDelta = editor.getContents();
    axios.patch(DRAFT_API.PATCH_CONTENT(id), {
      diff: newDelta,
    });
  });
}

export function useDraft(id, auth) {
  const res1 = useQuery("draft", () => axios.get(DRAFT_API.GET_A_DRAFT(id)), {
    staleTime: 0,
    refetchOnMount: true,
    enabled: !!auth,
    refetchOnWindowFocus: false,
  });
  const res2 = useQuery(
    "coverImageDraft",
    () =>
      axios.get(DRAFT_API.GET_COVER_IMAGE_DRAFT(id), { responseType: "blob" }),
    {
      staleTime: 0,
      refetchOnMount: true,
      enabled: !!auth,
      refetchOnWindowFocus: false,
    }
  );
  return [res1, res2];
}

export function usePublish(id) {
  return useMutation(() => axios.put(DRAFT_API.PUT_PUBLISH(id)));
}
