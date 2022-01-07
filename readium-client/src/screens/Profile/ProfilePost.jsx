import React, { useState } from "react";
import { UpperBorderButton } from "./components/style";
import SearchForm from "./SearchForm";
import PostList from "./components/PostList";
import DraftList from "./components/DraftList";

export default function ProfilePost({ userId, isMyProfile }) {
  const [isPost, setIsPost] = useState(true);
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center">
        <UpperBorderButton
          className={isPost && "focus"}
          onClick={() => setIsPost(true)}
        >
          Story
        </UpperBorderButton>
        {isMyProfile && (
          <UpperBorderButton
            onClick={() => setIsPost(false)}
            className={`ms-5 ${!isPost && "focus"}`}
          >
            Draft
          </UpperBorderButton>
        )}
      </div>
      <div className="row mt-5">
        <div className="col-md-8 d-flex align-items-center flex-column">
          {isPost ? (
            <PostList isMyProfile={isMyProfile} userId={userId} />
          ) : (
            <DraftList />
          )}
        </div>
        <div className="col-md-4 d-md-block d-none">
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
