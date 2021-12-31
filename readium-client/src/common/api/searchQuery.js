import { useQuery } from "react-query";
import axios from "axios";
import { SEARCH_API } from "./apiConstant";

export default function useSearch(query) {
  return useQuery(
    ["search", query],
    () =>
      axios
        .post(SEARCH_API.POST_SEARCH, { keyword: query })
        .then(({ data }) => data),
    {
      staleTime: 10000,
      enabled: query.length >= 2,
    }
  );
}
