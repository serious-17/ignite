import axios from "axios";

const fetchData = (api) => {
  const data = axios.get(api);
  return data;
};

export default fetchData;
