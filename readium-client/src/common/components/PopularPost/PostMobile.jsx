import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Interactions from "../Buttons/Interactions";
import TagBtn from "../Buttons/TagBtn";

const Layout = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.PopularPostBlack};
  width: 100%;
  .interactions {
    border: none;
    border-top: 2px solid ${({ theme }) => theme.colors.PopularPostBlack};
    border-radius: 0;
  }
  @media (min-width: 651px) {
    display: none;
  }
`;

const Title = styled.p`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 24px;
  margin: 0;
  margin: 20px 30px;
  text-align: center;
`;

const Preview = styled.img`
  width: 82%;
  border-radius: 4px;
  object-fit: cover;
  display: block;
  margin-top: 0;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const PostInfo = styled.div`
  margin-top: 0;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`;
const UserAvatar = styled.img`
  display: block;
  height: 42px;
  width: 42px;
  margin: auto;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;
const UserName = styled.p`
  margin: 0;
  text-align: center;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.PopularPostUser};
  margin-bottom: 1px;
`;
const Date = styled.p`
  margin: 0;
  text-align: center;
  font-family: "PT Sans";
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.PopularPostBlack};
`;

const PostTags = styled.div`
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
  }
  margin: 0 20px 20px;
`;

export default function PostMobile({
  title,
  user,
  userAvatar,
  date,
  tags,
  preview,
  watchNumber,
  loveNumber,
  commentNumber,
}) {
  return (
    <Layout>
      <Title>{title}</Title>
      <Preview src={preview} />
      <PostInfo>
        <UserAvatar src={userAvatar} alt="" />
        <UserName>by {user}</UserName>
        <Date>{date}</Date>
      </PostInfo>
      <PostTags>
        <div>
          {tags.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TagBtn key={index}>{item}</TagBtn>
          ))}
        </div>
      </PostTags>
      <Interactions
        watchNumber={watchNumber}
        loveNumber={loveNumber}
        commentNumber={commentNumber}
      />
    </Layout>
  );
}

PostMobile.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  preview: PropTypes.string.isRequired,
  watchNumber: PropTypes.number.isRequired,
  loveNumber: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
};
