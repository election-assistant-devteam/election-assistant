import React, { useEffect, useState } from "react";
import styles from "./AutoCarousel.module.scss";
import { motion } from "framer-motion";

function AutoCarousel() {
  const images = [
    {
      name: "추미애",
      img: "images/sample1.png",
    },
    {
      name: "이재명",
      img: "images/sample2.png",
    },
    {
      name: "원희룡",
      img: "images/sample3.png",
    },
  ];
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className={styles.contents}>
      {images.map((item, i) => {
        const offset = (i - index + total) % total;
        return (
          <motion.div
            className={styles.contents__imageWrapper}
            key={i}
            animate={{
              scale: offset === 1 ? 1.1 : 0.9,
              opacity: offset === 1 ? 1 : 0.6,
              x: (offset - 1) * 134.4,
              zIndex: offset === 1 ? 10 : 5,
            }}
            transition={{ duration: 0.5 }}
          >
            <img src={item.img} alt="" className={styles.contents__imageWrapper__image} />
            <div className={styles.contents__imageWrapper__nameTag}>{item.name}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default AutoCarousel;
