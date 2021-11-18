import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Card = styled.div`
  background-color: white;
`;

export default function Writer({ Name, Type }) {
  return (
    <Card>
      <div>{Name}</div>
      <div>{Type}</div>
    </Card>
  );
}

Writer.propTypes = {
  Name: PropTypes.string.isRequired,
  Type: PropTypes.string.isRequired,
};
