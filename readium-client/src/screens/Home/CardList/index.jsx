/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";
import Card from "../../../common/components/Card";

export default function CardList({ data }) {
  return (
    <>
      {data.reduce((result, item) => {
        // console.log(item.data.posts);
        result.push(
          ...item.data.posts.map((post) => {
            return (
              <Card
                key={post.id}
                postId={post.id}
                profileId={post.author.profileId}
                userId={post.author.profileId}
                preview={post.coverImage}
                title={post.title}
                content={post.content || post.description}
                tags={post.tags}
                duration={post.duration}
                user={post.author.displayName}
                userAvatar={post.author.avatar}
                loveNumber={post.likes}
                commentNumber={post.comments}
                type="global"
              />
            );
          })
        );
        return result;
      }, [])}
    </>
  );
}

CardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};
