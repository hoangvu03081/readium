import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { COLLECTION_API } from "./apiConstant";

export function useGetAllCollections(auth) {
  return useQuery(
    "collections",
    () => axios.get(COLLECTION_API.GET_ALL_COLLECTION),
    {
      staleTime: Infinity,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      enabled: !!auth,
    }
  );
}

export function useCreateCollection() {
  return useMutation((collectionName) =>
    axios.post(COLLECTION_API.POST_COLLECTION, { name: collectionName })
  );
}

export function useAddCollection() {
  return useMutation(({ postId, collectionId }) =>
    axios.post(COLLECTION_API.POST_POST_COLLECTION, { postId, collectionId })
  );
}

export function useRenameCollection() {
  return useMutation(({ collectionId, newName }) =>
    axios.put(COLLECTION_API.PUT_COLLECTION_NAME(collectionId), {
      name: newName,
    })
  );
}

export function useDeleteCollection() {
  return useMutation((collectionId) =>
    axios.delete(COLLECTION_API.DELETE_COLLECTION(collectionId))
  );
}
