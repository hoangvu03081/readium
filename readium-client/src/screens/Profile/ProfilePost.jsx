import React, { useState } from "react";
import { UpperBorderButton } from "./components/style";
import SearchForm from "./SearchForm";
import PostList from "./components/PostList";
import DraftList from "./components/DraftList";

export default function ProfilePost({ userId, isMyProfile }) {
  const [isPost, setisPost] = useState(true);
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center">
        <UpperBorderButton
          className={isPost && "focus"}
          onClick={() => setisPost(true)}
        >
          Story
        </UpperBorderButton>
        {isMyProfile && (
          <UpperBorderButton
            onClick={() => setisPost(false)}
            className={`ms-5 ${!isPost && "focus"}`}
          >
            Draft
          </UpperBorderButton>
        )}
      </div>
      <div className="row mt-5">
        <div className="col-md-8 d-flex justify-content-center">
          {isPost ? <PostList userId={userId} /> : <DraftList />}
        </div>
        <div className="col-md-4">
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
