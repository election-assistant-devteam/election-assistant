import { useEffect, useState } from "react";
import styles from "./LiveNewsSection.module.scss";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LiveNewsItem from "./LiveNewsItem";
import { apiCall } from "@/services/authServices";
import Loading from "@/components/common/loading/Loading";

export type NewsItemType = {
  title: string;
  link: string;
  image: string;
};

const LiveNewsSection = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState<NewsItemType[]>(null);
  const localUrl = "http://localhost:9001/news";
  const deployUrl = "http://54.180.165.220/api/news";

  useEffect(() => {
    const getNews = async () => {
      const response = await apiCall(deployUrl, "GET");
      setNewsData(response.data);
    };
    getNews();
  }, []);

  return (
    <div className={styles.newsContainer}>
      <div className={styles.newsContainer__head}>
        <div className={styles.newsContainer__head__title}>실시간 뉴스</div>
      </div>
      <div className={styles.newsContainer__body}>
        {newsData ? (
          <>
            {newsData && newsData.length > 0 && <LiveNewsItem newsData={newsData[0]} />}
            {newsData && newsData.length > 0 && (
              <LiveNewsItem additional={true} newsData={newsData[1]} />
            )}
            {newsData && newsData.length > 0 && (
              <LiveNewsItem additional={true} newsData={newsData[2]} />
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>

      <div className={styles.newsContainer__foot}>
        <div
          className={styles.newsContainer__foot__text}
          onClick={() => navigate("/news", { state: newsData })}
        >
          더 많은 뉴스 보기
        </div>
        <div className={styles.newsContainer__foot__icon}>
          <MdArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default LiveNewsSection;
