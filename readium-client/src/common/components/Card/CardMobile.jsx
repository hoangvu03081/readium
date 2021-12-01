import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LoveComment from "../Buttons/LoveComment";
import TagBtn from "../Buttons/TagBtn";

const Layout = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.CardBlack};
  border-radius: 4px;
  @media (min-width: 651px) {
    display: none;
  }
`;

const Top = styled.div`
  position: relative;
`;
const UserAvatar = styled.img`
  border-radius: 50%;
  height: 25px;
  width: 25px;
`;
const UserName = styled.p`
  color: ${({ theme }) => theme.colors.CardBlack};
  font-family: "Raleway";
  font-weight: 500;
  font-size: 14px;
  margin: 0;
`;
const Title = styled.p`
  color: ${({ theme }) => theme.colors.CardBlack};
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  margin: 0;
`;

const Bottom = styled.div``;
const Content = styled.p`
  color: ${({ theme }) => theme.colors.CardBlack};
  font-family: "Raleway";
  font-weight: 500;
  font-size: 18px;
  margin: 0;
`;
const FlexContainer = styled.div``;
const Left = styled.div``;
const Right = styled.div``;

export default function CardMobile({
  title,
  content,
  tags,
  user,
  userAvatar,
  loveNumber,
  commentNumber,
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
        <FlexContainer className="row">
          <Left className="col-6">
            {tags.map((item, index) => {
              // eslint-disable-next-line react/no-array-index-key
              if (index < 2) return <TagBtn key={index}>{item}</TagBtn>;
              return "";
            })}
          </Left>
          <Right className="col-6">
            <LoveComment
              loveNumber={loveNumber}
              commentNumber={commentNumber}
            />
          </Right>
        </FlexContainer>
      </Bottom>
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
};
