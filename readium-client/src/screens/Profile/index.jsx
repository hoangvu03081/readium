import React, { useEffect } from "react";
import HeaderPadding from "../../common/components/HeaderPadding";
import ProfileContent from "./ProfileContent";
import useRouter from "../../common/hooks/useRouter";
import { useAuth } from "../../common/hooks/useAuth";

export default function Profile() {
  const { query, push } = useRouter();
  const { auth } = useAuth();
  useEffect(() => {
    if (!query.profileId) push("/404");
  }, [query.profileId]);

  return (
    <HeaderPadding>
      <ProfileContent
        id={query.profileId}
        isMyProfile={query.profileId === auth.profileId}
      />
    </HeaderPadding>
  );
}
