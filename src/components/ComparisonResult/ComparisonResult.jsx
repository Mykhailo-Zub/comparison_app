import React from "react";
import styles from "./ComparisonResult.module.css";

const ComparisonResult = ({ title, price, profit, thumbnail, isChecked, checkAction, link }) => {
  const clickAction = (e) => {
    if (e.target.getAttribute("href")) e.stopPropagation();
    else checkAction();
  };

  return (
    <div className={isChecked ? `${styles.wrapper} ${styles.wrapper__checked}` : styles.wrapper} onClick={clickAction}>
      <div className={styles.image}>
        <img src={thumbnail} alt={title} />
      </div>
      <div className={styles.left__side}>
        <div className={styles.title}>
          <a href={link} target="_blank" rel="noreferrer">
            {title}
          </a>
        </div>
        <div className={styles.price}>Price: ${price}</div>
        <div className={styles.price}>
          Profit: $<span className={profit > 0 ? styles.positive : styles.negative}>{profit}</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonResult;
