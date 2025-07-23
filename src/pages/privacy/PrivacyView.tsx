import React from "react";
import styles from "./PrivacyView.module.scss";
import PrivacyRow from "./PrivacyRow";

const PrivacyView = () => {
  const privacyPolicyItems = [
    {
      title: "개인정보 수집",
      content: "서비스 제공을 위해 최소한의 개인정보(이메일)를 수집합니다.",
    },
    {
      title: "이용 목적",
      content: "수집한 정보는 회원가입, 문의 응답, 서비스 개선 등 정해진 목적에만 사용됩니다.",
    },
    {
      title: "보관 및 삭제",
      content: "개인정보는 필요한 기간 동안만 보관되며, 목적이 끝나면 안전하게 삭제됩니다.",
    },
    {
      title: "제3자 제공 없음",
      content: "법령에 따른 경우를 제외하고, 고객님의 정보를 외부에 제공하지 않습니다.",
    },
    {
      title: "보안 조치",
      content: "개인정보는 암호화 등 보안기술로 안전하게 보호됩니다.",
    },
    {
      title: "이용자의 권리",
      content: "원하실 경우 언제든지 개인정보 열람, 수정, 삭제를 요청하실 수 있습니다.",
    },
    {
      title: "문의",
      content: "개인정보 관련 문의는 1:1 문의 페이지를 사용해 보내주세요.",
    },
  ];
  return (
    <div className={styles.privacyView}>
      <div className={styles.privacyView__title}>개인정보 처리방침</div>
      <div className={styles.privacyView__content}>
        {privacyPolicyItems.map((item, index) => (
          <PrivacyRow data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PrivacyView;
