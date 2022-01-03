import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { useGetMyProfile } from "../../api/profileQuery";
import PuffLoader from "../PuffLoader";
import PostInfo from "./PostInfo";
import PostContent from "./PostContent";
import PostBottom from "./PostBottom";
import HorizontalLine from "./HorizontalLine";

// STYLES ----------------------------------------------------------
const Content = styled.div`
  width: 100%;
`;

const PreviewTitle = styled.p`
  margin: 0 0 55px 0;
  padding: 0;
  text-align: center;
  font-family: "Raleway";
  font-weight: 500;
  font-size: 46px;
  @media (max-width: 600px) {
    font-size: 40px;
  }
  @media (max-width: 450px) {
    font-size: 34px;
  }
  @media (max-width: 365px) {
    font-size: 30px;
  }
  @media (max-width: 300px) {
    font-size: 28px;
  }
`;

const PostTitle = styled.p`
  margin-top: 0;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 46px;
  @media (max-width: 650px) {
    font-size: 32px;
  }
  @media (max-width: 550px) {
    font-size: 30px;
  }
`;

const PostDescription = styled.p`
  margin-top: 0;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  font-family: "PT Sans";
  font-weight: 500;
  font-size: 24px;
  @media (max-width: 650px) {
    font-size: 22px;
  }
  @media (max-width: 550px) {
    font-size: 20px;
  }
`;

const PostCoverImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  margin-bottom: 30px;
  @media (max-width: 1100px) {
    height: 400px;
  }
  @media (max-width: 850px) {
    height: 350px;
  }
  @media (max-width: 750px) {
    height: 300px;
  }
`;
// -----------------------------------------------------------------

export default function Post({ data, coverImageSrc, type }) {
  const auth = useAuth();
  const getMyProfile = useGetMyProfile(auth.auth);

  // GET AUTHENTICATED USER
  let authId = "";
  if (auth.auth) {
    if (getMyProfile.isFetching) {
      return <PuffLoader />;
    }
    if (!getMyProfile.data || getMyProfile.isError) {
      return <p>An error occured while loading author...</p>;
    }
    authId = getMyProfile.data.data.id;
  }

  // CHECK IS MYSELF
  const isMyself = () => {
    const indexOfUserId = data.author.avatar.lastIndexOf("/");
    const authorId = data.author.avatar.slice(indexOfUserId + 1);
    if (authorId !== authId) {
      return false;
    }
    return true;
  };

  return (
    <Content>
      <PreviewTitle className={type === "preview" ? "d-block" : "d-none"}>
        Preview your post
      </PreviewTitle>

      <PostTitle>{data.title}</PostTitle>

      <PostDescription>{data.description}</PostDescription>

      <PostInfo
        postId={data.postId}
        author={data.author}
        publishedDate={data.publishDate}
        duration={data.duration}
        type={type}
        isMyself={isMyself()}
      />

      <PostCoverImage src={coverImageSrc} />

      <HorizontalLine />

      <PostContent quillContent={data.textEditorContent} />

      <PostBottom
        postId={data.postId}
        tags={data.tags}
        type={type}
        isMyself={isMyself()}
      />
    </Content>
  );
}

Post.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  coverImageSrc: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
