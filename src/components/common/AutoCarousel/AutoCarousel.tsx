import { useEffect, useState } from "react";
import styles from "./AutoCarousel.module.scss";
import { motion } from "framer-motion";
import { HotPolitician } from "@/types/centerview";
import PersonSillhouette from "@assets/personSilhouette.svg?react";

interface Props {
  data: HotPolitician[];
}

function AutoCarousel({ data }: Props) {
  const [index, setIndex] = useState(0);
  const total = data?.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className={styles.contents}>
      {data?.map((item, i) => {
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
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={`${item.name} 사진`}
                className={styles.contents__imageWrapper__image}
              />
            ) : (
              <PersonSillhouette className={styles.contents__imageWrapper__image} />
            )}

            <div className={styles.contents__imageWrapper__nameTag}>{item.name}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default AutoCarousel;
