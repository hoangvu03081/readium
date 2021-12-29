import React from "react";
import { usePopularPost } from "../../../common/api/postQuery";
import PostDesktop from "./PostDesktop";
import PostMobile from "./PostMobile";
import PuffLoader from "../../../common/components/PuffLoader";

export default function PopularPost() {
  const getPopularPost = usePopularPost();
  if (getPopularPost.isFetching) {
    return <PuffLoader />;
  }
  if (getPopularPost.isError || !getPopularPost.data.data) {
    return <div />;
  }

  const popularPost = getPopularPost.data.data;
  const getDate = (publishDate) => {
    const formatDate = new Date(publishDate.slice(0, 10));
    return formatDate.toLocaleDateString();
  };

  return (
    <>
      <PostDesktop
        postId={popularPost.id}
        title={popularPost.title}
        user={popularPost.author.displayName}
        userAvatar={popularPost.author.avatar}
        date={getDate(popularPost.publishDate)}
        tags={popularPost.tags}
        preview={popularPost.coverImage}
        content={popularPost.content}
        watchNumber={popularPost.views}
        loveNumber={popularPost.likes}
        commentNumber={popularPost.comments}
      />
      <PostMobile
        postId={popularPost.id}
        title={popularPost.title}
        user={popularPost.author.displayName}
        userAvatar={popularPost.author.avatar}
        date={getDate(popularPost.publishDate)}
        tags={popularPost.tags}
        preview={popularPost.coverImage}
        watchNumber={popularPost.views}
        loveNumber={popularPost.likes}
        commentNumber={popularPost.comments}
      />
    </>
  );
}

// preview="src/assets/images/preview_1.png"
// content="Does programming affect your health in the long run? Are old programmers suffering from back pain, etc? Is there a way to avoid it? Does programming affect your health in the long run? Are old programmers suffering from back pain Does programming affect your health in the long run? Are old programmers suffering from back pain..."
