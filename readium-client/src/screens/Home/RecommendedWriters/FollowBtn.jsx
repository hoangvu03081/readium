import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as FollowIcon } from "../../../assets/icons/follow.svg";
import { ReactComponent as FollowedIcon } from "../../../assets/icons/followed.svg";
import OnClickRequireAuth from "../../../common/components/OnClickRequireAuth";

const FollowBtnStyle = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.FollowBtnText};
  border-radius: 50%;
  height: 38px;
  width: 38px;
  background-color: ${({ theme }) => theme.colors.FollowBtnBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: ${({ theme }) => theme.colors.FollowBtnText};
  }
  svg:first-child {
    font-size: 18px;
  }
  svg:last-child {
    font-size: 30px;
  }
  transition: all 0.4s;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.FollowBtnText};
    svg {
      fill: ${({ theme }) => theme.colors.FollowBtnBackground};
      path {
        fill: ${({ theme }) => theme.colors.FollowBtnBackground};
      }
    }
    transition: all 0.4s;
  }
`;

export default function FollowBtn({ isFollowed, handleFollow }) {
  return (
    <OnClickRequireAuth>
      <FollowBtnStyle onClick={handleFollow}>
        <FollowIcon className={isFollowed ? "d-none" : "d-block"} />
        <FollowedIcon className={isFollowed ? "d-block" : "d-none"} />
      </FollowBtnStyle>
    </OnClickRequireAuth>
  );
}

FollowBtn.propTypes = {
  isFollowed: PropTypes.bool,
  handleFollow: PropTypes.func.isRequired,
};
FollowBtn.defaultProps = {
  isFollowed: null,
};
