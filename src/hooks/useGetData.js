import { useEffect, useState } from "react";
import apiService from "../api/services/apiServices";

function useGetData(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiService
      .get(url)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        // console.log(err);
        throw err;
      })
      .finally((final) => {});
  }, [url]);

  return data;
}

export default useGetData;
