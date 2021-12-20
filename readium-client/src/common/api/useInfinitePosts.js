import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { POST_API } from "./apiConstant";

const fetchPosts = ({ pageParam = 0 }) =>
  axios.get(POST_API.GET_POST(pageParam));

export default function useInfinitePosts() {
  const [data, setData] = useState([]);

  const { fetchNextPage } = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.data.next,
    refetchOnWindowFocus: false,
  });

  const fetchPostsWrapper = () => {
    const website = document.documentElement;
    if (website.scrollHeight - website.scrollTop === website.clientHeight) {
      fetchNextPage().then((event) => {
        setData(event.data.pages);
      });
    }
  };

  useEffect(() => {
    fetchNextPage().then((event) => {
      setData(event.data.pages);
    });
    window.addEventListener("scroll", fetchPostsWrapper);
    return () => {
      window.removeEventListener("scroll", fetchPostsWrapper);
    };
  }, []);

  return data;
}
