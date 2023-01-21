import React, { useCallback, useState } from "react";
import styles from "./SelectPage.module.css";
import { LoadingButton } from "@mui/lab";
import ResultToCheck from "../ResultToCheck/ResultToCheck";

const SelectPage = ({ searchQuery, filteredResults, comparisonAction, loading }) => {
  const [resultsToComparison, setResultsToComparison] = useState(() => filteredResults.map((el) => ({ ...el, isChecked: false })));
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const comparison = useCallback(() => {
    if (resultsToComparison.some((el) => el.isChecked)) {
      setError(false);
      setErrorText(null);
      comparisonAction([...resultsToComparison.filter((el) => el.isChecked)]);
    } else {
      setError(true);
      setErrorText("Please select at least one result");
      setTimeout(() => {
        setError(null);
      }, 300);
    }
  }, [resultsToComparison, comparisonAction]);

  const checkAction = useCallback(
    (i) => {
      const newResults = resultsToComparison.map((el, index) => ({ ...el, isChecked: index === i ? !el.isChecked : el.isChecked }));
      setResultsToComparison(newResults);
    },
    [resultsToComparison]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        Please select results that matches to "<span>{searchQuery}</span>"
      </div>
      <div className={styles.results}>
        {resultsToComparison.map((el, i) => {
          const { isChecked, title, thumbnail, link, product_page_url } = el;
          return (
            <ResultToCheck
              key={i}
              title={title}
              thumbnail={thumbnail}
              isChecked={isChecked}
              checkAction={() => checkAction(i)}
              link={link || product_page_url}
            />
          );
        })}
      </div>
      <LoadingButton loading={loading} sx={{ m: 1, minWidth: 180 }} variant="contained" color={error ? "error" : "primary"} onClick={comparison}>
        Compare results
      </LoadingButton>
      {errorText ? <div className={styles.error_text}>{errorText}</div> : null}
    </div>
  );
};

export default SelectPage;
