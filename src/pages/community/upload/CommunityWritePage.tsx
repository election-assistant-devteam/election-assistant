import { useRef, useState } from "react";
import styles from "./CommunityWritePage.module.scss";
import Header from "./Header";
import { BiImageAlt } from "react-icons/bi";
import UploadPreviewRow from "./UploadPreviewRow";
import CommunityRuleText from "./CommunityRuleText";
import { apiCall } from "@/services/authServices";
import { useNavigate } from "react-router-dom";

const CommunityWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    const formData = new FormData();
    // 1. JSON 객체는 Blob으로 감싸서 'request'라는 이름으로 보내야 함
    const json = JSON.stringify({
      title,
      content,
    });
    formData.append("request", new Blob([json], { type: "application/json" }));

    // 2. 이미지 파일 리스트는 'images'라는 같은 키 이름으로 반복해서 append
    files.forEach((file) => {
      formData.append("images", file);
    });

    const PATH = `http://localhost:9001/posts`;
    const accessToken = sessionStorage.getItem("access-token");
    if (!accessToken) {
      alert("로그인 후 글 작성이 가능합니다!");
      return;
    }

    try {
      const response = await fetch(PATH, {
        method: "POST",
        body: formData,
        // headers는 직접 설정하지 않음. 특히 Content-Type은 브라우저가 자동으로 설정함
        // 필요한 경우 Authorization 헤더 등만 추가
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (result.code === 20000) {
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
    <div className={styles.communityWritePage}>
      <Header handleSubmit={handleSubmit} />
      <div className={styles.communityWritePage__body}>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          className={styles.communityWritePage__body__title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          name=""
          id=""
          placeholder="게시글을 작성하세요"
          className={styles.communityWritePage__body__contents}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <div className={styles.communityWritePage__body__multimedia}>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <BiImageAlt size="30" style={{ cursor: "pointer" }} onClick={handleIconClick} />
        </div>
        <UploadPreviewRow files={files} removeFile={removeFile} />
        <CommunityRuleText />
      </div>
    </div>
  );
};

export default CommunityWritePage;
