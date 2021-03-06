import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: block;
  margin: 50px auto;
  width: 100%;
  height: 60px;
  background-color: white;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  transition: all 0.25s;
  i {
    margin-right: 10px;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid #000000;
    transition: all 0.25s;
  }
`;

export default function ToCommentBtn() {
  const handleToCommentBtn = () => {
    document
      .getElementById("comment_section")
      .scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Button onClick={handleToCommentBtn}>
      <i className="ionicons ion-arrow-down-c" />
      To comment section
    </Button>
  );
}
