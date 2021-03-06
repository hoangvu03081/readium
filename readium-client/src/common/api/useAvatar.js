import { useQuery } from "react-query";
import axios from "axios";
import { USER_API } from "./apiConstant";

export function useMyAvatar() {
  return useQuery(
    ["avatar"],
    () =>
      axios
        .get(USER_API.GET_MY_AVATAR, { responseType: "blob" })
        .then((result) => window.URL.createObjectURL(result.data)),
    { refetchOnWindowFocus: false }
  );
}

export function useOtherAvatar(id) {
  return useQuery(["avatar", id], () =>
    axios
      .get(USER_API.GET_AVATAR(id), { responseType: "blob" })
      .then((result) => window.URL.createObjectURL(result.data))
  );
}

export default function useAvatar(id) {
  if (id) return useOtherAvatar(id);
  return useMyAvatar();
}
