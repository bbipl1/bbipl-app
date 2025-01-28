import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageWorker = ({ siteEngineerId }) => {
  const [workers, setWorkers] = useState([]);
  const [siteEngObjectId, setSiteEngObjectId] = useState();
  const [newWorker, setNewWorker] = useState({
    name: "",
    mobile: "",
    aadhaarPhoto: null,
    panPhoto: null,
    accountDetailsPhoto: null,
  });
  const [view, setView] = useState("list"); // State to toggle between views

  const serverURL = process.env.REACT_APP_SERVER_URL;

  // Fetch site engineer object ID
  useEffect(() => {
    const url = `${serverURL}/api/constructions/site-engineers/get-site-engineer?id=${siteEngineerId}`;
    axios
      .get(url)
      .then((res) => {
        setSiteEngObjectId(res?.data?.data?.siteEngObjId);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [siteEngineerId]);

  // Fetch workers assigned to the site engineer
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const url = `${serverURL}/api/constructions/site-engineers/get-all-workers?siteEngineerId=${siteEngineerId}`;
        const response = await axios.get(url);
        // console.log(response);
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchWorkers();
  }, [siteEngineerId]);

  // Handle file input changes
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    console.log("File selected for", field, file);
    setNewWorker({ ...newWorker, [field]: file });
  };

  // Handle adding a new worker
  const handleAddWorker = async () => {
    const { name, mobile, aadhaarPhoto, panPhoto, accountDetailsPhoto } =
      newWorker;
    if (
      !name ||
      !mobile ||
      !aadhaarPhoto ||
      !panPhoto ||
      !accountDetailsPhoto
    ) {
      alert("Please fill in all fields and upload all required documents");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("aadhaarPhoto", aadhaarPhoto);
    formData.append("panPhoto", panPhoto);
    formData.append("accountDetailsPhoto", accountDetailsPhoto);
    formData.append("siteEngineerId", siteEngineerId);
    formData.append("siteEngObjId", siteEngObjectId);

    // Log FormData contents to debug
    // for (let [key, value] of formData.entries()) {
    //   console.log("loop", key, value);
    // }
    // console.log("wl", formData);
   

    try {
      const response = await axios.post(
        `${serverURL}/api/constructions/site-engineers/add-worker`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setWorkers([...workers, response.data]);
      setNewWorker({
        name: "",
        mobile: "",
        aadhaarPhoto: null,
        panPhoto: null,
        accountDetailsPhoto: null,
      });
    } catch (error) {
      console.error("Error adding worker:", error);
    }
  };

  // Handle deleting a worker
  const handleDeleteWorker = async (workerId) => {
    try {
      await axios.delete(
        `${serverURL}/api/siteengineer/${siteEngineerId}/workers/${workerId}`
      );
      setWorkers(workers.filter((worker) => worker._id !== workerId));
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow">
      <div className="mb-4">
        {/* Navigation for different views */}
        <button
          onClick={() => setView("list")}
          className="p-2 bg-blue-500 text-white rounded-md mr-2"
        >
          Manpower List
        </button>
        <button
          onClick={() => setView("add")}
          className="p-2 bg-blue-500 text-white rounded-md mr-2"
        >
          Add Manpower
        </button>
        <button
          onClick={() => setView("delete")}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Deleted Manpower
        </button>
      </div>

      {/* Conditional Rendering for different views */}
      {view === "list" && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Workers List</h3>
          <ul className="space-y-3">
            {workers.map((worker) => (
              <li
                key={worker._id}
                className="flex items-center justify-between p-2 bg-white rounded-md shadow"
              >
                <span>
                  {worker.name} - {worker.mobile}
                </span>
                <button
                  onClick={() => handleDeleteWorker(worker._id)}
                  className="p-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === "add" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add New Worker</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="name">Worker Name</label>
              <input
                id="name"
                type="text"
                placeholder="Worker Name"
                value={newWorker.name}
                onChange={(e) =>
                  setNewWorker({ ...newWorker, name: e.target.value })
                }
                className="p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="mobile">Worker Mobile</label>
              <input
                id="mobile"
                type="text"
                placeholder="Mobile"
                value={newWorker.mobile}
                onChange={(e) =>
                  setNewWorker({ ...newWorker, mobile: e.target.value })
                }
                className="p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Aadhaar Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Aadhaar Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "aadhaarPhoto")}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* PAN Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                PAN Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "panPhoto")}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Account Details Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Details Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "accountDetailsPhoto")}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <button
              onClick={handleAddWorker}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md"
            >
              Add Worker
            </button>
          </div>
        </div>
      )}

      {view === "delete" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Deleted Worker</h3>
          <p>Coming soon</p>
        </div>
      )}
    </div>
  );
};

export default ManageWorker;
