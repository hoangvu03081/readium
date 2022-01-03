import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { COMMENT_API } from "./apiConstant";

export function useGetMyAvatar(auth) {
  return useQuery(
    "myAvatar",
    () =>
      axios
        .get(COMMENT_API.GET_MY_AVATAR, { responseType: "blob" })
        .then((result) => window.URL.createObjectURL(result.data)),
    {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      enabled: !!auth,
    }
  );
}

export function useGetComment(postId) {
  return useQuery(
    "getComment",
    () => axios.get(COMMENT_API.GET_COMMENT(postId)),
    {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
}

export function usePostComment() {
  return useMutation(({ postId, content }) =>
    axios.post(COMMENT_API.POST_COMMENT(postId), { content })
  );
}
