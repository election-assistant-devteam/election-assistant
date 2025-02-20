import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/post.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

function index() {
  const [postLike, setPostLike] = useState<boolean>(false);
  const [comments, setComments] = useState([]);
  let commentId = 0; //댓글 id값 순차지정위한 변수
  const [input, setInput] = useState("");
  const [selectedComment, setSelectedComment] = useState<number>(); //대댓글을 작성할 댓글 id
  const [reply, setReply] = useState<boolean>(false); //대댓글 버튼 클릭여부

  const [likedComments, setLikedComments] = useState<{ [key: number]: boolean }>({}); //좋아요한 댓글 상태변수
  const [likedReplies, setLikedReplies] = useState<{
    [commentId: number]: { [replyId: number]: boolean };
  }>({}); //좋아요한 대댓글 상태변수

  const inputRef = useRef<HTMLInputElement | null>(null); //input태그에 focu주기위한 ref변수
  const commentWriteSectionRef = useRef<HTMLDivElement | null>(null); // 댓글input과 대댓글 input 사이 변경을 위한 ref변수

  const mockPost = {
    id: 16,
    title: "국회의원 나가보려함",
    writer: "김봉창",
    contents:
      "진짜 국회의원 나가보려함. \n나 좀 뽑아줘라 형들 진짜 \n제발 나 뽑아주면 한명 당 전용기 한 대 줌 ㄹㅇㅋㅋ",
    likes: 8,
    comments: 7,
    time: "2025/02/03",
  };
  const mockComments = [
    {
      id: 1,
      name: "땡구",
      content: "뭐라는거야 ㅋㅋㅋ",
      likes: 7,
      replies: [
        {
          id: 1,
          name: "땡칠",
          content: "뭐 ㅋㅋㅋ",
          likes: 7,
          time: "2025/02/03",
        },
        {
          id: 2,
          name: "땡육",
          content: "와우",
          likes: 7,
          time: "2025/02/03",
        },
      ],
      time: "2025/02/03",
    },
    {
      id: 2,
      name: "호날두",
      content: "축구의 신 GOAT",
      likes: 2,
      replies: [
        {
          id: 1,
          name: "땡칠",
          content: "뭐 ㅋㅋㅋ",
          likes: 7,
          time: "2025/02/03",
        },
        {
          id: 2,
          name: "땡육",
          content: "와우",
          likes: 7,
          time: "2025/02/03",
        },
      ],
      time: "2025/02/03",
    },
    {
      id: 3,
      name: "우우",
      content: "에이 그건 아니지",
      likes: 0,
      replies: [
        {
          id: 1,
          name: "땡칠",
          content: "뭐 ㅋㅋㅋ",
          likes: 7,
          time: "2025/02/03",
        },
        {
          id: 2,
          name: "땡육",
          content: "와우",
          likes: 7,
          time: "2025/02/03",
        },
      ],
      time: "2025/02/03",
    },
    {
      id: 4,
      name: "김이박",
      content: "아오 배고파",
      likes: 0,
      replies: [
        {
          id: 1,
          name: "땡칠",
          content: "뭐 ㅋㅋㅋ",
          likes: 7,
          time: "2025/02/03",
        },
        {
          id: 2,
          name: "땡육",
          content: "와우",
          likes: 7,
          time: "2025/02/03",
        },
      ],
      time: "2025/02/03",
    },
  ];
  ////////////////////////////////////////위는 가짜데이터들/////////////////////////

  const clickLike = async () => {
    if (!postLike) {
      try {
        const response = await fetch(
          "https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/post/like",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //토큰
            },
            body: JSON.stringify({
              id: mockPost.id,
            }),
          }
        );

        if (response.status === 200) {
          console.log("게시글 좋아요 성공");
          setPostLike(true);
        }
      } catch (error) {
        console.error("요청 실패");
      }
    } else {
      try {
        const response = await fetch(
          "https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/post/unlike",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //토큰
            },
            body: JSON.stringify({
              id: mockPost.id,
            }),
          }
        );

        if (response.status === 200) {
          console.log("게시글 좋아요취소 성공");
          setPostLike(false);
        }
      } catch (error) {
        console.error("요청 실패");
      }
    }
  };

  //댓글 좋아요
  const toggleCommentLike = (commentId: number) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  //대댓글 좋아요
  const toggleReplyLike = (commentId: number, replyId: number) => {
    setLikedReplies((prev) => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        [replyId]: !prev[commentId]?.[replyId],
      },
    }));
  };

  const addComment = () => {
    //서버 전송 로직 추가 필요
    if (input.trim()) {
      commentId += 1;
      setComments([
        ...comments,
        {
          id: commentId,
          name: "규",
          content: input,
          likes: 0,
          replies: [],
          time: new Date()
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\. /g, "/")
            .replace(/\.$/, ""),
        },
      ]);
      setInput("");
    }
  };

  const getNextReplyId = (commentId: number) => {
    //새로 등록될 대댓글 id구하는 함수
    const replies = likedReplies[commentId];

    if (!replies || Object.keys(replies).length === 0) {
      return 1;
    }

    return Math.max(...Object.keys(replies).map(Number)) + 1;
  };

  const addReply = () => {
    //서버에 대댓글 데이터 전송하고, 받아오는 새로 갱신된 댓글데이터로 setComments에 setting해야될듯
    if (!selectedComment || !input.trim()) return;
    console.log(selectedComment);
    const newReplyId = getNextReplyId(selectedComment);
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === selectedComment
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: newReplyId,
                  name: "추가",
                  content: input,
                  likes: 7,
                  time: new Date()
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\. /g, "/")
                    .replace(/\.$/, ""),
                },
              ],
            }
          : comment
      )
    );

    setInput("");
    setReply(false);
    setSelectedComment(null);
  };

  useEffect(() => {
    setComments(mockComments);
  }, []);
  useEffect(() => {
    console.log("댓글 목록이 변경됨:", comments);
  }, [comments]); // comments가 변경될 때마다 실행
  // useEffect(() => {
  //   //reply상태가 true가된 후 focus되도록
  //   if (reply) {
  //     inputRef.current?.focus();
  //   }
  // }, [reply]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        commentWriteSectionRef.current &&
        !commentWriteSectionRef.current.contains(event.target as Node)
      ) {
        setReply(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.page}>
      <NavBar text={mockPost.title} className={styles.navBar}></NavBar>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__postSection}>
          <div className={styles.page__contents__postSection__info}>
            <div className={styles.page__contents__postSection__info__time}>n분전</div>
            <div className={styles.page__contents__postSection__info__writer}>
              {mockPost.writer}
            </div>
          </div>
          <div className={styles.page__contents__postSection__contents}>{mockPost.contents}</div>
        </div>
        <div className={styles.page__contents__reactSection}>
          <div className={styles.page__contents__reactSection__likes}>
            {postLike ? <FaHeart onClick={clickLike} /> : <FaRegHeart onClick={clickLike} />}
            공감
            <div>{mockPost.likes}</div>
          </div>
          <div className={styles.page__contents__reactSection__replies}>
            <FaRegComment />
            댓글
            <div>{mockPost.comments}</div>
          </div>
        </div>
        <div className={styles.page__contents__commentSection}>
          {comments.map((item, index) => (
            <div
              className={
                selectedComment === item.id
                  ? `${styles.page__contents__commentSection__comment} ${styles.selectedComment}`
                  : `${styles.page__contents__commentSection__comment}`
              }
              key={item.id}
            >
              <div className={styles.page__contents__commentSection__comment__head}>
                <div className={styles.page__contents__commentSection__comment__head__writer}>
                  {item.name}
                </div>
                <div className={styles.page__contents__commentSection__comment__head__reaction}>
                  <div
                    className={
                      styles.page__contents__commentSection__comment__head__reaction__likes
                    }
                  >
                    {likedComments[item.id] ? (
                      <FaHeart
                        onClick={() => toggleCommentLike(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => toggleCommentLike(item.id)}
                        style={{ cursor: "pointer" }}
                      />
                    )}

                    {item.likes}
                  </div>
                  <FaRegComment
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedComment(item.id);
                      setReply(true);
                      inputRef.current?.focus();
                    }}
                  />
                </div>
              </div>
              <div className={styles.page__contents__commentSection__comment__body}>
                {item.content}
              </div>
              <div className={styles.page__contents__commentSection__comment__tail}>
                {item.time}
              </div>
              <div className={styles.page__contents__commentSection__comment__replySection}>
                {item.replies.map((reply, index) => (
                  <div
                    className={styles.page__contents__commentSection__comment__replySection__reply}
                    key={index}
                  >
                    <div
                      className={
                        styles.page__contents__commentSection__comment__replySection__reply__head
                      }
                    >
                      <div
                        className={
                          styles.page__contents__commentSection__comment__replySection__reply__head__name
                        }
                      >
                        <MdOutlineSubdirectoryArrowRight />
                        {reply.name}
                      </div>
                      <div
                        className={
                          styles.page__contents__commentSection__comment__replySection__reply__head__reaction
                        }
                      >
                        {likedReplies[item.id]?.[reply.id] ? (
                          <FaHeart
                            onClick={() => toggleReplyLike(item.id, reply.id)}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() => toggleReplyLike(item.id, reply.id)}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                        {reply.likes}
                      </div>
                    </div>
                    <div
                      className={
                        styles.page__contents__commentSection__comment__replySection__reply__body
                      }
                    >
                      {reply.content}
                    </div>
                    <div
                      className={
                        styles.page__contents__commentSection__comment__replySection__reply__tail
                      }
                    >
                      {reply.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.page__contents__commentWriteSection} ref={commentWriteSectionRef}>
          {!reply ? (
            <>
              <input
                ref={inputRef}
                type="text"
                placeholder="댓글을 입력하세요."
                className={styles.page__contents__commentWriteSection__inputTag}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <PiPaperPlaneTiltBold
                className={styles.page__contents__commentWriteSection__sendButton}
                size="20"
                onClick={addComment}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="대댓글을 입력하세요."
                className={styles.page__contents__commentWriteSection__inputTag}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <PiPaperPlaneTiltBold
                className={styles.page__contents__commentWriteSection__sendButton}
                size="20"
                onClick={addReply}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default index;
