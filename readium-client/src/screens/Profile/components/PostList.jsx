import React from "react";
import { PuffLoader } from "react-spinners";
import styled from "styled-components";
import { useGetProfilePost } from "../../../common/api/postQuery";
import Card from "../../../common/components/Card";
import useScrollBottomDetect from "../../../common/hooks/useScrollBottomDetect";

const PostListLayout = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function PostList({ userId }) {
  const { data, error, fetchNextPage, isFetchingNextPage } =
    useGetProfilePost(userId);
  useScrollBottomDetect(fetchNextPage, 100);
  if (error) return <></>;
  if (data)
    return (
      <PostListLayout>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.posts.map((post) => (
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
          </React.Fragment>
        ))}
        {isFetchingNextPage && <PuffLoader />}
      </PostListLayout>
    );
  return <PuffLoader />;
}
