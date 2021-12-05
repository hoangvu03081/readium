import { useQuery } from "react-query";
import axios from "axios";
import { USER_API } from "./apiConstant";

export default function useAvatar() {
  return useQuery(
    ["avatar", localStorage.getItem("Authorization")],
    () =>
      axios
        .get(USER_API.GET_MY_AVATAR, { responseType: "blob" })
        .then((result) => window.URL.createObjectURL(result.data)),
    { staleTime: Infinity }
  );
}
