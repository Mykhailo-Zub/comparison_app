import React from "react";
import styles from "./ComparisonPage.module.css";
import ResultToSave from "../ResultToSave/ResultToSave";

const ComparisonPage = ({ comparisonResults, store }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Check and save the results you want:</div>
      <div className={styles.results}>
        {comparisonResults?.map((el, i) => (
          <ResultToSave key={i} result={el} store={store} />
        ))}
      </div>
    </div>
  );
};

export default ComparisonPage;
