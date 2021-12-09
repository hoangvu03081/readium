import React, { useState } from "react";
import { UpperBorderButton } from "./components/style";
import SearchForm from "./SearchForm";

export default function ProfilePost({ id }) {
  const [isStory, setIsStory] = useState(true);
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center">
        <UpperBorderButton
          className={isStory && "focus"}
          onClick={() => setIsStory(true)}
        >
          Story
        </UpperBorderButton>
        {!id && (
          <UpperBorderButton
            onClick={() => setIsStory(false)}
            className={`ms-5 ${!isStory && "focus"}`}
          >
            Draft
          </UpperBorderButton>
        )}
      </div>
      <div className="row mt-5">
        <div className="col-md-8 col-s"></div>
        <div className="col-md-4">
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
