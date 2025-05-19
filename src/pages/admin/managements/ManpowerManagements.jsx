import React, { useEffect, useState } from "react";
import apiService from "../../../api/services/apiServices";
import { Edit2Icon, Lock, Trash2, UnlockIcon, X } from "lucide-react";
import FullScreenLoading from "../../../loading/FullScreenLoading";

const ManpowerManagements = () => {
  const [siteEngs, setSiteEngs] = useState(null);
  const [selectedSiteEngId, setSelectedSiteEngId] = useState(null);
  const [selectedSiteEng, setSelectedSiteEng] = useState(null);
  const [showImg, setShowImg] = useState(false);
  const [showImgurl, setShowImgurl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const suburl = `/api/constructions/site-engineers/get-all-site-engineers?populate_user=true`;
    apiService
      .get(suburl)
      .then((res) => {
        console.log(res.data);
        setSiteEngs(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    setSelectedSiteEng(
      siteEngs?.find((se) => se?.siteEngObjId?.id === selectedSiteEngId)
    );
  }, [selectedSiteEngId, siteEngs]);

  const handleEdit = () => {
    alert("Coming soon.");
  };

  const handleDelete = () => {
    alert("Coming soon.");
  };

  const handleLock = (id) => {
     const userRes = window.confirm(
      "Are you sure to lock manpower?\nNote: pan/aadhaar/account details of the manpower can not be updated by site engineer."
    );
    if (!userRes) {
      return;
    }
    setIsLoading(true);
    const suburl = `/api/constructions/site-engineers/lock-worker-to-not-upload-images`;
    const payload = { id };
    apiService
      .put(suburl, payload)
      .then((res) => {
        console.log(res);
        setRefresh(refresh + 1);
        alert(res?.msg);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.err) {
          alert("something went wrong");
        } else {
          alert(err?.response?.data?.err);
        }
      })
      .finally((final) => {
        setIsLoading(false);
      });
  };

  const handleUnlock = (id) => {
    const userRes = window.confirm(
      "Are you sure to unlock manpower?\nNote: pan/aadhaar/account details of the manpower can be updated by site engineer."
    );
    if (!userRes) {
      return;
    }
    setIsLoading(true)
    const suburl = `/api/constructions/site-engineers/unlock-worker-to-upload-images`;
    const payload = { id };
    apiService
      .put(suburl, payload)
      .then((res) => {
        console.log(res);
        setRefresh(refresh + 1);
        alert(res?.msg);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.err) {
          alert("something went wrong");
        } else {
          alert(err?.response?.data?.err);
        }
      })
      .finally((final) => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading && <FullScreenLoading />}
      {showImg && (
        <>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-blue-200 bg-blue-300 p-4 rounded-lg shadow-lg">
            <X
              onClick={() => {
                setShowImg(false);
              }}
              className="text-red-500 cursor-pointer mt-2 absolute right-0 top-0"
              size={32}
            />
            <img
              className="w-96 h-96 object-contain"
              src={showImgurl}
              alt="img"
            />
          </div>
        </>
      )}
      <div className="flex flex-col justify-center items-center w-60 justify-self-center">
        <label htmlFor="selectSiteEng" className="text-xl">
          Select site engineer*
        </label>
        <select
          id="selectSiteEng"
          className="w-full p-2 rounded-md border-2 border-blue-300"
          value={selectedSiteEngId}
          onChange={(e) => {
            setSelectedSiteEngId(e.target.value);
          }}
        >
          <option value="null">Select</option>
          {siteEngs &&
            Array.isArray(siteEngs) &&
            siteEngs
              .filter((se) => se?.siteEngObjId?.id)
              .sort((a, b) => {
                const idA = a.siteEngObjId.id.toString();
                const idB = b.siteEngObjId.id.toString();
                return idA.localeCompare(idB, undefined, { numeric: true });
              })
              .map((se) => {
                return (
                  <>
                    <option
                      key={`${se?.siteEngObjId?.id}`}
                      value={`${se?.siteEngObjId?.id}`}
                    >
                      {se?.siteEngObjId?.id}-{se?.siteEngObjId?.name}
                    </option>
                  </>
                );
              })}
        </select>
      </div>

      <div className="w-full mt-20">
        <div className="w-full overflow-x-auto overflow-y-auto">
          {selectedSiteEngId === null && (
            <>
              {" "}
              <div className="text-center text-xl mb-8">
                Please select site engineer from the above list.
              </div>
            </>
          )}

          <div className="text-lg font-bold my-4 ml-4 text-green-500">
            Current manpower:
          </div>
          {selectedSiteEngId !== null &&
          selectedSiteEng?.workersCurrent &&
          Array.isArray(selectedSiteEng.workersCurrent) &&
          selectedSiteEng.workersCurrent.length > 0 ? (
            <table className="w-full">
              <thead className="w-full bg-gray-600 text-white">
                <th>S/N</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Joining Details</th>
                <th>A/C details</th>
                <th>PAN details</th>
                <th>Aadhaar details</th>
                <th>Actions</th>
              </thead>
              <tbody className="w-full mx-auto">
                {selectedSiteEng?.workersCurrent &&
                  Array.isArray(selectedSiteEng.workersCurrent) &&
                  selectedSiteEng.workersCurrent.map((wc, ind) => {
                    return (
                      <tr
                        key={ind}
                        className={`mx-auto text-center ${
                          ind % 2 === 1 ? "bg-gray-200" : "bg-white"
                        }`}
                      >
                        <td>{++ind}</td>
                        <td className=" ">{wc.name}</td>
                        <td>{wc.mobile}</td>
                        <td>{wc.date}</td>
                        <td>
                          <img
                            className="w-20 h-20"
                            src={`${wc?.accountDetailsURL}`}
                            alt="img"
                            onClick={() => {
                              setShowImg(true);
                              setShowImgurl(wc?.accountDetailsURL);
                            }}
                          />
                        </td>
                        <td>
                          <img
                            className="w-20 h-20"
                            src={`${wc?.panCardURL}`}
                            alt="img"
                            onClick={() => {
                              setShowImg(true);
                              setShowImgurl(wc?.panCardURL);
                            }}
                          />
                        </td>
                        <td>
                          <img
                            className="w-20 h-20"
                            src={`${wc?.aadhaarURL}`}
                            alt="img"
                            onClick={() => {
                              setShowImg(true);
                              setShowImgurl(wc?.aadhaarURL);
                            }}
                          />
                        </td>
                        <td>
                          <div className="flex justify-evenly">
                            {wc?.isEditable ? (
                              <>
                                <UnlockIcon
                                  onClick={() => {
                                    
                                     handleLock(wc?._id);
                                  }}
                                  className="text-red-500 cursor-pointer"
                                />
                              </>
                            ) : (
                              <>
                                <Lock
                                  onClick={() => {
                                   handleUnlock(wc?._id);
                                  }}
                                  className="text-green-500 cursor-pointer"
                                />
                              </>
                            )}
                            <Edit2Icon
                              onClick={handleEdit}
                              className="text-green-500 hover:text-green-600 cursor-pointer"
                            />{" "}
                            <Trash2
                              onClick={handleDelete}
                              className="text-red-500 hover:text-red-600 cursor-pointer"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-lg">
              {selectedSiteEngId !== null && (
                <div>
                  Manpower is not available for this{" "}
                  <span className="text-red-500 font-bold">
                    {selectedSiteEng?.siteEngObjId?.name}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="text-lg font-bold my-4 ml-4 text-red-500">
            Previous manpower:
          </div>
          <div className="w-full overflow-x-auto overflow-y-auto mb-20">
            {selectedSiteEngId !== null &&
            selectedSiteEng?.workersOld &&
            Array.isArray(selectedSiteEng.workersOld) &&
            selectedSiteEng.workersOld.length > 0 ? (
              <table className="w-full">
                <thead className="w-full bg-gray-600 text-white">
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Joining Details</th>
                  <th>A/C details</th>
                  <th>PAN details</th>
                  <th>Aadhaar details</th>
                  <th>Actions</th>
                </thead>
                <tbody className="w-full mx-auto">
                  {selectedSiteEng?.workersOld &&
                    Array.isArray(selectedSiteEng.workersOld) &&
                    selectedSiteEng.workersOld.map((wc, ind) => {
                      return (
                        <tr
                          key={ind}
                          className={`mx-auto text-center ${
                            ind % 2 === 1 ? "bg-gray-200" : "bg-white"
                          }`}
                        >
                          <td>{++ind}</td>
                          <td className=" ">{wc.name}</td>
                          <td>{wc.mobile}</td>
                          <td>{wc.date}</td>
                          <td>
                            <img
                              className="w-20 h-20"
                              src={`${wc?.accountDetailsURL}`}
                              alt="img"
                              onClick={() => {
                                setShowImg(true);
                                setShowImgurl(wc?.accountDetailsURL);
                              }}
                            />
                          </td>
                          <td>
                            <img
                              className="w-20 h-20"
                              src={`${wc?.panCardURL}`}
                              alt="img"
                              onClick={() => {
                                setShowImg(true);
                                setShowImgurl(wc?.panCardURL);
                              }}
                            />
                          </td>
                          <td>
                            <img
                              className="w-20 h-20"
                              src={`${wc?.aadhaarURL}`}
                              alt="img"
                              onClick={() => {
                                setShowImg(true);
                                setShowImgurl(wc?.aadhaarURL);
                              }}
                            />
                          </td>
                          <td>
                            <div className="flex justify-evenly">
                                {wc?.isEditable ? (
                              <>
                                <UnlockIcon
                                  onClick={() => {
                                    
                                    //  handleLock(wc?._id);
                                    alert("Permission not allowed.")
                                  }}
                                  className="text-red-500 cursor-pointer"
                                />
                              </>
                            ) : (
                              <>
                                <Lock
                                  onClick={() => {
                                //    handleUnlock(wc?._id);
                                alert("Permission not allowed.")
                                  }}
                                  className="text-green-500 cursor-pointer"
                                />
                              </>
                            )}
                              <Edit2Icon
                                onClick={handleEdit}
                                className="text-green-500 hover:text-green-600 cursor-pointer"
                              />{" "}
                              <Trash2
                                onClick={handleDelete}
                                className="text-red-500 hover:text-red-600 cursor-pointer"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-lg ">
                {selectedSiteEngId !== null && (
                  <div>
                    Previous manpower is not available for this{" "}
                    <span className="text-red-500 font-bold">
                      {selectedSiteEng?.siteEngObjId?.name}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManpowerManagements;
