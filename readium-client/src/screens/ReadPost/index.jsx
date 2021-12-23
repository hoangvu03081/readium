import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../common/hooks/useAuth";
import { usePost } from "../../common/api/postQuery";
import Post from "../../common/components/Post";
import LoadingOverlay from "../../common/components/LoadingOverlay";
import BackToTop from "../../common/components/Buttons/BackToTop";
import ToCommentBtn from "./ToCommentBtn";

const Layout = styled.div`
  padding-bottom: 100px;
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
    <Layout>
      <Post data={post} coverImageSrc={coverImageSrc} type="read" />
      <ToCommentBtn />
      <BackToTop />
    </Layout>
  );
}
