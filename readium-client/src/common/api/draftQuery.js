import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Delta from "quill-delta";
import { DRAFT_API } from "./apiConstant";

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
export function useContentDraft(id) {
  return useMutation((editor) => {
    const newDelta = currentDelta.diff(editor.getContents());
    currentDelta = editor.getContents();
    axios.patch(DRAFT_API.PATCH_CONTENT(id), {
      diff: JSON.stringify(newDelta),
    });
  });
}

export function useDraft(id) {
  return useQuery("draft", () => axios.get(DRAFT_API.GET_A_DRAFT(id)), {
    staleTime: Infinity,
  });
}
