import React from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 80px;
  justify-content: space-between;
`;

const ColumnLeft = styled.div`
  padding: ${(props) => (props.isMobile ? "48px 36px" : "30px 80px 13px")};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid black;
  min-height: 100vh;
  @media (max-width: 1399px) {
    padding: 30px 80px 30px 68px;
  }
  @media (max-width: 1299px) {
    padding: 30px 60px 30px 48px;
  }
  @media (max-width: 1199px) {
    margin-right: 0;
    padding: 30px 80px;
    border: none;
  }
  @media (max-width: 750px) {
    padding: 48px 36px;
  }
  @media (max-width: 650px) {
    padding: 48px 60px;
  }
  @media (max-width: 460px) {
    padding: 48px 20px;
  }
`;

const FixedScroll = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 80px;
  height: 0;
`;

const ColumnRight = styled.div`
  width: 405px;
  height: calc(100vh - 80px);
  padding: 30px 30px 30px 42px;
  overflow-y: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 1400px) {
    width: 420px;
    padding: 30px 42px;
  }
`;

export default function Body({ contentLeft, contentRight }) {
  return (
    <Layout className={isMobile ? "" : "container-xxl"}>
      <ColumnLeft isMobile={isMobile}>{contentLeft}</ColumnLeft>
      <FixedScroll className="d-none d-xl-block">
        <ColumnRight>{contentRight}</ColumnRight>
      </FixedScroll>
    </Layout>
  );
}

Body.propTypes = {
  contentLeft: PropTypes.element.isRequired,
  contentRight: PropTypes.element.isRequired,
};
