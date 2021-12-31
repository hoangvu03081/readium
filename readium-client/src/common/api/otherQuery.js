import { useQuery } from "react-query";
import axios from "axios";
import { OTHER_API } from "./apiConstant";

export function useGetTrendingTopics() {
  return useQuery(
    "trendingTopics",
    () => axios.get(OTHER_API.GET_TRENDING_TOPICS),
    {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
}

export function useGetRecommendedWriters() {
  return useQuery(
    "recommendedWriters",
    () => axios.get(OTHER_API.GET_RECOMMENDED_WRITERS),
    {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
}
