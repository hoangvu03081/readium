import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { POST_API } from "./apiConstant";

export function usePopularPost() {}

export function usePost() {
  const fetchPosts = ({ pageParam = 0 }) =>
    axios.get(POST_API.GET_POST(pageParam));
  return useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.data.next,
  });
}
