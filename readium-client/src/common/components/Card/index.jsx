import React from "react";
import CardStyles from "./CardStyles";

export default function Card() {
  return (
    <CardStyles
      Preview="./src/assets/images/preview_2.png"
      Title="Oniichan, Kimochi ~ ! Please touch me..."
      Content="No Nut November? Thảo should be Nut Nut November! He is better than you."
      Tags={["#kimochi", "#Okem", "Fresh", "#ikucu"]}
      Duration={3}
      User="VuHandsome"
      UserAvatar="./src/assets/images/yasuo.png"
      LoveNumber={3049}
      CommentNumber={25}
    />
  );
}
