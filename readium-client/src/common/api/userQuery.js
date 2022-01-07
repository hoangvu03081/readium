import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { USER_API } from "./apiConstant";

export function useIsFollow(userId) {
  return useQuery(
    ["follow", userId],
    () => axios.get(USER_API.GET_IS_FOLLOW(userId)).then(({ data }) => data),
    {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
}

export function useIsFollowAuth(userId, auth) {
  return useQuery(
    ["follow", userId],
    () => axios.get(USER_API.GET_IS_FOLLOW(userId)).then(({ data }) => data),
    {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      enabled: !!auth,
    }
  );
}

export function useFollow(userId) {
  const queryClient = useQueryClient();
  return useMutation(() => axios.post(USER_API.POST_FOLLOW(userId)), {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("follow");
      queryClient.invalidateQueries("profile");
      //   queryClient.setQueryData(["follow", userId], data.is_followed);
    },
  });
}
