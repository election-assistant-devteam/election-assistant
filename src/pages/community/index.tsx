import React, { useState } from "react";
import styles from "./styles/community.module.scss";
import InputBox from "@/components/common/input/InputBox";
import NavBar from "@/components/common/navigation/NavBar";
import Button from "@/components/common/button/Button";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function index() {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const mockData = [
    {
      title: "국회의원 나가보려함",
      contents: "진짜 국회의원 나갈꺼니까 나 좀 뽑아주셈 형들",
      likes: 2,
      comments: 3,
    },
    {
      title: "윤석열 탄핵",
      contents: "윤석열 탄핵해야됨 ㄹㅇ",
      likes: 3,
      comments: 3,
    },
    {
      title: "이재명 깜빵",
      contents: "이재명은 깜빵으로 ㄱㄱ씽",
      likes: 5,
      comments: 1,
    },
  ];
  const mockFreeData = [
    {
      title: "국회의원 나가보려함",
      contents: "진짜 국회의원 나갈꺼니까 나 좀 뽑아주셈 형들",
      likes: 2,
      comments: 3,
    },
    {
      title: "윤석열 탄핵",
      contents: "윤석열 탄핵해야됨 ㄹㅇ",
      likes: 3,
      comments: 3,
    },
    {
      title: "이재명 깜빵",
      contents: "이재명은 깜빵으로 ㄱㄱ씽",
      likes: 5,
      comments: 1,
    },
    {
      title: "안녕하세요",
      contents: "안녕하세요 여러분",
      likes: 0,
      comments: 1,
    },
    {
      title: "아오 집가고싶다",
      contents: "피곤하다~~~",
      likes: 2,
      comments: 1,
    },
    {
      title: "다음 대선 언제냐?",
      contents: "제곧내",
      likes: 0,
      comments: 1,
    },
    {
      title: "끝말잇기 시작",
      contents: "나트륨",
      likes: 0,
      comments: 0,
    },
  ];

  return (
    <div className={styles.page}>
      <NavBar text="커뮤니티"></NavBar>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__searchSection}>
          <InputBox placeHolder="검색어를 입력하세요." handleData={() => setSearch}></InputBox>
        </div>
        <div className={styles.page__contents__hotSection}>
          <div className={styles.page__contents__hotSection__head}>인기글</div>
          <div className={styles.page__contents__hotSection__body}>
            {mockData.map((item, index) => (
              <div className={styles.page__contents__hotSection__body__item} key={index}>
                <div className={styles.page__contents__hotSection__body__item__title}>
                  {item.title}
                </div>
                <div className={styles.page__contents__hotSection__body__item__contents}>
                  {item.contents}
                </div>
                <div className={styles.page__contents__hotSection__body__item__reaction}>
                  <div className={styles.page__contents__hotSection__body__item__reaction__likes}>
                    <FaRegHeart
                      className={
                        styles.page__contents__hotSection__body__item__reaction__likes__icon
                      }
                    />
                    <div
                      className={
                        styles.page__contents__hotSection__body__item__reaction__likes__count
                      }
                    >
                      {item.likes}
                    </div>
                  </div>
                  <div
                    className={styles.page__contents__hotSection__body__item__reaction__comments}
                  >
                    <FaRegCommentDots
                      className={
                        styles.page__contents__hotSection__body__item__reaction__comments__icon
                      }
                    />
                    <div
                      className={
                        styles.page__contents__hotSection__body__item__reaction__comments__count
                      }
                    >
                      {item.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.page__contents__freeSection}>
          <div className={styles.page__contents__freeSection__head}>
            <div className={styles.page__contents__freeSection__head__title}>자유게시판</div>
            <button
              className={styles.page__contents__freeSection__head__write}
              onClick={() => navigate("/community/upload")}
            >
              글 작성
            </button>
          </div>
          <div className={styles.page__contents__freeSection__body}>
            {mockFreeData.map((item, index) => (
              <div className={styles.page__contents__freeSection__body__item} key={index}>
                <div className={styles.page__contents__freeSection__body__item__title}>
                  {item.title}
                </div>
                <div className={styles.page__contents__freeSection__body__item__contents}>
                  {item.contents}
                </div>
                <div className={styles.page__contents__freeSection__body__item__reaction}>
                  <div className={styles.page__contents__freeSection__body__item__reaction__likes}>
                    <FaRegHeart
                      className={
                        styles.page__contents__freeSection__body__item__reaction__likes__icon
                      }
                    />
                    <div
                      className={
                        styles.page__contents__freeSection__body__item__reaction__likes__count
                      }
                    >
                      {item.likes}
                    </div>
                  </div>
                  <div
                    className={styles.page__contents__freeSection__body__item__reaction__comments}
                  >
                    <FaRegCommentDots
                      className={
                        styles.page__contents__freeSection__body__item__reaction__comments__icon
                      }
                    />
                    <div
                      className={
                        styles.page__contents__freeSection__body__item__reaction__comments__count
                      }
                    >
                      {item.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
