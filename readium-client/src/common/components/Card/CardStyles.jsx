import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TagBtn from "../Buttons/TagBtn";
import LoveComment from "../Buttons/LoveComment";
import { ReactComponent as AddCollection } from "../../../assets/icons/add_collection.svg";
import { ReactComponent as CardOptions } from "../../../assets/icons/card_options.svg";

const Card = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.CardBlack};
  border-radius: 5px;
  width: 91%;
  height: 204px;
  padding: 33px 20px;
  margin-bottom: 42px;
  position: relative;
  @media (max-width: 930px) {
    width: 100%;
    padding: 20px;
  }
`;

const Left = styled.div`
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  img {
    width: auto;
    height: 138px;
    object-fit: cover;
    border-radius: 8px;
    transition: all 0.4s;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      transition: all 0.4s;
    }
  }
`;

const Middle = styled.div`
  padding: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    margin: 0;
    font-family: "Raleway";
    font-weight: bold;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.CardBlack};
    &:hover {
      cursor: pointer;
    }
  }
  p {
    margin: 0;
    font-family: "PT Sans";
    font-size: 13px;
    color: ${({ theme }) => theme.colors.CardContent};
    &:hover {
      cursor: pointer;
    }
  }
  button {
    margin-right: 10px;
    margin-bottom: 2px;
  }
`;

const Right = styled.div`
  position: relative;
  svg:first-child {
    font-size: 37px;
    position: absolute;
    right: 50px;
    top: -4px;
    &:hover {
      cursor: pointer;
    }
  }
  svg:nth-child(2) {
    font-size: 30px;
    position: absolute;
    right: 5px;
    top: 0;
    &:hover {
      cursor: pointer;
    }
  }
  p {
    margin: 0;
    font-family: "Lato";
    font-weight: bold;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.CardBlack};
    position: absolute;
    right: 5px;
    bottom: 51px;
    &:hover {
      cursor: pointer;
    }
    &:after {
      content: "";
      border: 1px solid ${({ theme }) => theme.colors.CardBlack};
      width: 100%;
      opacity: 0;
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      transition: all 0.3s;
    }
    &:hover::after {
      opacity: 1;
      transition: all 0.3s;
    }
  }
  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    position: absolute;
    right: 5px;
    bottom: 0;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Corner = styled.div`
  width: 140px;
  padding: 0;
  position: absolute;
  right: -70px;
  top: -21px;
  @media (max-width: 950px) {
    right: -30px;
    top: -30px;
  }
`;

export default function CardStyles({
  preview,
  title,
  content,
  tags,
  duration,
  user,
  userAvatar,
  loveNumber,
  commentNumber,
}) {
  return (
    <Card className="row">
      <Left className="col-3">
        <img src={preview} alt="" />
      </Left>
      <Middle className="col-7">
        <h1>{title}</h1>
        <p>{content}</p>
        <div>
          {tags.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TagBtn key={index}>{item}</TagBtn>
          ))}
        </div>
      </Middle>
      <Right className="col-2">
        <AddCollection />
        <CardOptions />
        <p>{duration > 1 ? `${duration} mins read` : `${duration} min read`}</p>
        <img src={userAvatar} alt="" />
      </Right>
      <Corner>
        <LoveComment loveNumber={loveNumber} commentNumber={commentNumber} />
      </Corner>
    </Card>
  );
}

CardStyles.propTypes = {
  preview: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  loveNumber: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
};
