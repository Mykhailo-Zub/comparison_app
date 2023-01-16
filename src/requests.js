import axios from "axios";

const baseURL = "https://comparison-server.vercel.app";

const STORE = "store";
const COMPIRISON = "comparison";

const makeRequest = axios.create({
  baseURL,
});

export const getFilteredResults = async (store, query, accuracy) => {
  return makeRequest.post(`${baseURL}/${STORE}`, { targetStore: store, query, accuracy }).then((res) => res.data);
};

export const getComparisonResults = async (store, selectedResults, accuracy) => {
  return makeRequest.post(`${baseURL}/${COMPIRISON}`, { targetStore: store, selectedResults, accuracy }).then((res) => res.data);
};
