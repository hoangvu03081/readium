import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { COLLECTION_API } from "./apiConstant";

export function useGetAllCollections(auth) {
  return useQuery(
    "collections",
    () => axios.get(COLLECTION_API.GET_ALL_COLLECTION),
    {
      staleTime: 0,
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
