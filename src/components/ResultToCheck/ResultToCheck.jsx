import React from "react";
import styles from "./ResultToCheck.module.css";

const ResultToCheck = ({ title, thumbnail, isChecked, checkAction, link }) => {
  const clickAction = (e) => {
    if (e.target.getAttribute("href")) e.stopPropagation();
    else checkAction();
  };

  return (
    <div className={isChecked ? `${styles.wrapper} ${styles.wrapper__checked}` : styles.wrapper} onClick={clickAction}>
      <img src={thumbnail} alt={title} />
      <div className={styles.title} title={title}>
        <a href={link} target="_blank" rel="noreferrer">
          {title}
        </a>
      </div>
    </div>
  );
};

export default ResultToCheck;
