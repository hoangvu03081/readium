import { useQuery } from "react-query";
import axios from "axios";
import { USER_API } from "./apiConstant";

export function useMyAvatar() {
  return useQuery(
    [
      "avatar",
      localStorage.getItem("Authorization"),
      !localStorage.getItem("Authorization"),
    ],
    () =>
      axios
        .get(USER_API.GET_MY_AVATAR, { responseType: "blob" })
        .then((result) => window.URL.createObjectURL(result.data))
  );
}

export function useOtherAvatar(id) {
  return useQuery(["avatar", id], () =>
    axios
      .get(USER_API.GET_AVATAR(id), { responseType: "blob" })
      .then((result) => window.URL.createObjectURL(result.data))
  );
}
