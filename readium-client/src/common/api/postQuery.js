import { useMutation, useQuery, useInfiniteQuery } from "react-query";
import axios from "axios";
import { POST_API } from "./apiConstant";

export function usePopularPost() {
  return useQuery("popularPost", () => axios.get(POST_API.GET_POPULAR_POST), {
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

export function useGetProfilePost(userId) {
  return useInfiniteQuery(
    ["post", "profile"],
    ({ pageParam = 0 }) =>
      axios
        .get(POST_API.GET_PROFILE_POST(userId, pageParam))
        .then(({ data }) => data),
    {
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );
}

export function usePost(id) {
  return useQuery(
    ["collectionPost", id],
    () => axios.get(POST_API.GET_A_POST(id)),
    {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );
}

export function usePostAndCoverImage(id) {
  const res1 = useQuery(
    ["post", id],
    () => axios.get(POST_API.GET_A_POST(id)),
    {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );
  const res2 = useQuery(
    ["coverImagePost", id],
    () =>
      axios.get(POST_API.GET_COVER_IMAGE_POST(id), { responseType: "blob" }),
    {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      enabled: !!id,
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

export function useDeletePost() {
  return useMutation((postId) => axios.delete(POST_API.DELETE_POST(postId)));
}
