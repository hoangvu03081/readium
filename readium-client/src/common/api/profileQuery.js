import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { PROFILE_API, USER_API } from "./apiConstant";

export function useEditProfile() {}

export function useChangeAvatar() {}

function fetchImage(url) {
  return axios
    .get(url, { responseType: "blob" })
    .then((result) => window.URL.createObjectURL(result.data))
    .catch(() => null);
}

export function useFetchProfile(profileId) {
  const profile = useQuery(
    ["profile", profileId],
    () =>
      axios
        .get(PROFILE_API.GET_PROFILE(profileId))
        .then((result) => result.data),
    { staleTime: 300000 }
  );
  const userId = profile.data?.id;
  return [
    profile,
    useQuery(
      ["avatar", userId],
      () => fetchImage(USER_API.GET_AVATAR(userId)),
      { enabled: !!userId }
    ),
    useQuery(
      ["coverImage", userId],
      () => fetchImage(PROFILE_API.GET_COVER_IMAGE(userId)),
      {
        enabled: !!userId,
        useErrorBoundary: (error) => error.response?.status >= 500,
        retryDelay: 5000,
        staleTime: Infinity,
      }
    ),
  ];
}

export function useUploadAvatar(userId) {
  const queryClient = useQueryClient();
  return useMutation(
    (file) => {
      const formData = new FormData();
      formData.append("avatar", file);
      return axios.post(PROFILE_API.POST_UPLOAD_AVATAR, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: () => {
        //TODO: Fix my avatar
        queryClient.invalidateQueries(["avatar", userId], { exact: true });
        queryClient.invalidateQueries(["avatar"], { exact: true });
      },
    }
  );
}

export function useUploadCoverImage(userId) {
  const queryClient = useQueryClient();
  return useMutation(
    (file) => {
      const formData = new FormData();
      formData.append("coverImage", file);
      return axios.post(PROFILE_API.POST_UPLOAD_COVER_IMAGE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["coverImage", userId], { exact: true });
      },
    }
  );
}

export function useProfile(profileId) {
  return useFetchProfile(profileId);
}
