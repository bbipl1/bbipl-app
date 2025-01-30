
import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowReportDetails from "./ShowReportDetails";

import ShowQR from "../../../../admin/ShowQR";

const serverURL = process.env.REACT_APP_SERVER_URL;

const ShowAllReports = ({user}) => {
  const [isShowDetailsOpen, setIsShowDetailsOpen] = useState(false);
  const [dailyProgressReport, setDailyProgressReport] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isQROpen, setIsQROpen] = useState(false);
  const [selectedQR, setSelectedQR] = useState({});

  useEffect(() => {
    const url = `${serverURL}/api/constructions/site-engineers/get-all-daily-progress-report?id=${user.id}`;
    axios
    .get(url)
    .then((res) => {
        setDailyProgressReport(res?.data?.data);
        // console.log(res)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setDailyProgressReport]);

  const getStatusClass = (status) => {
    if (status === "Paid") return "text-green-500";
    if (status === "PartialPaid") return "text-blue-500";
    if (status === "Unpaid") return "text-red-500";
    return "";
  };

  return (
    <div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Site Name</th>
              <th className="px-4 py-2 text-left">Work Type</th>
              <th className="px-4 py-2 text-left">Today's Work</th>
              <th className="px-4 py-2 text-left">Machinery Used</th>
              <th className="px-4 py-2 text-left">Expenses</th>
              <th className="px-4 py-2 text-left">Required</th>
              <th className="px-4 py-2 text-left">Received</th>
              <th className="px-4 py-2 text-left">QR URL</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {dailyProgressReport?.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  setIsShowDetailsOpen(true);
                  setSelectedItem(item);
                }}
                className={`border-b ${getStatusClass(item.expenses.status)}`}
              >
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.siteName}</td>
                <td className="px-4 py-2">{item.workType}</td>
                <td className="px-4 py-2">
                  {item.todaysWork && item.todaysWork.join(", ")}
                </td>
                <td className="px-4 py-2">
                  {item.machinaryUsed && item.machinaryUsed.join(", ")}
                </td>
                <td className="px-4 py-2">
                  {item.expenses.Category && item.expenses.Category.join(", ")}
                </td>
                <td className="px-4 py-2">{item.expenses.required}</td>
                <td className="px-4 py-2">{item.expenses.received}</td>
                <td className="px-4 py-2">
                  <img
                    onClick={() => {
                      setIsQROpen(false);
                      setIsShowDetailsOpen(false)
                      setSelectedQR(item);
                    }}
                    className="w-16 h-16"
                    src={item.expenses.qrURL}
                    alt="url"
                  />
                </td>
                <td className="px-4 py-2">{item.expenses.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isShowDetailsOpen && (
        <ShowReportDetails
          open={isShowDetailsOpen}
          isOpen={setIsShowDetailsOpen}
          report={selectedItem}
        />
      )}

      {isQROpen && (
        <>
          <ShowQR item={selectedQR} isQROpen={setIsQROpen} />
        </>
      )}
    </div>
  );
};

export default ShowAllReports;
