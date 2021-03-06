import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { Quill } from "react-quill";
import { DRAFT_API } from "./apiConstant";

const Delta = Quill.import("delta");

export function useGetMyDraft() {
  return useInfiniteQuery(
    "drafts",
    ({ pageParam = 0 }) =>
      axios.get(DRAFT_API.GET_MY_DRAFT(pageParam)).then(({ data }) => data),
    {
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );
}

export function useDeleteDraft() {
  const queryClient = useQueryClient();
  return useMutation(
    (draftId) => axios.delete(DRAFT_API.DELETE_DRAFT(draftId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("drafts");
      },
    }
  );
}

export function useDraftID() {
  return useMutation(() => axios.post(DRAFT_API.POST_DRAFT_ID));
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
  const res1 = useQuery(
    ["draft", id],
    () => axios.get(DRAFT_API.GET_A_DRAFT(id)),
    {
      staleTime: 0,
      refetchOnMount: true,
      enabled: !!id && !!auth,
      refetchOnWindowFocus: false,
    }
  );
  const res2 = useQuery(
    ["coverImageDraft", id],
    () =>
      axios.get(DRAFT_API.GET_COVER_IMAGE_DRAFT(id), { responseType: "blob" }),
    {
      staleTime: 0,
      refetchOnMount: true,
      enabled: !!id && !!auth,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
  return [res1, res2];
}

export function usePublish(id) {
  return useMutation(() => axios.put(DRAFT_API.PUT_PUBLISH(id)));
}
