/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
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

export default function PostList({ isMyProfile, userId }) {
  const { data, error, fetchNextPage, isFetchingNextPage, refetch } =
    useGetProfilePost(userId);
  useScrollBottomDetect(fetchNextPage, 100);
  if (error) return <></>;
  const refetchList = () => {
    setTimeout(() => {
      refetch();
    }, 500);
  };
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
                type={isMyProfile ? "myProfile" : "otherProfile"}
                refetchList={refetchList}
              />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <PuffLoader />}
      </PostListLayout>
    );
  return <PuffLoader />;
}

PostList.propTypes = {
  userId: PropTypes.string.isRequired,
};
