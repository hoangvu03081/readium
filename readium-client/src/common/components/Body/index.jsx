import React from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 80px;
  justify-content: space-between;
  @media (max-width: 1399px) {
    padding: 0 30px 0 80px;
  }
  @media (max-width: 1299px) {
    padding: 0 30px 0 60px;
  }
`;

const ColumnLeft = styled.div`
  padding: ${(props) => (props.isMobile ? "48px 36px" : "30px 80px 0 0")};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid black;
  min-height: 100vh;
  @media (max-width: 1299px) {
    padding: 30px 60px 0 0;
  }
  @media (max-width: 1199px) {
    margin-right: 0;
    padding: 30px 80px;
    border: none;
  }
  @media (max-width: 750px) {
    padding: 48px 36px;
  }
`;

const ColumnRight = styled.div`
  width: 380px;
  height: calc(100vh - 80px);
  overflow-y: scroll;
  padding: 30px 18px 30px 48px;
`;

const FixedRight = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 80px;
  height: 0;
`;

export default function Body({ contentLeft, contentRight }) {
  return (
    <Layout className={isMobile ? "" : "container-xxl"}>
      <ColumnLeft isMobile={isMobile}>{contentLeft}</ColumnLeft>
      <FixedRight className="d-none d-xl-block">
        <ColumnRight>{contentRight}</ColumnRight>
      </FixedRight>
    </Layout>
  );
}

Body.propTypes = {
  contentLeft: PropTypes.element.isRequired,
  contentRight: PropTypes.element.isRequired,
};
