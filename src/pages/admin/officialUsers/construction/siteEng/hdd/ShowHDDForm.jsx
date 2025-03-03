import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import FullScreenLoading from "../../../../../../loading/FullScreenLoading";
import UpdateHDD from "./UpdateHDD";
const serverUrl = process.env.REACT_APP_SERVER_URL;
const ShowAllForms = ({ siteEngineerId }) => {
  const [allForms, setAllForms] = useState();
  const [viewHdd, setViewHdd] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [toUpdateDoc, setToUpdateDoc] = useState(null);

  useEffect(() => {
    const url = `${serverUrl}/api/constructions/site-engineers/get-hdd-forms`;

    const header = {
      header: "application/json",
    };
    axios
      .get(url, header)
      .then((res) => {
        // console.log("res", res.data.data);
        setAllForms(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [siteEngineerId, refresh]);

  const viewSingleHDD = (hdd) => {
    return (
      <div className="fixed left-0 top-24 w-full h-full bg-slate-100 p-8">
        <div className="flex flex-row justify-end relative">
          <div className=" absolute left-0 top-8  w-full flex justify-center items-center ">
            <p className="text-xl font-bold"> HDD Form Details.</p>
          </div>

          <div onClick={() => setViewHdd(null)}>
            <X
              className="m-1 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer"
              size={32}
            />
          </div>
        </div>
        <div className="mt-8">
          {hdd && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="mb-4">
                  <h1 className="text-lg font-bold">General details.</h1>
                  <p>Name: {hdd?.siteEngObjId?.siteEngObjId?.name}</p>
                  <p>Date: {hdd?.date}</p>
                  <p>Payment status: {hdd?.paymentRec?.status}</p>
                  <p>Payment Received: {hdd?.paymentRec?.amount}</p>
                  <p>
                    Date of Requirement (YYYY-MM-DD): {hdd?.dateOfRequirements}
                  </p>
                  <p>Remarks: {hdd?.remarks}</p>
                </div>

                <div className="mb-4">
                  {hdd?.hddDetails.length > 0 ? (
                    <>
                      <div>
                        <h1 className="text-lg font-bold">
                          HDD machine details.
                        </h1>
                        <table>
                          <thead>
                            <tr>
                              <th className="border-2 p-1">S/R</th>
                              <th className="border-2 p-1">Diameter (mtr)</th>
                              <th className="border-2 p-1">Length (mtr)</th>
                              <th className="border-2 p-1">Rate/mtr (INR)</th>
                              <th className="border-2 p-1">Total Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {hdd &&
                              hdd.hddDetails &&
                              hdd.hddDetails.map((hd, ind) => {
                                return (
                                  <tr>
                                    <td className="border-2 p-1">{++ind}</td>
                                    <td className="border-2 p-1">{hd?.dia}</td>
                                    <td className="border-2 p-1">
                                      {hd?.meter}
                                    </td>
                                    <td className="border-2 p-1">{hd?.rate}</td>
                                    <td className="border-2 p-1">
                                      Rs.{Number(hd?.meter) * Number(hd?.rate)}
                                      /-
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p>HDD machine report is not available.</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="mb-4">
                  {hdd?.hddDetails.length > 0 ? (
                    <>
                      <div className="">
                        <div>
                          <h1 className="text-lg font-bold">Other expenses.</h1>
                          {hdd &&
                            hdd.expenses &&
                            hdd.expenses.map((exp, ind) => {
                              return (
                                <>
                                  <div>
                                    <p>
                                      {++ind}) {exp?.name}: Rs.{exp?.value}/-
                                    </p>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p>Expenses report is not available.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const DeleteForm = (formId) => {
    const response = window.confirm(
      "Are you sure? All the data will be deleted permanently."
    );
    if (!response) {
      return;
    }

    const url = `${serverUrl}/api/admin/official-users/construction/site-eng/hdd-report/delete-report?docId=${formId}`;
    const header = {
      "Content-Type": "application/json",
    };

    const payload = {};

    setIsLoading(true);

    axios
      .delete(url, header)
      .then((res) => {
        setRefresh(refresh + 1);
        alert(res?.data?.message);
      })
      .catch((error) => {
        console.log(error);
        alert(error?.response?.data?.message);
      })
      .finally((final) => {
        setIsLoading(false);
      });
  };

  const handleEditHdd = (doc) => {
    // alert("Coming soon.")
    setToUpdateDoc(doc);
  };
  return (
    <div className="w-full">
      {viewHdd && viewSingleHDD(viewHdd)}
      {isLoading && <FullScreenLoading />}
      {toUpdateDoc && (
        <UpdateHDD
          refresh={refresh}
          setRefresh={setRefresh}
          doc={toUpdateDoc}
          handleClose={setToUpdateDoc}
        />
      )}

      {allForms && Array.isArray(allForms) ? (
        <>
          <div className="w-full">
            <div></div>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-2 border-gray-100">
                <thead className="w-full bg-slate-200">
                  <tr>
                    <th className="border-2 p-1">Date</th>
                    <th className="border-2 p-1">User name</th>
                    <th className="border-2 p-1">Client name</th>
                    <th className="border-2 p-1">site name</th>
                    <th className="border-2 p-1">Date of work</th>
                    <th className="border-2 p-1">DIA (mtr)</th>
                    {/* <th  className="border-2 p-1">No Of Jobs</th> */}
                    <th className="border-2 p-1">Length (mtr)</th>
                    <th className="border-2 p-1">Rate/mtr (INR)</th>
                    <th className="border-2 p-1">Amount (INR)</th>
                    <th className="border-2 p-1 max-w-12">
                      payment received from client
                    </th>
                    <th className="border-2 p-1">Expenses</th>
                    {/* <th className="border-2 p-1">Remarks</th> */}
                    <th className="border-2 p-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allForms?.map((expense, i) => {
                    return (
                      <>
                        <tr
                          className={`w-full ${
                            i % 2 === 0 ? "bg-white" : "bg-blue-50"
                          }`}
                        >
                          <td className="border-2 p-1">{expense?.date}</td>
                          <td className="border-2 p-1">
                            {expense?.siteEngObjId?.siteEngObjId?.name}
                          </td>
                          <td className="border-2 p-1">
                            {expense?.paymentReceivedFromClient?.clientName}
                          </td>
                          <td className="border-2 p-1">{expense?.siteName}</td>
                          <td className="border-2 p-1">
                            {expense?.dateOfRequirements}
                          </td>
                          <td className="border-2">
                            {expense &&
                              expense?.hddDetails?.map((ex, ind) => {
                                return (
                                  <>
                                    <p className="flex justify-start ">
                                      {++ind}) {ex.dia}
                                    </p>
                                    {/* <hr className="bg-gray-600 w-full "/> */}
                                  </>
                                );
                              })}
                          </td>
                          <td className="border-2">
                            {expense &&
                              expense?.hddDetails?.map((ex, ind) => {
                                return (
                                  <>
                                    <p className="flex justify-start pl-4  ">
                                      {ex.meter}
                                    </p>
                                  </>
                                );
                              })}
                          </td>
                          <td className="border-2">
                            {expense &&
                              expense?.hddDetails?.map((ex, ind) => {
                                return (
                                  <>
                                    <p className="flex justify-start pl-4 ">
                                      {ex.rate}
                                    </p>
                                  </>
                                );
                              })}
                          </td>
                          <td className="border-2">
                            {expense &&
                              expense?.hddDetails?.map((ex, ind) => {
                                return (
                                  <>
                                    <p className="flex justify-start pl-4 ">
                                      RS. {Number(ex.rate) * Number(ex.meter)}/-
                                    </p>
                                  </>
                                );
                              })}
                          </td>

                          <td className="border-2 p-1">
                        
                            {Number(expense?.paymentReceivedFromClient?.amount)>0? 
                              <p className="text-green-500">
                                Rs.
                                {expense?.paymentReceivedFromClient?.amount}/-
                              </p>:<p className="text-red-500">Not received</p>
                            }
                          </td>
                          <td className="border-2 p-1">
                            {expense?.expenses?.map((ex) => {
                              return (
                                <>
                                  <p>
                                    {ex.name}: {ex.value}
                                  </p>
                                </>
                              );
                            })}
                          </td>
                          {/* <td className="border-2 p-1 max-w-52">
                            {expense.remarks}
                          </td> */}
                          <td className="border-2 p-1 min-w-20">
                            <div className="grid grid-cols-1">
                              <button
                                onClick={() => {
                                  handleEditHdd(expense);
                                }}
                                className="p-1 m-1 bg-green-500 hover:bg-green-600 text-white rounded-md w-16"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setViewHdd(expense);
                                }}
                                className="p-1 m-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-16"
                              >
                                View
                              </button>
                              <button
                                onClick={() => {
                                  DeleteForm(expense?._id);
                                }}
                                className="p-1 m-1 bg-red-500 hover:bg-red-600 text-white rounded-md w-16"
                              >
                                Delete
                              </button>{" "}
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="flex justify-center pt-16">
              ----------------------------------------------------------------------------------------
            </div>
            <div className="flex justify-center pb-20">
              <p>
                <span className="text-red-500 font-bold">NOTE:-</span> Amount is
                calculated as Rate*Length
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full ">
            <h1>Form not found.</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowAllForms;
