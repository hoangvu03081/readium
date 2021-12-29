import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PostInfo from "./PostInfo";
import PostContent from "./PostContent";
import TagBtn from "../Buttons/TagBtn";
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
  @media (max-width: 450px) {
    font-size: 28px;
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
  @media (max-width: 450px) {
    font-size: 18px;
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

const PostTags = styled.div`
  border-top: 1px solid #d7d7d7;
  padding-top: 13px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
// -----------------------------------------------------------------

export default function Post({ data, coverImageSrc, type }) {
  return (
    <Content>
      <PreviewTitle className={type === "preview" ? "d-block" : "d-none"}>
        Preview your post
      </PreviewTitle>

      <PostTitle>{data.title}</PostTitle>

      <PostDescription>{data.description}</PostDescription>

      <PostInfo
        author={data.author}
        publishedDate="Just now"
        duration={data.duration}
        type={type}
      />

      <PostCoverImage src={coverImageSrc} />

      <HorizontalLine />

      <PostContent quillContent={data.textEditorContent} />

      <PostTags>
        {data.tags.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TagBtn key={index}>{item}</TagBtn>
        ))}
      </PostTags>
    </Content>
  );
}

Post.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  coverImageSrc: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
