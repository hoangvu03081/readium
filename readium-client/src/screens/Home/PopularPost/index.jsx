import React from "react";
import PostDesktop from "./PostDesktop";
import PostMobile from "./PostMobile";

export default function PopularPost() {
  return (
    <>
      <PostDesktop
        title="Coding is bad for your health and your soul"
        user="Oniichan"
        userAvatar="./src/assets/images/yasuo.png"
        date="11/4/2021"
        tags={[
          "#health",
          "#coding",
          "#programmer",
          "#NNN",
          "#pain",
          "#Hayasuo",
        ]}
        preview="./src/assets/images/preview_1.png"
        content="Does programming affect your health in the long run? Are old programmers suffering from back pain, etc? Is there a way to avoid it?"
        watchNumber={10253}
        loveNumber={3021}
        commentNumber={2050}
      />
      <PostMobile
        title="Coding is bad for your health and your soul"
        user="Oniichan"
        userAvatar="./src/assets/images/yasuo.png"
        date="11/4/2021"
        tags={[
          "#health",
          "#coding",
          "#programmer",
          "#NNN",
          "#pain",
          "#Hayasuo",
        ]}
        preview="./src/assets/images/preview_1.png"
        watchNumber={10253}
        loveNumber={3021}
        commentNumber={2050}
      />
    </>
  );
}
