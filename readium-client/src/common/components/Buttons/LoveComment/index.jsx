import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Love from "./Love";
import Comment from "./Comment";
import { ReactComponent as LoveIcon } from "../../../../assets/icons/love.svg";
import { ReactComponent as CommentIcon } from "../../../../assets/icons/comment_2.svg";

const LoveCommentStyle = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 4px;
  padding: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 650px) {
    > button:first-child {
      color: ${({ theme }) => theme.colors.LoveText};
      path,
      svg {
        fill: ${({ theme }) => theme.colors.LoveText};
        stroke: ${({ theme }) => theme.colors.LoveText};
      }
      &:hover {
        background-color: ${({ theme }) => theme.colors.LoveText};
        color: ${({ theme }) => theme.colors.LoveCommentBackground};
        path {
          fill: ${({ theme }) => theme.colors.LoveCommentBackground};
          stroke: ${({ theme }) => theme.colors.LoveCommentBackground};
          transition: all 0.3s;
        }
        transition: all 0.3s;
      }
    }
    > button:nth-child(2) {
      color: ${({ theme }) => theme.colors.CommentText};
      svg {
        fill: ${({ theme }) => theme.colors.CommentText};
      }
      &:hover {
        background-color: ${({ theme }) => theme.colors.CommentText};
        color: ${({ theme }) => theme.colors.LoveCommentBackground};
        svg {
          fill: ${({ theme }) => theme.colors.LoveCommentBackground};
        }
      }
    }
  }
`;

const convert = (n) => {
  if (n >= 1000) {
    const temp = parseFloat((n / 1000.0).toFixed(1));
    if (temp - Math.floor(temp) === 0) return `${temp.toFixed(0).toString()}k`;
    return `${temp}k`;
  }
  return n;
};

export default function LoveComment({ loveNumber, commentNumber }) {
  return (
    <LoveCommentStyle>
      <Love>
        <LoveIcon />
        <span>{convert(loveNumber)}</span>
      </Love>

      <Comment>
        <CommentIcon />
        <span>{convert(commentNumber)}</span>
      </Comment>
    </LoveCommentStyle>
  );
}

LoveComment.propTypes = {
  loveNumber: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
};
