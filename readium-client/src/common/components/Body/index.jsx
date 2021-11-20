import React from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  margin-top: 80px;
`;

const ColumnLeft = styled.div`
  padding: ${(props) => (props.isMobile ? "48px 36px" : "30px 80px 0")};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 750px) {
    padding: 48px 36px;
  }
`;

const ColumnRight = styled.div`
  width: 420px;
  padding: 30px 48px 0;
  border-left: 2px solid black;
  flex-shrink: 0;
`;

const FixedRight = styled.div`
  position: fixed;
  margin-left: 0;
  width: 322px;
`;

export default function Body({ contentLeft, contentRight }) {
  return (
    <Layout className="container">
      <ColumnLeft isMobile={isMobile}>{contentLeft}</ColumnLeft>
      <ColumnRight className="d-none d-xl-block">
        <FixedRight>{contentRight}</FixedRight>
      </ColumnRight>
    </Layout>
  );
}

Body.propTypes = {
  contentLeft: PropTypes.element.isRequired,
  contentRight: PropTypes.element.isRequired,
};
