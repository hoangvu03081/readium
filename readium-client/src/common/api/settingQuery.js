import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { SETTING_API } from "./apiConstant";

export function useFetchProfile(profileId) {
  return useQuery(
    ["profile", profileId],
    () => axios.get(SETTING_API.GET_MY_PROFILE).then(({ data }) => data),
    { staleTime: Infinity }
  );
}

export function useUpdateProfile(profileId) {
  const queryClient = useQueryClient();
  return useMutation(
    (profile) =>
      console.log(profile) ||
      axios.patch(SETTING_API.PATCH_MY_PROFILE, profile),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile", profileId]);
      },
    }
  );
}
