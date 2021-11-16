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
  width: ${(props) => (props.isMobile ? "100%" : "70%")};
  border-right: 2px solid black;
  padding: ${(props) => (props.isMobile ? "48px 36px" : "30px 80px 0")};
`;

const ColumnRight = styled.div`
  width: 30%;
  display: ${(props) => (props.isMobile ? "none" : "block")};
  padding: 30px 48px 0;
`;

export default function Body({ ContentLeft, ContentRight }) {
  return (
    <Layout>
      <ColumnLeft isMobile={isMobile}>{ContentLeft}</ColumnLeft>
      <ColumnRight isMobile={isMobile}>{ContentRight}</ColumnRight>
    </Layout>
  );
}

Body.propTypes = {
  ContentLeft: PropTypes.element.isRequired,
  ContentRight: PropTypes.element.isRequired,
};