import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Corner from "./Corner";
import LoveComment from "../Buttons/LoveComment";
import TagBtn from "../Buttons/TagBtn";

// STYLES --------------------------------------------------
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
// ----------------------------------------------------------

export default function CardMobile({
  title,
  content,
  tags,
  user,
  userAvatar,
  loveNumber,
  commentNumber,
  type,
}) {
  return (
    <Layout>
      <Top>
        <UserAvatar src={userAvatar} />
        <UserName>by {user}</UserName>
        <Title>{title}</Title>
      </Top>

      <Bottom>
        <Content>{content}</Content>
        <BottomFlexContainer>
          <BottomLeft>
            {tags.map((item, index) => {
              // eslint-disable-next-line react/no-array-index-key
              if (index < 2) return <TagBtn key={index}>{item}</TagBtn>;
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
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  loveNumber: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
