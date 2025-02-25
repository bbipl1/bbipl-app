import React, { useEffect, useState } from "react";
import { serverURL } from "../../../../../../utility/URL";
import axios from "axios";

const HDDReport = () => {
  const [hdds, setHdds] = useState(null);

  useEffect(() => {
    const url = `${serverURL}`;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(url, headers)
      .then((res) => {
        const hdds = res.data.data;
        setHdds(hdds);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((final) => {
        console.log(final);
      });
  }, []);
  
  return (
    <div className="p-4">
      <h1>Working date: not available</h1>
      <h1>Site name: not available</h1>
      <h1>Total sales amount: not available</h1>
      <h1>Total expenses: not available</h1>
      <h1>Total amount received till date: not available</h1>
      <h1>Due: not available</h1>
      <h1>Profit after all expenses: not available</h1>
    </div>
  );
};

export default HDDReport;
