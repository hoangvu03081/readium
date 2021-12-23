import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { POST_API } from "./apiConstant";

const fetchPosts = ({ pageParam = 0 }) =>
  axios.get(POST_API.GET_POSTS(pageParam));

export default function useInfinitePosts() {
  const [data, setData] = useState([]);

  const { refetch, fetchNextPage } = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.data.next,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const fetchScrollBottom = () => {
    const website = document.documentElement;
    if (website.scrollHeight - website.scrollTop === website.clientHeight) {
      fetchNextPage().then((event) => {
        setData(event.data.pages);
      });
    }
  };

  useEffect(() => {
    refetch().then((e) => {
      setData(e.data.pages);
    });
    window.addEventListener("scroll", fetchScrollBottom);
    return () => {
      setData([]);
      window.removeEventListener("scroll", fetchScrollBottom);
    };
  }, []);

  return data;
}
