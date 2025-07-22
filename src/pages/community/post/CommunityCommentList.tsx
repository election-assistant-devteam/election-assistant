import { CommentType } from "@/types/post";
import styles from "./CommunityCommentList.module.scss";
import CommunityCommentRow from "./CommunityCommentRow";

interface Props {
  comments: CommentType[];
  setClickedCommentId: React.Dispatch<React.SetStateAction<number>>;
}

const CommunityCommentList = ({ comments, setClickedCommentId }: Props) => {
  return (
    <div className={styles.communityCommentList}>
      {comments?.map((item, _) => (
        <CommunityCommentRow
          commentData={item}
          setClicked={setClickedCommentId}
          key={item.commentId}
        />
      ))}
    </div>
  );
};

export default CommunityCommentList;
