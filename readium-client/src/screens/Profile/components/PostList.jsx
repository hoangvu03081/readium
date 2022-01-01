import React from "react";
import { PuffLoader } from "react-spinners";
import styled from "styled-components";
import { useGetProfilePost } from "../../../common/api/postQuery";
import Card from "../../../common/components/Card";

const PostListLayout = styled.div`
  width: 85%;
`;

export default function PostList({ userId }) {
  const { data, error } = useGetProfilePost(userId);
  if (error) return <></>;
  if (data)
    return (
      <PostListLayout>
        {data.posts.map((post) => (
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
            type="otherProfile"
          />
        ))}
      </PostListLayout>
    );
  return <PuffLoader />;
}
