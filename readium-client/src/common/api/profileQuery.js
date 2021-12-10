import { useQuery } from "react-query";
import axios from "axios";
import { PROFILE_API, USER_API } from "./apiConstant";

export function useMyProfile() {
  const { data: profile } = useQuery(
    ["profile", localStorage.getItem("Authorization")],
    () => axios.get(PROFILE_API.GET_MY_PROFILE).then((result) => result.data),
    {
      staleTime: 300000,
    }
  );
  return useQuery(
    ["avatar", localStorage.getItem("Authorization")],
    () =>
      axios
        .get(USER_API.GET_MY_AVATAR, { responseType: "blob" })
        .then((result) => window.URL.createObjectURL(result.data)),
    { enabled: !!profile, select: (data) => ({ ...profile, avatar: data }) }
  );
}

export function useEditProfile() {}

export function useChangeAvatar() {}

export function useCoverImage(userId) {
  const id = userId ?? localStorage.getItem("Authorization");
  return useQuery(["coverImage", id], () =>
    axios
      .get(
        userId
          ? PROFILE_API.GET_COVER_IMAGE(userId)
          : PROFILE_API.GET_MY_COVER_IMAGE,
        { responseType: "blob" }
      )
      .then((result) => window.URL.createObjectURL(result.data))
  );
}

export function useOtherProfile(profileId) {
  const { data: profile } = useQuery(
    ["profile", profileId],
    () =>
      axios
        .get(PROFILE_API.GET_PROFILE(profileId))
        .then((result) => result.data),
    { staleTime: 300000 }
  );
  const userId = profile?._id;
  return useQuery(
    ["avatar", userId],
    () =>
      axios
        .get(USER_API.GET_AVATAR(userId), { responseType: "blob" })
        .then((result) => window.URL.createObjectURL(result.data)),
    { enabled: !!userId, select: (data) => ({ ...profile, avatar: data }) }
  );
}

export function useProfile(profileId) {
  if (profileId) return useOtherProfile(profileId);
  return useMyProfile();
}
