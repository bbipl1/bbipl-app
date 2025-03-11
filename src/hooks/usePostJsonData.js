import { jsonApiClient } from "../api/clients/apiClient";
import { useEffect, useState } from "react";

function usePostJsonData(url,payload) {
  const [data, setData] = useState(null);

  useEffect(() => {
    jsonApiClient
      .post(url,payload)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((final) => {});
  }, [url,payload]);

  return data;
}

export default usePostJsonData;
