import axios from "axios";
import PropTypes from "prop-types";
import { useInfiniteQuery } from "react-query";
import { useState, useEffect } from "react";
import { POST_API } from "./apiConstant";
import { useAuth } from "../hooks/useAuth";

const fetchPosts = ({ pageParam = 0 }) =>
  axios.get(POST_API.GET_POSTS(pageParam));

const fetchFollowingPosts = ({ pageParam = 0 }) =>
  axios.get(POST_API.GET_FOLLOWING_POSTS(pageParam));

export default function useInfinitePosts(recommend) {
  const { auth } = useAuth();
  const [data, setData] = useState([]);

  const posts = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.data.next,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const followingPosts = useInfiniteQuery(
    "followingPosts",
    fetchFollowingPosts,
    {
      getNextPageParam: (lastPage) => lastPage.data.next,
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      enabled: !!auth,
    }
  );

  const fetchScrollBottom = () => {
    const website = document.documentElement;
    if (website.scrollHeight - website.scrollTop === website.clientHeight) {
      if (recommend) {
        posts.fetchNextPage().then((event) => {
          setData(event.data.pages);
        });
      } else {
        followingPosts.fetchNextPage().then((event) => {
          setData(event.data.pages);
        });
      }
    }
  };

  useEffect(() => {
    if (recommend) {
      posts.refetch().then((e) => {
        setData(e.data.pages);
      });
    } else {
      followingPosts.refetch().then((e) => {
        setData(e.data.pages);
      });
    }
    window.addEventListener("scroll", fetchScrollBottom);
    return () => {
      setData([]);
      window.removeEventListener("scroll", fetchScrollBottom);
    };
  }, [recommend]);

  return data;
}

useInfinitePosts.propTypes = {
  recommend: PropTypes.bool.isRequired,
};
