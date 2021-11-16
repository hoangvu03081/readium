import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Love from "./Love";
import Comment from "./Comment";
import { ReactComponent as LoveIcon } from "../../../../assets/icons/love.svg";
import { ReactComponent as CommentIcon } from "../../../../assets/icons/comment_2.svg";

const LoveCommentStyle = styled.div`
  border: 2px solid black;
  border-radius: 4px;
  width: 116px;
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default function LoveComment({ LoveNumber, CommentNumber }) {
  return (
    <LoveCommentStyle>
      <Love>
        <LoveIcon />
        <span>{LoveNumber}</span>
      </Love>

      <Comment>
        <CommentIcon />
        <span>{CommentNumber}</span>
      </Comment>
    </LoveCommentStyle>
  );
}

LoveComment.propTypes = {
  LoveNumber: PropTypes.number.isRequired,
  CommentNumber: PropTypes.number.isRequired,
};
