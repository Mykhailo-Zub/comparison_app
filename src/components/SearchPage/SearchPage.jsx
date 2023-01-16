import React from "react";
import styles from "./SearchPage.module.css";
import Select from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const SearchPage = ({
  query,
  setQuery,
  store,
  storeOptions,
  setStore,
  accuracy,
  matchAccuracy,
  setAccuracy,
  error,
  errorText,
  loading,
  searchAction,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>What do you want to sell?</div>
      <div className={styles.first_row}>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <TextField value={query || ""} onChange={(e) => setQuery(e.target.value)} label={"Search query"} />
        </FormControl>
      </div>
      <div className={styles.second_row}>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-simple-select-required-label">Target store</InputLabel>
          <Select value={store || ""} onChange={(e) => setStore(e.target.value)} label={"Target store"}>
            {storeOptions.map((el, i) => (
              <MenuItem value={el} key={i}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-simple-select-required-label">Match accuracy</InputLabel>
          <Select value={accuracy || ""} onChange={(e) => setAccuracy(e.target.value)} label={"Match accuracy"}>
            {matchAccuracy.map((el, i) => (
              <MenuItem value={el} key={i}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <LoadingButton loading={loading} sx={{ m: 1, minWidth: 180 }} variant="contained" color={error ? "error" : "primary"} onClick={searchAction}>
        Search
      </LoadingButton>
      {errorText ? <div className={styles.error_text}>{errorText}</div> : null}
    </div>
  );
};

export default SearchPage;
