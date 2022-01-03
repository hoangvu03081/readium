import React from "react";
import PropTypes from "prop-types";
import { usePost } from "../../../common/api/postQuery";
import Card from "../../../common/components/Card";
import PuffLoader from "../../../common/components/PuffLoader";

export default function CollectionCard({ post, collectionId, refetchList }) {
  const postContent = usePost(post.id);
  const postCoverImage = post.coverImage;

  if (postContent.isFetching) {
    return <PuffLoader />;
  }
  if (postContent.isError || !postContent.data) {
    return <div />;
  }
  const { data } = postContent.data;

  return (
    <Card
      key={data.id}
      postId={data.id}
      profileId={data.author.profileId}
      userId={data.author.profileId}
      preview={postCoverImage}
      title={data.title}
      content={data.content || data.description}
      tags={data.tags}
      duration={data.duration}
      user={data.author.displayName}
      userAvatar={data.author.avatar}
      loveNumber={data.likes.length}
      commentNumber={data.comments.length}
      type="collection"
      refetchList={refetchList}
      collectionId={collectionId}
    />
  );
}

CollectionCard.propTypes = {
  post: PropTypes.objectOf(PropTypes.string).isRequired,
  collectionId: PropTypes.string.isRequired,
  refetchList: PropTypes.func.isRequired,
};
