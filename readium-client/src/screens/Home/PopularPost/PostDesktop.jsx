import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Interactions from "../../../common/components/Buttons/Interactions";
import TagBtn from "../../../common/components/Buttons/TagBtn";
import { ReactComponent as AddCollectionBtn } from "../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollectionBtn } from "../../../assets/icons/added_collection.svg";

const Card = styled.div`
  width: 100%;
  margin-bottom: 50px;
  padding: 30px;
  border: 2px solid ${({ theme }) => theme.colors.PopularPostBlack};
  border-radius: 6px;
  position: relative;
  @media (max-width: 650px) {
    display: none;
  }
`;

const Top = styled.div`
  margin-bottom: 20px;
`;
const TopLeft = styled.div`
  p {
    font-family: "Raleway";
    font-weight: bold;
    font-size: 36px;
    margin: 0 0 15px 0;
    &:hover {
      cursor: pointer;
    }
  }
  button {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  @media (max-width: 900px) {
    p {
      font-size: 32px;
    }
  }
  @media (max-width: 800px) {
    p {
      font-size: 28px;
    }
  }
  @media (max-width: 700px) {
    p {
      font-size: 24px;
    }
  }
`;
const TopRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  h1 {
    margin: 0 0 3px 0;
    font-family: "PT Sans";
    font-weight: bold;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.PopularPostBlack};
  }
  h2 {
    margin: 0 0 5px 0;
    font-family: "Raleway";
    font-weight: bold;
    font-size: 16px;
    text-align: right;
    color: ${({ theme }) => theme.colors.PopularPostUser};
    &:hover {
      cursor: pointer;
    }
  }
  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Bottom = styled.div``;
const BottomLeft = styled.div`
  img {
    width: 100%;
    height: 210px;
    object-fit: cover;
    transition: all 0.5s;
    &:hover {
      cursor: pointer;
      opacity: 0.77;
      transition: all 0.5s;
    }
  }
`;
const BottomRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    margin: 0;
    font-family: "Raleway";
    font-weight: bold;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.PopularPostBlack};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
  }
  @media (max-width: 900px) {
    p,
    button,
    svg {
      font-size: 16px;
    }
  }
  @media (max-width: 800px) {
    p,
    button,
    svg {
      font-size: 15px;
    }
  }
  @media (max-width: 700px) {
    p,
    button,
    svg {
      font-size: 14px;
    }
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 77px;
  right: -24px;
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

export default function PostDesktop({
  title,
  user,
  userAvatar,
  date,
  tags,
  preview,
  content,
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
  return (
    <Card>
      <Top className="row">
        <TopLeft className="col-9">
          <p>{title}</p>
          {tags.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TagBtn key={index}>{item}</TagBtn>
          ))}
        </TopLeft>
        <TopRight className="col-3">
          <h1>{date}</h1>
          <h2>by {user}</h2>
          <img src={userAvatar} alt="" />
        </TopRight>
      </Top>

      <Bottom className="row">
        <BottomLeft className="col-6">
          <img src={preview} alt="" />
        </BottomLeft>
        <BottomRight className="col-6">
          <p>{content}</p>
          <Interactions
            watchNumber={watchNumber}
            loveNumber={loveNumber}
            commentNumber={commentNumber}
          />
        </BottomRight>
      </Bottom>

      <ButtonContainer onClick={handleAddCollection}>
        <AddCollectionBtn
          className={isAddedCollection ? "d-none" : "d-block"}
        />
        <AddedCollectionBtn
          className={isAddedCollection ? "d-block" : "d-none"}
        />
      </ButtonContainer>
    </Card>
  );
}

PostDesktop.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  preview: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  watchNumber: PropTypes.number.isRequired,
  loveNumber: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
};
