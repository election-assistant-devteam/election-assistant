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
import CommunityCommentList from "./CommunityCommentList";

interface Props {
  data: DetailPostType;
}

const CommunityPostView = ({ data }: Props) => {
  const [comments, setComments] = useState<CommentType[]>(null);
  const [clickedCommentId, setClickedCommentId] = useState<number>(null);

  // const PATH = data ? `/posts/${data.postId}/comments` : null;
  const PATH = `/posts/${data?.postId}/comments`;
  console.log("data:", data);

  // const {
  //   response: commentsResponse,
  //   error,
  //   loading,
  // } = useAPI<{ comments: CommentType[] }>({
  //   method: "GET",
  //   url: PATH,
  //   data: null,
  //   addAuth: true,
  // });

  const fetchComments = async () => {
    const response = await apiCall(PATH, "GET", null, true);

    switch (response.code) {
      case 20000:
        setComments(response.data.comments);
        console.log(response.data);
        break;
      default:
        alert("에러가 발생했습니다...");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [data]);

  // useEffect(() => {
  //   if (commentsResponse) {
  //     console.log(commentsResponse);
  //     setComments(commentsResponse.comments);
  //   }
  // }, [commentsResponse]);

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
      <CommunityCommentList comments={comments} setClickedCommentId={setClickedCommentId} />
      <InputRow
        postId={data?.postId}
        clickedCommentId={clickedCommentId}
        onCommentSubmit={fetchComments}
      />
    </div>
  );
};

export default CommunityPostView;
