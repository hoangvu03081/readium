import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
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
    (profile) => axios.patch(SETTING_API.PATCH_MY_PROFILE, profile),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile", profileId]);
        toast.success("Update successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
      onError: (err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    }
  );
}