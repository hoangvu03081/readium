/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React from "react";
import styled from "styled-components";
import { useNumberOfPosts } from "../../../common/api/postQuery";
import Card from "../../../common/components/Card";

const Layout = styled.div``;

const Title = styled.p`
  width: 100%;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 36px;
`;

const CardList = styled.div`
  > div {
    width: 100%;
    margin: 0 auto 50px;
  }
`;

const Loading = styled.p`
  text-align: center;
`;

export default function PostSuggestion() {
  const getNumberOfPosts = useNumberOfPosts(0);
  if (!getNumberOfPosts.data) {
    return <Loading>Loading...</Loading>;
  }
  const { posts } = getNumberOfPosts.data.data; // 5 posts
  return (
    <Layout>
      <Title>You may also like</Title>
      <CardList>
        {posts.map((item, index) => {
          if (index === 1 || index === 2 || index === 3) {
            return (
              <Card
                key={item.id}
                postId={item.id}
                preview={item.coverImage}
                title={item.title}
                content={item.content}
                tags={item.tags}
                duration={item.duration}
                user={item.author.displayName}
                userAvatar={item.author.avatar}
                loveNumber={item.likes}
                commentNumber={item.comments}
                type="global"
                isSuggestion
              />
            );
          }
        })}
      </CardList>
    </Layout>
  );
}