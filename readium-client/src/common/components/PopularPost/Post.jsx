import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TagBtn from "../Buttons/TagBtn";
import Interactions from "../Buttons/Interactions";

const Card = styled.div`
  margin-bottom: 50px;
  border: 2px solid ${({ theme }) => theme.colors.PopularPostBlack};
  border-radius: 6px;
  padding: 30px;
`;

const Top = styled.div`
  margin-bottom: 10px;
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
    &:hover {
      cursor: pointer;
    }
  }
  h2 {
    margin: 0 0 5px 0;
    font-family: "Raleway";
    font-weight: bold;
    font-size: 18px;
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
    height: 100%;
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
    &:hover {
      cursor: pointer;
    }
  }
  @media (max-width: 900px) {
    p {
      font-size: 16px;
    }
    button {
      font-size: 16px;
    }
  }
`;

export default function Post({
  Title,
  User,
  UserAvatar,
  Date,
  Tags,
  Preview,
  Content,
  WatchNumber,
  LoveNumber,
  CommentNumber,
}) {
  return (
    <Card>
      <Top className="row">
        <TopLeft className="col-9">
          <p>{Title}</p>
          {Tags.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TagBtn key={index}>{item}</TagBtn>
          ))}
        </TopLeft>
        <TopRight className="col-3">
          <h1>{Date}</h1>
          <h2>by {User}</h2>
          <img src={UserAvatar} alt="" />
        </TopRight>
      </Top>
      <Bottom className="row">
        <BottomLeft className="col-6">
          <img src={Preview} alt="" />
        </BottomLeft>
        <BottomRight className="col-6">
          <p>{Content}</p>
          <Interactions
            WatchNumber={WatchNumber}
            LoveNumber={LoveNumber}
            CommentNumber={CommentNumber}
          />
        </BottomRight>
      </Bottom>
    </Card>
  );
}

Post.propTypes = {
  Title: PropTypes.string.isRequired,
  User: PropTypes.string.isRequired,
  UserAvatar: PropTypes.string.isRequired,
  Date: PropTypes.string.isRequired,
  Tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  Preview: PropTypes.string.isRequired,
  Content: PropTypes.string.isRequired,
  WatchNumber: PropTypes.number.isRequired,
  LoveNumber: PropTypes.number.isRequired,
  CommentNumber: PropTypes.number.isRequired,
};
