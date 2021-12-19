import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";
import { ReactComponent as LoveIcon } from "../../../assets/icons/love.svg";
import { ReactComponent as CommentIcon } from "../../../assets/icons/comment_1.svg";
import { ReactComponent as ViewIcon } from "../../../assets/icons/watch.svg";

const StyledButtonGroup = styled.div`
  position: relative;
  display: inline-flex;
  border: 2px solid black;
  border-radius: 5px;
  overflow: hidden;

  .button {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 40px;
    outline: none;
    border: none;
    cursor: pointer;
    border-right: 2px solid black;
    background: white;
  }

  .button.focus {
    background: ${({ theme }) => theme.colors.lightGrey};
  }

  .button:last-child {
    border-right: none;
  }

  .button:hover {
    background: ${({ theme }) => theme.colors.lightGrey};
  }

  button svg {
    stroke-width: 2px;
    font-size: 18px;
  }

  button:nth-child(3) svg {
    fill: black;
  }

  button:nth-child(4) svg {
    fill: ${({ theme }) => theme.colors.accent};
  }

  button:nth-child(5) svg {
    fill: ${({ theme }) => theme.colors.CommentText};
  }
`;

const SortTag = styled.div`
  position: absolute;
  left: 0;
  top: 18px;
  left: ${(props) => props.left};
  z-index: 100;
  pointer-events: none;
`;

export default function ButtonGroup() {
  const [sortType, setSortType] = useState(-1);
  const handleSort = (value) => {
    if (value < -4 || value > 4) return setSortType(-1);
    if (sortType === value) return setSortType(-value);
    return setSortType(value);
  };
  const getSortTypeClass = (value) => {
    if (value === sortType || value === -sortType) return " focus";
    return "";
  };
  return (
    <StyledButtonGroup>
      <SortTag left={`${23 + (Math.abs(sortType) - 1) * 44}px`}>
        {sortType < 0 ? (
          <BsFillArrowDownCircleFill size={13} color="#F3274B" />
        ) : (
          <BsFillArrowUpCircleFill size={13} color="#2D76FF" />
        )}
      </SortTag>
      <button
        className={`button ${getSortTypeClass(1)}`}
        type="button"
        onClick={() => handleSort(1)}
      >
        <AiOutlineClockCircle />
      </button>
      <button
        className={`button ${getSortTypeClass(2)}`}
        type="button"
        onClick={() => handleSort(2)}
      >
        <ViewIcon />
      </button>
      <button
        className={`button ${getSortTypeClass(3)}`}
        type="button"
        onClick={() => handleSort(3)}
      >
        <LoveIcon />
      </button>
      <button
        className={`button ${getSortTypeClass(4)}`}
        type="button"
        onClick={() => handleSort(4)}
      >
        <CommentIcon />
      </button>
    </StyledButtonGroup>
  );
}
