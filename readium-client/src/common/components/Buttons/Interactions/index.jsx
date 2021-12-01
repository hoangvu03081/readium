import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Watch from "./Watch";
import Love from "./Love";
import Comment from "./Comment";
import { ReactComponent as WatchIcon } from "../../../../assets/icons/watch.svg";
import { ReactComponent as LoveIcon } from "../../../../assets/icons/love.svg";
import { ReactComponent as CommentIcon } from "../../../../assets/icons/comment_1.svg";

const InteractionStyle = styled.div`
  border: 2px solid black;
  border-radius: 4px;
  width: 100%;
  padding: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default function Interactions({
  watchNumber,
  loveNumber,
  commentNumber,
}) {
  return (
    <InteractionStyle className="interactions">
      <Watch>
        <WatchIcon />
        <span>{watchNumber}</span>
      </Watch>

      <Love>
        <LoveIcon />
        <span>{loveNumber}</span>
      </Love>

      <Comment>
        <CommentIcon />
        <span>{commentNumber}</span>
      </Comment>
    </InteractionStyle>
  );
}

Interactions.propTypes = {
  watchNumber: PropTypes.number.isRequired,
  loveNumber: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
};
