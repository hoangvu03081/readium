import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Interactions from "../../../common/components/Buttons/Interactions";
import TagBtn from "../../../common/components/Buttons/TagBtn";
import { ReactComponent as AddCollectionBtn } from "../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollectionBtn } from "../../../assets/icons/added_collection.svg";

const Layout = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.PopularPostBlack};
  width: 100%;
  position: relative;
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
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 360px) {
    font-size: 22px;
  }
`;

const Preview = styled.img`
  width: 82%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  display: block;
  margin-top: 0;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.25s;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.25s;
  }
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
  &:hover {
    cursor: pointer;
  }
`;

const UserName = styled.p`
  margin: 0;
  text-align: center;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.PopularPostUser};
  margin-bottom: 1px;
  &:hover {
    cursor: pointer;
  }
`;

const Date = styled.p`
  margin: 0;
  text-align: center;
  font-family: "PT Sans";
  font-weight: bold;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.PopularPostBlack};
  &:hover {
    cursor: pointer;
  }
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

const ButtonContainer = styled.div`
  position: absolute;
  top: -22px;
  right: -22px;
  background-color: white;
  width: 45px;
  height: 45px;
  border: 2px solid black;
  border-radius: 50%;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 40px;
    padding: 6px;
    transition: all 0.25s;
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
      transition: all 0.25s;
    }
  }
`;

export default function PostMobile({
  postId,
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
  const [isAddedCollection, setIsAddedCollection] = useState(false);
  const handleAddCollection = () => {
    if (isAddedCollection) {
      setIsAddedCollection(false);
    } else {
      setIsAddedCollection(true);
    }
  };

  const history = useHistory();
  const handleReadPost = () => {
    history.push(`/post/${postId}`, postId);
  };

  return (
    <Layout>
      <Title onClick={handleReadPost}>{title}</Title>

      <Preview src={preview} alt="Cover Image" onClick={handleReadPost} />

      <PostInfo>
        <UserAvatar src={userAvatar} alt="" />
        <UserName>by {user}</UserName>
        <Date onClick={handleReadPost}>{date}</Date>
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

      <ButtonContainer onClick={handleAddCollection}>
        <AddCollectionBtn
          className={isAddedCollection ? "d-none" : "d-block"}
        />
        <AddedCollectionBtn
          className={isAddedCollection ? "d-block" : "d-none"}
        />
      </ButtonContainer>
    </Layout>
  );
}

PostMobile.propTypes = {
  postId: PropTypes.string.isRequired,
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
