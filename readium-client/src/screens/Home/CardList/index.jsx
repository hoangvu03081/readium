import React, { useEffect, useState } from "react";
import { usePost } from "../../../common/api/postQuery";
import Card from "../../../common/components/Card";

export default function CardList() {
  const [data, setData] = useState([]);

  const {
    fetchNextPage,
    // fetchPreviousPage,
    // hasNextPage,
    // hasPreviousPage,
    // isFetchingNextPage,
    // isFetchingPreviousPage,
  } = usePost();

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
      {data.reduce((acc, item) => {
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
