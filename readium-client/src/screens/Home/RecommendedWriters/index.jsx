/* eslint-disable react/no-array-index-key */
import React from "react";
import styled from "styled-components";
import { useAuth } from "../../../common/hooks/useAuth";
import { useGetRecommendedWriters } from "../../../common/api/otherQuery";
import { useGetMyProfile } from "../../../common/api/profileQuery";
import PuffLoader from "../../../common/components/PuffLoader";
import Writer from "./Writer";

const Background = styled.div`
  margin-top: 58px;
  p {
    font-family: "Raleway";
    font-size: 22px;
    text-align: center;
    margin: 0 0 35px 0;
  }
`;

export default function RecommendedWriters() {
  const auth = useAuth();
  const getMyProfile = useGetMyProfile(auth.auth);
  const getRecommendedWriters = useGetRecommendedWriters();

  // GET AUTHENTICATED USER
  let authId = "";
  if (auth.auth) {
    if (getMyProfile.isFetching) {
      return <PuffLoader />;
    }
    if (!getMyProfile.data || getMyProfile.isError) {
      return <div />;
    }
    authId = getMyProfile.data.data.profileId;
  }

  if (getRecommendedWriters.isFetching) {
    return <PuffLoader />;
  }
  if (!getRecommendedWriters.data || getRecommendedWriters.isError) {
    return <div />;
  }
  const recommendedWriters = getRecommendedWriters.data.data;

  return (
    <Background>
      <p>RECOMMENDED WRITERS</p>
      {recommendedWriters.map((item, index) => {
        if (item.profileId !== authId) {
          return (
            <Writer
              key={index}
              name={item.displayName}
              type={item.job}
              avatar={item.avatar}
              profileId={item.profileId}
            />
          );
        }
        return null;
      })}
    </Background>
  );
}

// <Writer
// name="Yasuo Brain Dog"
// type="Pick Lock/AFK/Pro Ngu"
// avatar="./src/assets/images/yasuo.png"
// />
// <Writer
// name="Son Dep"
// type="Teacher"
// avatar="./src/assets/images/yasuo.png"
// />
// <Writer
// name="Hai Xinh"
// type="Beautiful boy"
// avatar="./src/assets/images/yasuo.png"
// />
// <Writer
// name="Hai Xinh"
// type="Beautiful boy"
// avatar="./src/assets/images/yasuo.png"
// />
// <Writer
// name="Hai Xinh"
// type="Beautiful boy"
// avatar="./src/assets/images/yasuo.png"
// />
// <Writer
// name="Hai Xinh"
// type="Beautiful boy"
// avatar="./src/assets/images/yasuo.png"
// />
