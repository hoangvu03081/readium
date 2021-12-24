import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import { usePost } from "../../common/api/postQuery";
import Post from "../../common/components/Post";
import ToCommentBtn from "./ToCommentBtn";
import PostSuggestion from "./PostSuggestion";
import CommentSection from "./CommentSection";
import LoadingOverlay from "../../common/components/LoadingOverlay";
import BackToTop from "../../common/components/Buttons/BackToTop";

const Layout = styled.div`
  margin: 140px auto 0 auto;
  padding-bottom: 100px;
  width: 55%;
`;

export default function ReadPost() {
  const { auth } = useAuth();
  const history = useHistory();
  const id = history.location.state;

  // GET POST & COVER IMAGE
  const [
    { isFetched: isFetchedPost, data: dataPost },
    { isFetched: isFetchedCoverImage, data: dataCoverImage },
  ] = usePost(id, auth);

  // WAIT FOR DATA
  if (!isFetchedPost || !isFetchedCoverImage) {
    return <LoadingOverlay isLoading />;
  }
  const post = dataPost.data;
  const coverImageSrc = window.URL.createObjectURL(dataCoverImage.data);

  return (
    <Layout className="container">
      <Post data={post} coverImageSrc={coverImageSrc} type="read" />

      <ToCommentBtn />

      <PostSuggestion />

      <CommentSection postId={id} />

      <BackToTop />
    </Layout>
  );
}
