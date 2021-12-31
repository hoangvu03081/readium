import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
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
      return toast.promise(
        axios.post(PROFILE_API.POST_UPLOAD_AVATAR, formData, {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          pending: "Uploading your avatar",
          success: "Your avatar has been updated!",
          error: "Sorry, something went wrong",
        }
      );
    },
    {
      onSuccess: ({ data }) => {
        const url = window.URL.createObjectURL(data);
        queryClient.setQueryData(["avatar", userId], url);
        queryClient.setQueryData(["avatar"], url);
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
      return toast.promise(
        axios.post(PROFILE_API.POST_UPLOAD_COVER_IMAGE, formData, {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          pending: "Uploading your cover image",
          success: "Your cover image has been updated!",
          error: "Sorry, something went wrong",
        }
      );
    },
    {
      onSuccess: ({ data }) => {
        const url = window.URL.createObjectURL(data);
        queryClient.setQueryData(["coverImage", userId], url);
      },
    }
  );
}

export function useProfile(profileId) {
  return useFetchProfile(profileId);
}

export function useGetMyProfile(auth) {
  return useQuery("myProfile", () => axios.get(PROFILE_API.GET_MY_PROFILE), {
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!auth,
  });
}
