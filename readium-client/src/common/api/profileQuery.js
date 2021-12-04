import { useQuery } from "react-query";
import axios from "axios";
import { PROFILE_API } from "./apiConstant";

export function useProfile() {
  return useQuery("profile", () => axios.get(PROFILE_API.GET_MY_PROFILE), {
    staleTime: Infinity,
  });
}

export function useEditProfile() {}

export function useChangeAvatar() {}

export function useFetchProfile(id) {}
