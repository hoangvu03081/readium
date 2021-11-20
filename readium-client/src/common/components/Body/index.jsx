import React from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  margin-top: 80px;
  justify-content: space-between;
`;

const ColumnLeft = styled.div`
  padding: ${(props) => (props.isMobile ? "48px 36px" : "30px 0 0 0")};
  margin-right: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1199px) {
    margin-right: 0;
    padding: 30px 80px;
  }
  @media (max-width: 750px) {
    padding: 48px 36px;
  }
`;

const ColumnRight = styled.div`
  position: fixed;
  top: 80px;
  bottom: 0;
  right: 0;
  width: 420px;
  padding: 30px 48px;
  overflow-y: scroll;
  border-left: 2px solid black;
`;

export default function Body({ contentLeft, contentRight }) {
  return (
    <Layout className={isMobile ? "" : "container-xl"}>
      <ColumnLeft isMobile={isMobile}>{contentLeft}</ColumnLeft>
      <ColumnRight className="d-none d-xl-block">{contentRight}</ColumnRight>
    </Layout>
  );
}

Body.propTypes = {
  contentLeft: PropTypes.element.isRequired,
  contentRight: PropTypes.element.isRequired,
};
