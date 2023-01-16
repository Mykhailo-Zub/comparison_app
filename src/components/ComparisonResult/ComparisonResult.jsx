import React from "react";
import styles from "./ComparisonResult.module.css";

const ComparisonResult = ({ title, price, profit, thumbnail, isChecked, checkAction }) => {
  return (
    <div className={isChecked ? `${styles.wrapper} ${styles.wrapper__checked}` : styles.wrapper} onClick={checkAction}>
      <img src={thumbnail} alt={title} />
      <div className={styles.left__side}>
        <div className={styles.title}>{title}</div>
        <div className={styles.price}>Price: ${price}</div>
        <div className={styles.price}>
          Profit: $<span className={profit > 0 ? styles.positive : styles.negative}>{profit}</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonResult;
