import axios from "axios";
import React, { useEffect, useState } from "react";
const serverUrl = process.env.REACT_APP_SERVER_URL;
const ShowAllForms = () => {
  const [allForms, setAllForms] = useState();

  useEffect(() => {
    const url = `${serverUrl}/api/constructions/site-engineers/get-hdd-forms`;

    const header = {
      header: "application/json",
    };
    axios
      .get(url, header)
      .then((res) => {
        console.log("res",res);
        setAllForms(res.data.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);
  return (
    <div className="w-full">
      {allForms && Array.isArray(allForms) ?
      <>
        <div className="w-full">
          <div></div>
          <div className="w-full">
            <table className="w-full border-2 border-gray-100">
              <thead className="w-full">
                <tr>
                  <th className="border-2 p-1">Date</th>
                  <th  className="border-2 p-1">Name</th>
                  <th  className="border-2 p-1">Date of Req</th>
                  <th  className="border-2 p-1">DIA</th>
                  <th  className="border-2 p-1">No Of Jobs</th>
                  <th  className="border-2 p-1">Meter</th>
                  <th  className="border-2 p-1">Rate</th>
                  <th  className="border-2 p-1">Amount</th>
                  <th  className="border-2 p-1">payment</th>
                  <th  className="border-2 p-1">Expenses</th>
                  <th  className="border-2 p-1">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {allForms?.map((expense) => {
                  return (
                    <>
                      <tr className="w-full">
                        <td className="border-2 p-1">{expense.date}</td>
                        <td className="border-2 p-1">{expense.name}</td>
                        <td className="border-2 p-1">{expense.dateOfRequirements}</td>
                        <td className="border-2 p-1">{expense.dia}</td>
                        <td className="border-2 p-1">{expense.NoOfJobs}</td>
                        <td className="border-2 p-1">{expense.meter}</td>
                        <td className="border-2 p-1">{expense.rate}</td>
                        <td className="border-2 p-1">{expense.amount}</td>
                        <td className="border-2 p-1">{expense.paymentRec.status}/Rs.{expense.paymentRec.amount}/-</td>
                        <td className="border-2 p-1">{expense?.expenses?.map((ex)=>{return <><p>{ex.name}: {ex.value}</p></>})}</td>
                        <td className="border-2 p-1">{expense.remarks}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>:<>
      <div className="w-full ">
        <h1>Form not found.</h1>
        </div></>}
    </div>
  );
};

export default ShowAllForms;
