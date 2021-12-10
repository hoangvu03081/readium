/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import StoryInformation from "./StoryInformation";
import StoryContent from "./StoryContent";
import BackToTop from "../../common/components/Buttons/BackToTop";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Layout = styled.div`
  margin-top: 80px;
  padding-top: 80px;
  padding-bottom: 80px;
`;

const SubmitBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.button`
  border: 2px solid #000000;
  border-radius: 50px;
  color: #000000;
  background-color: #ffffff;
  width: 111px;
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  padding: 5px 0;
  margin-top: 40px;
  transition: all 0.35s;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #000000;
    transition: all 0.35s;
  }
`;

export default function WritePost() {
  const [id, setId] = useState("");

  useEffect(() => {
    async function initPost() {
      const res = await axios.post(
        "http://localhost:5000/posts",
        {},
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzkxMjcyMDM0MzksInZ1eCI6IjYxYjMxODgwMjM2MGExN2FhNjM5MDg0MCIsImV4cCI6MTYzOTQ0Mjc3OTQzOX0.T5YrmjtRb-ZBUUBzzRKT5j48uRkD4uLm6x0mCZZjxKs687ORYSjde6ygeArZfY0cnmJZxj9-600WrTjr3y75oMmzVsHb_CkRXRPcScFZ5jfe2175IQyA9fJJdFYlCVVuUKUA0FUvTcA7zJzS-p1lgw4LE9_e-dJ0bMcP7x6hVWHbSGylieO_k7WtuZlT2BmNAZdKvtjHAKtQaIdkFGpddG0BiNEuRKVzX-oyeFew0cmDf_yodbN-IiRjQH4ycbEkLBchY06Lyzbmeytwg_3ZskRS4PxlKfBJkALe8PEM-XAxPahXvAwF4hMbnSmXt2LcR5e4gExiVQyLg7pWGMZH_3KUe6O6AOI_-xFPLiIRXyNntoXeqwTwSJIemxMkbqb8diYA0xpozoMgdQAmahiCImFSzaC_uvxlyfGtJSWHaGPyPVaWRCKgOQqXpGzWzg1lIs7h1BihccjedDhwrixZY-UYu0CIJhG7c7Jy_FLqXPgVcY-2JEEjJ61eTeCio0s7UOKbzgIvzOpZYTIuUsn-yX_Xj2PwrO4fhj_Id5zseJa9l57E__8aVB1trJTfNZU7OxBzdXBVfttkHpzOkmGVuivPZdlZ47XTjfgXWixsI3sZDkI0qwYHdjJLr_nTWsg9Sjw-HwPpuVbGtiT5IOSGhW0PwBSkC7kotnk1FUsoaAg",
          },
        }
      );
      setId(res.data.id);
    }
    initPost();
  }, []);
  return (
    <Layout className="container">
      <StoryInformation />
      <StoryContent id={id} />
      <SubmitBtnContainer>
        <SubmitBtn>Submit</SubmitBtn>
      </SubmitBtnContainer>
      <BackToTop />
    </Layout>
  );
}
