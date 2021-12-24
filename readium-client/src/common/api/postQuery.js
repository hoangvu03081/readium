import { useQuery } from "react-query";
import axios from "axios";
import { POST_API } from "./apiConstant";

export function usePopularPost() {}

export function usePost(id, auth) {
  const res1 = useQuery("post", () => axios.get(POST_API.GET_A_POST(id)), {
    staleTime: 0,
    refetchOnMount: true,
    enabled: !!auth,
    refetchOnWindowFocus: false,
  });
  const res2 = useQuery(
    "coverImagePost",
    () =>
      axios.get(POST_API.GET_COVER_IMAGE_POST(id), { responseType: "blob" }),
    {
      staleTime: 0,
      refetchOnMount: true,
      enabled: !!auth,
      refetchOnWindowFocus: false,
    }
  );
  return [res1, res2];
}

export function useNumberOfPosts(skip) {
  return useQuery("numberOfPosts", () => axios.get(POST_API.GET_POSTS(skip)), {
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
