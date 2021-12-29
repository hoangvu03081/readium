import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { SEARCH_API } from "./apiConstant";

export default function useSearch(query) {
  const { data } = useQuery(
    ["search", "query"],
    () =>
      axios
        .post(SEARCH_API.POST_SEARCH, { keyword: query })
        .then(({ data }) => data),
    {
      staleTime: 60000,
      // select:
    }
  );
}
