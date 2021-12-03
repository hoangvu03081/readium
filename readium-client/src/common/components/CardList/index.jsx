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

  const fetchPostsWrapper = async () => {
    const website = document.documentElement;
    if (website.scrollHeight - website.scrollTop === website.clientHeight) {
      await fetchNextPage().then((event) => {
        setData(event.data.pages);
      });
    }
  };

  useEffect(async () => {
    window.addEventListener("scroll", fetchPostsWrapper);
    return () => {
      window.removeEventListener("scroll", fetchPostsWrapper);
    };
  }, []);

  return (
    <>
      {/* {data.map((item) => {
        const itemData = item.data.posts[0];
        return (
          <Card
            preview="./src/assets/images/preview_2.png"
            title={itemData.title}
            content={itemData.content}
            tags={itemData.tags}
            duration={3}
            user={itemData.author}
            userAvatar="./src/assets/images/yasuo.png"
            loveNumber={itemData.likes.length}
            commentNumber={itemData.comments.length}
          />
        );
      })} */}
      <Card />
      <Card />
      <Card />
    </>
  );
}
