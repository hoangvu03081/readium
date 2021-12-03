import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import Card from "../Card";

export default function CardList() {
  const [data, setData] = useState([]);

  const fetchPosts = ({ pageParam = 0 }) =>
    axios.get(`http://localhost:5000/posts/?skip=${pageParam}`);

  const {
    fetchNextPage,
    // fetchPreviousPage,
    // hasNextPage,
    // hasPreviousPage,
    // isFetchingNextPage,
    // isFetchingPreviousPage,
  } = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage) => lastPage.data.next,
  });

  const fetchPostsWrapper = () => {
    const website = document.documentElement;
    if (website.scrollHeight - website.scrollTop === website.clientHeight) {
      fetchNextPage().then((event) => {
        // console.log(event);
        setData(event.data.pages);
      });
    }
  };

  useEffect(() => {
    fetchNextPage().then((event) => {
      // console.log(event);
      setData(event.data.pages);
    });
    window.addEventListener("scroll", fetchPostsWrapper);
    return () => {
      window.removeEventListener("scroll", fetchPostsWrapper);
    };
  }, []);

  return (
    <>
      {data.reduce((acc, item) =>
        // item.data.posts là 1 array chứa các posts, gộp nhiều cái item.data.posts lại với nhau
        {
          // console.log(item.data.posts);
          acc.push(
            ...item.data.posts.map((post) => (
              <Card
                // eslint-disable-next-line no-underscore-dangle
                key={post._id}
                preview="./src/assets/images/preview_2.png"
                title={post.title}
                content={post.content}
                tags={post.tags}
                duration={3}
                user={post.author}
                userAvatar="./src/assets/images/yasuo.png"
                loveNumber={post.likes.length}
                commentNumber={post.comments.length}
              />
            ))
          );
          return acc;
        }, [])}
    </>
  );
}
