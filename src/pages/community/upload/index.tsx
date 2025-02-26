import React, { useRef, useState } from "react";
import styles from "./styles/upload.module.scss";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiImageAlt } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";

function index() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    try {
      const response = await fetch(
        "https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status === 200) {
        alert("게시글이 성공적으로 업로드되었습니다!");
        navigate(-1);
      } else {
        alert("업로드 실패!");
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("통신 오류");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.page__NavBar}>
        <div className={styles.page__NavBar__prev} onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft size="30" />
        </div>
        <div className={styles.page__NavBar__finish} onClick={handleSubmit}>
          완료
        </div>
      </div>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__titleSection}>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className={styles.page__contents__titleSection__inputBox}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.page__contents__contentSection}>
          <textarea
            name=""
            id=""
            placeholder="게시글을 작성하세요"
            className={styles.page__contents__contentSection__textArea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={styles.page__contents__multimediaSection}>
          <div className={styles.page__contents__multimediaSection__icons}>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <div onClick={handleIconClick}>
              <BiImageAlt size="30" style={{ cursor: "pointer" }} />
            </div>
          </div>

          {files.length > 0 && (
            <div className={styles.page__contents__multimediaSection__uploads}>
              {files.map((file, index) => (
                <div
                  className={styles.page__contents__multimediaSection__uploads__imgCard}
                  key={index}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className={styles.page__contents__multimediaSection__uploads__imgCard__img}
                  ></img>
                  <GiCancel
                    onClick={() => removeFile(index)}
                    className={styles.page__contents__multimediaSection__uploads__imgCard__cancel}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.page__contents__ruleSection}>
          커뮤니티 이용수칙 <br />
          <br />
          1. 존중과 배려: 다양한 의견이 공존할 수 있도록 타인의 생각과 신념을 존중하세요. 인신공격,
          비하, 혐오 발언은 금지됩니다. <br />
          2. 정치 중립성 준수: 특정 정당, 후보자, 이념에 대한 지나친 홍보나 비난은 자제해주세요.{" "}
          <br />
          3. 허위 정보 금지: 검증되지 않은 정보나 가짜 뉴스를 유포하지 마세요. 정책 중심의 토론:
          정책과 공약에 대한 건설적인 토론을 지향하며, 개인에 대한 비난은 삼가세요. <br />
          4. 법률 준수: 관련 법규를 준수하며, 명예훼손, 저작권 침해 등의 불법 행위를 하지 마세요.{" "}
          <br />
          5. 비방 및 선동 금지: 폭력적이거나 과도한 선동적인 표현은 허용되지 않습니다. <br />
          개인정보 보호: 자신의 정보나 타인의 개인정보를 노출하지 마세요. <br />
          6. 스팸 및 광고 금지: 정치와 무관한 상업적 광고, 홍보성 글은 삭제됩니다. <br />
          7. 커뮤니티 운영 방침 준수: 관리자와 운영진의 판단을 존중하며, 이용수칙 위반 시 적절한
          제재를 받을 수 있습니다. <br />
          8. 청소년 보호: 커뮤니티의 연령대에 적합한 언어와 콘텐츠를 사용하세요. <br />
          <br />
          이 수칙을 준수하며 건전한 정치 토론 문화를 만들어가길 바랍니다.
          <br />
        </div>
      </div>
    </div>
  );
}

export default index;
