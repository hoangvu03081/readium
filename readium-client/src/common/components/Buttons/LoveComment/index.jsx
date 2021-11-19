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
  width: 140px;
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  &:hover {
    cursor: pointer;
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

export default function LoveComment({ LoveNumber, CommentNumber }) {
  return (
    <LoveCommentStyle>
      <Love>
        <LoveIcon />
        <span>{convert(LoveNumber)}</span>
      </Love>

      <Comment>
        <CommentIcon />
        <span>{convert(CommentNumber)}</span>
      </Comment>
    </LoveCommentStyle>
  );
}

LoveComment.propTypes = {
  LoveNumber: PropTypes.number.isRequired,
  CommentNumber: PropTypes.number.isRequired,
};
