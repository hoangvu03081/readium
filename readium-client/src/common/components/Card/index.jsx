import React from "react";
import CardStyles from "./CardStyles";

export default function Card() {
  return (
    <CardStyles
      preview="./src/assets/images/preview_2.png"
      title="Oniichan, Kimochi ~ ! Please touch me..."
      content="No Nut November? Thảo should be Nut Nut November! He is better than you."
      tags={["#kimochi", "#Okem", "Fresh", "#ikucu"]}
      duration={3}
      user="VuHandsome"
      userAvatar="./src/assets/images/yasuo.png"
      loveNumber={3049}
      commentNumber={25}
    />
  );
}
