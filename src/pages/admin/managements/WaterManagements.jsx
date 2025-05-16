import React, { useEffect, useState } from "react";
import apiService from "../../../api/services/apiServices";
import { LoaderCircle, Trash2 } from "lucide-react";

const WaterManagements = () => {


      const [waterDetails, setWaterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalQt,setTotalQt]=useState(0);

  useEffect(() => {
    const subUrl = `/api/managements/water-management/get-water-details?`;
    setLoading(true);
    apiService
      .get(subUrl)
      .then((res) => {
        console.log(res)
        setWaterDetails(res?.data);
        setTotalQt(res?.data?.reduce((acc, item) => Number(acc) + Number(item.quantity), 0));

      })
      .catch((err) => {
        alert(err?.response?.data?.err);
        console.log(err?.response?.data?.err);
      })
      .finally((final) => {
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    alert("Permission denied!");
  };

  return (
    <>
      <div className="w-full ">
        <div className="flex justify-center items-center text-green-600">{loading && <LoaderCircle size={40} className="animate-spin"/>}</div>
        <table className="w-full overflow-x-auto overflow-y-auto">
          <thead className="w-full">
            <tr className="w-full bg-slate-500 text-white p-2 text-lg">
              <th>S/R</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Remarks</th>
              <th>Updated At</th>
              <th>Received by</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {waterDetails &&
              Array.isArray(waterDetails) &&
              waterDetails.map((wd, ind) => {
                return (
                  <>
                    <tr
                      className={`w-full p-2 text-center ${
                        ind % 2 === 1 ? "bg-slate-200" : "bg-white"
                      }`}
                    >
                      <td>{++ind}</td>
                      <td>{wd.updatedDate}</td>
                      <td>{wd.quantity}</td>
                      <td>{wd.remarks}</td>
                      <td>
                        {wd.submittedDate} - {wd.submittedTime} -{" "}
                        {wd.submittedDay}
                      </td>
                      <td>{"You"}</td>
                      <td
                        onClick={handleDelete}
                        className="text-red-500 inline-block m-auto hover:text-red-600 hover:cursor-pointer"
                      >
                        <Trash2 />
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        <div className="mt-12 flex justify-center items-center text-xl pb-8">
            <h1>Total Quantity : {totalQt}</h1>
        </div>
      </div>
    </>
  );
 
};

export default WaterManagements;
