/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import React from "react";
import useInfinitePosts from "../../../common/api/useInfinitePosts";
import Card from "../../../common/components/Card";

export default function CardList() {
  const data = useInfinitePosts();

  return (
    <>
      {data.reduce((acc, item) => {
        // console.log(item.data.posts); "./src/assets/images/preview_2.png"
        acc.push(
          ...item.data.posts.map((post) => {
            return (
              <Card
                key={post.id}
                preview={post.coverImageUrl}
                title={post.title}
                content={post.content}
                tags={post.tags}
                duration={post.duration}
                user={post.author.displayName}
                userAvatar={post.author.avatar}
                loveNumber={post.likes}
                commentNumber={post.comments}
                hideOptions={false}
              />
            );
          })
        );
        return acc;
      }, [])}
    </>
  );
}
