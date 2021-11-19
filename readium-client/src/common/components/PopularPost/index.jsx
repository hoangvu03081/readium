import React from "react";
import Post from "./Post";

export default function PopularPost() {
  return (
    <Post
      Title="Coding is bad for your health and your soul"
      User="Oniichan"
      UserAvatar="./src/assets/images/yasuo.png"
      Date="11/4/2021"
      Tags={["#health", "#coding", "#programmer", "#NNN", "#pain", "#Hayasuo"]}
      Preview="./src/assets/images/preview_1.png"
      Content="Does programming affect your health in the long run? Are old programmers suffering from back pain, etc? Is there a way to avoid it?"
      WatchNumber={10253}
      LoveNumber={3021}
      CommentNumber={2050}
    />
  );
}
