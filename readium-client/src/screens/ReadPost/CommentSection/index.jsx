import React, { useRef } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-textarea-autosize";
import { useAuth } from "../../../common/hooks/useAuth";
import {
  useGetMyAvatar,
  useGetComment,
  usePostComment,
} from "../../../common/api/commentQuery";
import PuffLoader from "../../../common/components/PuffLoader";
import { ReactComponent as SendBtn } from "../../../assets/icons/send.svg";
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
  const { auth } = useAuth();
  const getMyAvatar = useGetMyAvatar(auth);
  const getComment = useGetComment(postId);
  const postComment = usePostComment();
  if (getMyAvatar.isFetching || getComment.isFetching) {
    return (
      <div id="comment_section">
        <PuffLoader />
      </div>
    );
  }
  if (!getComment.data) {
    return <div id="comment_section" />;
  }
  const myAvatar = getMyAvatar.data;
  const comments = getComment.data.data;

  const handleSendComment = () => {
    postComment.mutate({ postId, content: commentRef.current.value });
    commentRef.current.value = "";
    setTimeout(() => {
      getComment.refetch();
    }, 1000);
  };

  return (
    <Layout id="comment_section">
      <Title>
        {comments.length > 1
          ? `${comments.length} comments`
          : `${comments.length} comment`}
      </Title>

      <WriteComment className={auth ? "d-flex" : "d-none"}>
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
        {comments
          .slice()
          .reverse()
          .map((item) => (
            <Comment key={item.id}>
              <ReadLeft src={item.user.avatar} alt="Avatar" />
              <ReadRight>
                <Info>
                  <Name>{item.user.displayName}</Name>
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
