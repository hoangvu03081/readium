import React from "react";
import HeaderPadding from "../../common/components/HeaderPadding";
import ProfileContent from "./ProfileContent";
import useRouter from "../../common/hooks/useRouter";

export default function Profile() {
  const { query } = useRouter();
  return (
    <HeaderPadding>
      <ProfileContent id={query.profileId} />
    </HeaderPadding>
  );
}
