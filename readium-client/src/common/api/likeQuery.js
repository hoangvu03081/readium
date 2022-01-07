import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { LIKE_API } from "./apiConstant";

export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation((postId) => axios.post(LIKE_API.POST_LIKE(postId)), {
    onSuccess: () => {
      queryClient.invalidateQueries("liked");
    },
  });
}

export function useIsLiked(postId, auth) {
  return useQuery(
    ["liked", postId],
    () => axios.get(LIKE_API.GET_IS_LIKED(postId)),
    {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      enabled: !!auth,
    }
  );
}
