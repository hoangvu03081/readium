import React from "react";
import CardDesktop from "./CardDesktop";
import CardMobile from "./CardMobile";

export default function Card() {
  return (
    <>
      <CardDesktop
        preview="./src/assets/images/preview_2.png"
        title="Oniichan, Kimochi ~ ! Please touch me..."
        content="No Nut November? Thảo should be Nut Nut November! He is better than you."
        tags={["#kimochi", "#Okem", "Fresh", "#ikucu"]}
        duration={3}
        userAvatar="./src/assets/images/yasuo.png"
        loveNumber={3049}
        commentNumber={25}
      />
      <CardMobile
        title="Oniichan, Kimochi ~ ! Please touch me..."
        content="No Nut November? Thảo should be Nut Nut November! He is better than you."
        tags={["#kimochi", "#Okem", "Fresh", "#ikucu"]}
        user="VuHandsome"
        userAvatar="./src/assets/images/yasuo.png"
        loveNumber={3049}
        commentNumber={25}
      />
    </>
  );
}
