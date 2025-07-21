import { CommentType, DetailPostType } from "@/types/post";
import styles from "./CommunityPostView.module.scss";
import PostReactionRow from "./PostReactionRow";
import InputRow from "./InputRow";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import ImgContainer from "./ImgContainer";
import { apiCall } from "@/services/authServices";
import { useAPI } from "@/hooks/useAPI";
import CommunityCommentRow from "./CommunityCommentRow";

interface Props {
  data: DetailPostType;
}

const CommunityPostView = ({ data }: Props) => {
  const [comments, setComments] = useState<CommentType[]>(null);

  const PATH = data ? `/posts/${data.postId}/comments` : null;
  console.log(data);

  const {
    response: commentsResponse,
    error,
    loading,
  } = useAPI<{ comments: CommentType[] }>({
    method: "GET",
    url: PATH,
    data: null,
    addAuth: true,
  });

  useEffect(() => {
    if (commentsResponse) {
      console.log(commentsResponse);
      setComments(commentsResponse.comments);
    }
  }, [commentsResponse]);

  return (
    <div className={styles.communityPostView}>
      <div className={styles.communityPostView__post}>
        <div className={styles.communityPostView__post__postInfo}>
          <div>{data?.writer}</div>
          <div>{dayjs(data?.createdAt).format("YYYY-MM-DD HH:mm")}</div>
        </div>
        <ImgContainer imgUrls={data?.images} />
        {data?.content}
      </div>
      <PostReactionRow heartNum={data?.likeCount} />
      <div className={styles.communityPostView__commentList}>
        {comments?.map((item, _) => (
          <CommunityCommentRow commentData={item} key={item.commentId} />
        ))}
      </div>
      <InputRow />
    </div>
  );
};

export default CommunityPostView;
