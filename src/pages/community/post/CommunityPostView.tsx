import { CommentType, DetailPostType } from "@/types/post";
import styles from "./CommunityPostView.module.scss";
import PostReactionRow from "./PostReactionRow";
import InputRow from "./InputRow";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import ImgContainer from "./ImgContainer";
import { apiCall } from "@/services/authServices";
import CommunityCommentList from "./CommunityCommentList";

interface Props {
  data: DetailPostType;
}

const CommunityPostView = ({ data }: Props) => {
  const [comments, setComments] = useState<CommentType[]>(null);
  const [clickedCommentId, setClickedCommentId] = useState<number>(null);
  const [displayInput, setDisplayInput] = useState<boolean>(false);
  const PATH = data ? `/posts/${data.postId}/comments` : null;

  const fetchComments = async () => {
    if (!PATH) return;
    const response = await apiCall(PATH, "GET", null, true);

    switch (response.code) {
      case 20000:
        setComments(response.data.comments);
        break;
      default:
        alert(response.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [data]);

  return (
    <div
      className={
        displayInput ? styles.communityPostView : `${styles.communityPostView} ${styles.noInputBar}`
      }
    >
      <div className={styles.communityPostView__post}>
        <div className={styles.communityPostView__post__postInfo}>
          <div>{data?.writer}</div>
          <div>{dayjs(data?.createdAt).format("YYYY-MM-DD HH:mm")}</div>
        </div>
        <ImgContainer imgUrls={data?.images} />
        {data?.content}
      </div>
      <PostReactionRow
        hasLiked={data?.hasLiked}
        postId={data?.postId}
        heartNum={data?.likeCount}
        setDisplayInput={setDisplayInput}
      />
      <CommunityCommentList comments={comments} setClickedCommentId={setClickedCommentId} />
      <InputRow
        postId={data?.postId}
        clickedCommentId={clickedCommentId}
        onCommentSubmit={fetchComments}
        displayInput={displayInput}
      />
    </div>
  );
};

export default CommunityPostView;
