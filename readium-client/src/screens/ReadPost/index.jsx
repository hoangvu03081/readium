import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { usePost } from "../../common/api/postQuery";
import Post from "../../common/components/Post";
import ToCommentBtn from "./ToCommentBtn";
import PostSuggestion from "./PostSuggestion";
import CommentSection from "./CommentSection";
import LoadingOverlay from "../../common/components/LoadingOverlay";
import BackToTop from "../../common/components/Buttons/BackToTop";

const Layout = styled.div`
  margin: 140px auto 0;
  padding-bottom: 100px;
  width: 60%;
  @media (min-width: 1440px) {
    width: 850px;
  }
  @media (max-width: 1200px) {
    width: 70%;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 90%;
  }
  @media (max-width: 650px) {
    width: 92%;
  }
`;

export default function ReadPost() {
  const { postId } = useParams();
  const history = useHistory();
  const [id, setId] = useState(history.location.state);
  if (!id) {
    setId(postId);
  }

  // GET POST & COVER IMAGE
  const [
    {
      isFetched: isFetchedPost,
      data: dataPost,
      isError: isErrorPost,
      remove: removePost,
    },
    {
      isFetched: isFetchedCoverImage,
      data: dataCoverImage,
      isError: isErrorCoverImage,
      remove: removeCoverImage,
    },
  ] = usePost(id);

  // COMPONENT UNMOUNT => CLEAR CACHE
  useEffect(
    () => () => {
      removePost();
      removeCoverImage();
    },
    []
  );

  // FETCHING
  if (!isFetchedPost || !isFetchedCoverImage) {
    return <LoadingOverlay isLoading />;
  }
  const post = dataPost.data;
  const coverImageSrc = window.URL.createObjectURL(dataCoverImage.data);

  // ERROR
  if (isErrorPost || isErrorCoverImage) {
    return <p>Error loading post...</p>;
  }

  return (
    <Layout className="container">
      <Post data={post} coverImageSrc={coverImageSrc} type="read" />

      <ToCommentBtn />

      <PostSuggestion postId={id} />

      <CommentSection postId={id} />

      <BackToTop />
    </Layout>
  );
}
