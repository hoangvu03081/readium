import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
  background-color: white;
  border: 2px solid black;
  width: 45px;
  height: 45px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.25s;
  &.show {
    opacity: 1;
    transition: all 0.3s;
  }
  &.hide {
    pointer-events: none;
    opacity: 0;
    transition: all 0.3s;
  }
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.25s;
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 450) {
      setVisible(true);
    } else if (scrolled <= 450) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button className={visible ? "show" : "hide"} onClick={scrollToTop}>
      <i className="ionicons ion-chevron-up" />
    </Button>
  );
};

export default ScrollButton;
