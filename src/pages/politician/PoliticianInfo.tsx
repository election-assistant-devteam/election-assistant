import { useEffect, useState } from "react";
import styles from "./styles/politician.module.scss";
import { useParams } from "react-router-dom";
import NavBar from "@/components/common/navigation/NavBar";
import { apiCall } from "@/services/authServices";
import BriefInfoContainer from "./brief_info_container/BriefInfoContainer";
import DetailInfoContainer from "./detail_info_container/DetailInfoContainer";

function PoliticianInfo() {
  const params = useParams();
  const [data, setData] = useState(null);

  // const [curPos, setCurPos] = useState(0);

  const PATH = `/politicians/${params.id}/detail`;

  useEffect(() => {
    // console.log(params);
    const getPoliticanData = async () => {
      const result = await apiCall(PATH, "GET");

      if (result.code === 20000) {
        setData(result.data);
      } else if (result.code === 40400) {
        alert(result.message);
      }
    };
    getPoliticanData();
  }, []);

  return (
    <div className={styles.page}>
      <NavBar text={"후보자 상세보기"}></NavBar>

      <div className={styles.page__contents}>
        <BriefInfoContainer data={data} />
        <DetailInfoContainer data={data} />
      </div>
    </div>
  );
}

export default PoliticianInfo;
