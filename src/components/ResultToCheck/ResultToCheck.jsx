import React from "react";
import styles from "./ResultToCheck.module.css";

const ResultToCheck = ({ title, thumbnail, isChecked, checkAction }) => {
  return (
    <div className={isChecked ? `${styles.wrapper} ${styles.wrapper__checked}` : styles.wrapper} onClick={checkAction}>
      <img src={thumbnail} alt={title} />
      <div className={styles.title} title={title}>
        {title}
      </div>
    </div>
  );
};

export default ResultToCheck;
