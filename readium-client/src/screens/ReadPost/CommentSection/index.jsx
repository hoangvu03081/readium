import React, { useRef } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-textarea-autosize";
import { ReactComponent as SendBtn } from "../../../assets/icons/send.svg";
import { useMyAvatar } from "../../../common/api/useAvatar";
import {
  useGetComment,
  usePostComment,
} from "../../../common/api/commentQuery";
import {
  Comment,
  Content,
  Info,
  Input,
  Layout,
  Name,
  ReadComment,
  ReadLeft,
  ReadRight,
  Time,
  Title,
  WriteComment,
  WriteLeft,
  WriteRight,
} from "./styles";

export default function CommentSection({ postId }) {
  const commentRef = useRef(null);
  const getMyAvatar = useMyAvatar();
  const getComment = useGetComment(postId);
  const postComment = usePostComment();
  if (getMyAvatar.isFetching || getComment.isFetching) {
    return <p id="comment_section">Loading comment section...</p>;
  }
  if (!getMyAvatar.data || !getComment.data) {
    return <p id="comment_section">Error loading comment section...</p>;
  }
  const myAvatar = getMyAvatar.data;
  const comments = getComment.data.data;

  const handleSendComment = () => {
    postComment.mutate({ postId, content: commentRef.current.value });
    commentRef.current.value = "";
    setTimeout(() => {
      getComment.refetch();
    }, 2000);
  };

  return (
    <Layout id="comment_section">
      <Title>
        {comments.length > 1
          ? `${comments.length} comments`
          : `${comments.length} comment`}
      </Title>

      <WriteComment>
        <WriteLeft src={myAvatar} alt="Avatar" />
        <WriteRight>
          <Input>
            <TextareaAutosize
              placeholder="Add a comment"
              minRows={1}
              maxRows={10}
              ref={commentRef}
            />
          </Input>
          <SendBtn onClick={handleSendComment} />
        </WriteRight>
      </WriteComment>

      <ReadComment>
        {comments.map((item) => (
          <Comment key={item.id}>
            <ReadLeft src={myAvatar} alt="Avatar" />
            <ReadRight>
              <Info>
                <Name>{item.user}</Name>
                <Time>Just now</Time>
              </Info>
              <Content>{item.content}</Content>
            </ReadRight>
          </Comment>
        ))}
      </ReadComment>
    </Layout>
  );
}

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
};
