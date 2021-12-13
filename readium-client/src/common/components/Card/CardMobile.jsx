import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import LoveComment from "../Buttons/LoveComment";
import TagBtn from "../Buttons/TagBtn";
import { ReactComponent as AddCollection } from "../../../assets/icons/add_collection.svg";
import { ReactComponent as AddedCollection } from "../../../assets/icons/added_collection.svg";
import { ReactComponent as CardOptions } from "../../../assets/icons/card_options.svg";
import More from "./More";
import useOutsideClickAlerter from "../../hooks/useOutsideClickAlerter";

const Layout = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.CardBlack};
  border-radius: 4px;
  width: 100%;
  margin-bottom: 30px;
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
const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Right = styled.div``;

const Corner = styled.div`
  position: absolute;
  right: 13px;
  top: 13px;
  display: flex;
  justify-content: space-between;
  width: 60px;
  > svg:first-child,
  > svg:nth-child(2) {
    font-size: 26px;
    position: absolute;
    top: 0;
    left: 0;
  }
  svg {
    transition: all 0.25s;
    &:hover,
    &.active {
      cursor: pointer;
      transform: scale(1.15);
      transition: all 0.25s;
    }
  }
  &.hideOptions {
    > div {
      display: none;
    }
    > svg {
      right: 0;
      left: unset;
    }
  }
`;
const OutsideClickMoreOptions = styled.div`
  font-size: 24px;
  position: absolute;
  top: 0;
  right: 0;
`;
const MoreOptions = styled.div`
  position: absolute;
  top: 18px;
  right: -50px;
  transform: scale(0.85);
  &.hide {
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    transition: all 0.3s;
  }
  &.unhide {
    opacity: 1;
    z-index: 9;
    transition: all 0.3s;
  }
`;

export default function CardMobile({
  title,
  content,
  tags,
  user,
  userAvatar,
  loveNumber,
  commentNumber,
  hideOptions,
}) {
  const [addCollection, setAddCollection] = useState(0);
  const handleAddCollection = (state) => {
    if (state === 0) setAddCollection(1);
    else setAddCollection(0);
  };

  const [moreOptions, setMoreOptions] = useState(0);
  const handleMoreOptions = (state) => {
    if (state === 0) setMoreOptions(1);
    else setMoreOptions(0);
  };
  const outsideClickMoreOptions = useRef(null);
  useOutsideClickAlerter(outsideClickMoreOptions, () => {
    setMoreOptions(0);
  });

  return (
    <Layout>
      <Top>
        <UserAvatar src={userAvatar} />
        <UserName>by {user}</UserName>
        <Title>{title}</Title>
        <Corner className={hideOptions ? "hideOptions" : ""}>
          <AddCollection
            className={addCollection === 0 ? "d-block" : "d-none"}
            onClick={() => {
              handleAddCollection(addCollection);
            }}
          />
          <AddedCollection
            className={addCollection === 0 ? "d-none" : "d-block"}
            onClick={() => {
              handleAddCollection(addCollection);
            }}
          />
          <OutsideClickMoreOptions ref={outsideClickMoreOptions}>
            <CardOptions
              className={moreOptions === 0 ? "" : "active"}
              onClick={() => {
                handleMoreOptions(moreOptions);
              }}
            />
          </OutsideClickMoreOptions>
          <MoreOptions className={moreOptions === 0 ? "hide" : "unhide"}>
            <More />
          </MoreOptions>
        </Corner>
      </Top>
      <Bottom>
        <Content>{content}</Content>
        <FlexContainer className="">
          <Left className="">
            {tags.map((item, index) => {
              // eslint-disable-next-line react/no-array-index-key
              if (index < 2) return <TagBtn key={index}>{item}</TagBtn>;
              return "";
            })}
          </Left>
          <Right className="">
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
  hideOptions: PropTypes.bool.isRequired,
};
