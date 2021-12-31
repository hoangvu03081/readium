import React from "react";
import { useGetProfilePost } from "../../../common/api/postQuery";

export default function PostList({ userId }) {
  const { data } = useGetProfilePost(userId);
  if (data) console.log(data);
  return <></>;
}
