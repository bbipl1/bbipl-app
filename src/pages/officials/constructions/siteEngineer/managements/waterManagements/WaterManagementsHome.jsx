import React, { useEffect, useState } from "react";
import { serverURL } from "../../../../../../utility/URL";
import apiService from "../../../../../../api/services/apiServices";
import FullScreenLoading from "../../../../../../loading/FullScreenLoading";
import { Loader2Icon, LoaderCircle, Trash2 } from "lucide-react";

const WaterManagementsHome = ({ siteEngineerId }) => {
  const [activeCompo, setActiveCompo] = useState("submit");

  const getActiveComponent = (ac, id) => {
    switch (ac) {
      case "submit":
        return <Submit id={id} />;
      case "show":
        return <Show id={id} />;
      default:
        return <>No component is selected yet.</>;
    }
  };

  useEffect(() => {
    // console.log("idd", siteEngineerId);
  });

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-blue-500 border-blue-100 rounded-md text-white m-auto p-2 ">
          <button
            onClick={() => {
              setActiveCompo("submit");
            }}
            className="w-24"
          >
            Submit
          </button>
        </div>
        <div className="bg-blue-500 border-blue-100 rounded-md text-white m-auto p-2">
          <button
            onClick={() => {
              setActiveCompo("show");
            }}
            className="w-24"
          >
            Show
          </button>
        </div>
      </div>

      <div className="mt-20">
        {getActiveComponent(activeCompo, siteEngineerId?.siteEngObjId)}
      </div>
    </div>
  );
};

const Submit = ({ id }) => {
  const [date, setDate] = useState(null);
  const [qt, setQt] = useState(0);
  const [rem, setRem] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const subUrl = `/api/managements/water-management/submit-water-details`;
    const data = {
      updatedDate: date,
      quantity: qt,
      remarks: rem,
      userId: id,
    };

    // console.log(data)

    setLoading(true);
    apiService
      .post(subUrl, data)
      .then((res) => {
        alert(res?.msg);
        console.log(res?.msg);
      })
      .catch((err) => {
        alert(err?.response?.data?.err);
        console.log(err?.response?.data?.err);
      })
      .finally((final) => {
        setLoading(false);
      });
  };
  return (
    <>
      {loading && <FullScreenLoading />}
      <div className="grid grid-cols-3 gap-4">
        <div className="">
          <label htmlFor="date" className="w-full m-auto">
            Date*
          </label>
          <input
            type="Date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="w-full border-blue-100 border-2 rounded-md bg-white p-2"
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity*</label>
          <input
            type="Number"
            value={qt}
            onChange={(e) => {
              setQt(e.target.value);
            }}
            className="w-full border-blue-100 border-2 rounded-md bg-white p-2"
          />
        </div>
        <div>
          <label htmlFor="remarks">Remarks*</label>
          <input
            type="text"
            value={rem}
            onChange={(e) => {
              setRem(e.target.value);
            }}
            className="w-full border-blue-100 border-2 rounded-md bg-white p-2"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-center items-center w-full ">
        <button
          className=" text-lg bg-green-400 hover:bg-green-500 rounded-md p-2 mx-2 text-white"
          onClick={handleSubmit}
        >
          Submit Details
        </button>
      </div>
    </>
  );
};

const Show = ({ id }) => {
  const [waterDetails, setWaterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalQt,setTotalQt]=useState(0);

  useEffect(() => {
    const subUrl = `/api/managements/water-management/get-water-details?id=${id}`;
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
  }, [id]);

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
export default WaterManagementsHome;
