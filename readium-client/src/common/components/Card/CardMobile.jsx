/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Corner from "./Corner";
import LoveComment from "../Buttons/LoveComment";
import TagBtn from "../Buttons/TagBtn";
import StyledLink from "../StyledLink";

const Layout = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.CardBlack};
  border-radius: 4px;
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  @media (min-width: 651px) {
    display: none;
  }
`;

const Top = styled.div`
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.colors.CardBlack};
  padding: 13px;
`;
const UserAvatar = styled.img`
  border-radius: 50%;
  height: 26px;
  width: 26px;
  margin-bottom: 4px;
  &:hover {
    cursor: pointer;
  }
`;
const UserName = styled.p`
  color: ${({ theme }) => theme.colors.CardBlack};
  font-family: "Raleway";
  font-weight: 500;
  font-size: 14px;
  margin: 0 0 10px 0;
  &:hover {
    cursor: pointer;
  }
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.CardBlack};
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
`;

const Bottom = styled.div`
  padding: 13px;
`;
const Content = styled.p`
  color: ${({ theme }) => theme.colors.CardBlack};
  font-family: "Raleway";
  font-weight: 500;
  font-size: 18px;
  margin: 0 0 18px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;
const BottomFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;
const BottomLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const BottomRight = styled.div``;

const CornerContainer = styled.div`
  width: auto;
  position: absolute;
  top: 13px;
  right: 13px;
`;

export default function CardMobile({
  postId,
  profileId,
  title,
  content,
  tags,
  user,
  userAvatar,
  loveNumber,
  commentNumber,
  type,
  isSuggestion,
}) {
  const history = useHistory();
  const handleReadPost = () => {
    if (isSuggestion) {
      history.push(`/post/${postId}/reload`, postId);
    } else {
      history.push(`/post/${postId}`, postId);
    }
  };
  const handleProfile = () => {
    // const indexOfUserId = userAvatar.lastIndexOf("/");
    // const userId = userAvatar.slice(indexOfUserId + 1);
    history.push(`/profile/${profileId}`);
  };

  return (
    <Layout>
      <Top>
        <UserAvatar src={userAvatar} onClick={handleProfile} />
        <UserName onClick={handleProfile}>by {user}</UserName>
        <Title onClick={handleReadPost}>{title}</Title>
      </Top>

      <Bottom>
        <Content>{content}</Content>
        <BottomFlexContainer>
          <BottomLeft>
            {tags.map((item, index) => {
              if (index < 2)
                return (
                  <StyledLink
                    key={index}
                    to={`search?q=${encodeURIComponent(item)}`}
                  >
                    <TagBtn>{item}</TagBtn>
                  </StyledLink>
                );
              return "";
            })}
          </BottomLeft>
          <BottomRight>
            <LoveComment
              loveNumber={loveNumber}
              commentNumber={commentNumber}
            />
          </BottomRight>
        </BottomFlexContainer>
      </Bottom>

      <CornerContainer>
        <Corner type={type} />
      </CornerContainer>
    </Layout>
  );
}

CardMobile.propTypes = {
  postId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  loveNumber: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isSuggestion: PropTypes.bool,
};
CardMobile.defaultProps = {
  isSuggestion: false,
};
