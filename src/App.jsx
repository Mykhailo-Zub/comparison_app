import React, { useCallback, useMemo, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import styles from "./App.module.css";
import SearchPage from "./components/SearchPage/SearchPage";
import SelectPage from "./components/SelectPage/SelectPage";
import ComparisonPage from "./components/ComparisonPage/ComparisonPage";
import { getComparisonResults, getFilteredResults } from "./requests";
import { Button } from "@mui/material";

const storeOptions = ["ebay", "walmart"];
const matchAccuracy = ["100", "≥90", "≥80", "≥70", "≥60", "≥50"];

function App() {
  const [page, setPage] = useState("search");
  const [query, setQuery] = useState(null);
  const [store, setStore] = useState(null);
  const [accuracy, setAccuracy] = useState(matchAccuracy[matchAccuracy.length - 1]);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState(null);
  const [comparisonResults, setComparisonResults] = useState(null);

  const parsedAccuracy = useMemo(() => accuracy?.replace("≥", ""), [accuracy]);

  const searchAction = useCallback(() => {
    if (query && store && parsedAccuracy) {
      setError(false);
      setErrorText(null);
      setLoading(true);
      getFilteredResults(store, query, parsedAccuracy).then((results) => {
        setFilteredResults(results.filteredResults);
        setLoading(false);
        setPage("filter");
      });
    } else {
      setError(true);
      setErrorText("Please fill all forms");
      setTimeout(() => {
        setError(null);
      }, 300);
    }
  }, [query, store, parsedAccuracy]);

  const comparisonAction = useCallback(
    (resultsToComparison) => {
      setLoading(true);
      getComparisonResults(store, resultsToComparison, parsedAccuracy).then((results) => {
        setLoading(false);
        setComparisonResults(results.comparisonResults);
        setPage("comparison");
      });
    },
    [store, parsedAccuracy]
  );

  const resetHandler = useCallback(() => {
    setPage("search");
    setQuery(null);
    setStore(null);
    setAccuracy(matchAccuracy[matchAccuracy.length - 1]);
    setError(false);
    setErrorText(null);
    setLoading(false);
    setFilteredResults(null);
    setComparisonResults(null);
  }, []);

  return (
    <div className={styles.wrapper}>
      {page === "search" ? (
        <SearchPage
          query={query}
          setQuery={setQuery}
          store={store}
          storeOptions={storeOptions}
          setStore={setStore}
          accuracy={accuracy}
          matchAccuracy={matchAccuracy}
          setAccuracy={setAccuracy}
          error={error}
          errorText={errorText}
          loading={loading}
          searchAction={searchAction}
        />
      ) : (
        <div className={styles.reset_button}>
          <Button sx={{ m: 1, minWidth: 180 }} variant="outlined" color={"error"} onClick={resetHandler}>
            Reset search
          </Button>
        </div>
      )}
      {!filteredResults?.length && page === "filter" ? (
        <div className={styles.error}>
          <span>No matches were found for your query. Try lowering the match accuracy or use a different query.</span>
        </div>
      ) : null}
      {filteredResults?.length && page === "filter" ? (
        <SelectPage searchQuery={query} filteredResults={filteredResults} comparisonAction={comparisonAction} loading={loading} />
      ) : null}
      {page === "comparison" ? <ComparisonPage comparisonResults={comparisonResults} store={store} /> : null}
    </div>
  );
}

export default App;
