import { useQuery } from "react-query";
import axios from "axios";
import { PROFILE_API } from "./apiConstant";

export function useMyProfile() {
  return useQuery(
    ["profile", localStorage.getItem("Authorization")],
    () => axios.get(PROFILE_API.GET_MY_PROFILE).then((result) => result.data),
    {
      staleTime: 300000,
    }
  );
}

export function useEditProfile() {}

export function useChangeAvatar() {}

export function useOtherProfile(profileId) {
  return useQuery(
    ["profile", profileId],
    () =>
      axios.get(
        PROFILE_API.GET_PROFILE(profileId).then((result) => result.data)
      ),
    { staleTime: 300000 }
  );
}

export function useProfile(profileId) {
  if (profileId) return useOtherProfile(profileId);
  return useMyProfile();
}
