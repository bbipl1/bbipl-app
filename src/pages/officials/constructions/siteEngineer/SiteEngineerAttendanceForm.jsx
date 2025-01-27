import React, { useState, useEffect } from "react";
import axios from "axios";
import CameraImage from "../../../../utility/CameraImage.jsx";

const serverURL = process.env.REACT_APP_SERVER_URL;

const SiteEngineerAttendanceForm = ({ siteEngId, siteEngName }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [selectedWorkerIds, setSelectedWorkerIds] = useState({});
  const [photos, setPhotos] = useState({});

  // Fetch workers associated with the Site Engineer
  useEffect(() => {
    const url = `${serverURL}/api/constructions/site-engineers/get-all-workers?siteEngineerId=${siteEngId}`;
    axios
      .get(url)
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching workers:", err);
      });
  }, [siteEngId]);

  // Capture photo callback from CameraImage
  const handleCapture = (imageData, workerId) => {
    setIsCameraOpen(true)
    setPhotos((prevPhotos) => ({ ...prevPhotos, [workerId]: imageData }));
  };

  // Handle worker selection
  const handleWorkerSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const updatedSelections = selectedOptions.reduce((acc, option) => {
      acc[option.getAttribute("data-name")] = option.value;
      return acc;
    }, {});
    setSelectedWorkerIds((prev) => ({ ...prev, ...updatedSelections }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (Object.keys(selectedWorkerIds).length === 0) {
      alert("Please select at least one worker.");
      return;
    }

    const payload = Object.entries(selectedWorkerIds).map(
      ([workerName, workerId]) => ({
        siteEngId,
        siteEngName,
        workerId,
        workerName,
        photo: photos[workerId],
      })
    );

    try {
      const response = await axios.post(
        `${serverURL}/api/submit-attendance`,
        payload
      );
      console.log("Form submitted successfully:", response.data);
      alert("Attendance submitted successfully.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit attendance.");
    }
  };

  const startCamera=()=>{
    setIsCameraOpen(true)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      {/* <CameraImage/> */}
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-2xl font-bold mb-6">
          Site Engineer Attendance Form
        </h2>

        {/* Site Engineer Details */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">
            Site Engineer ID: {siteEngId}
          </p>
          <p className="text-sm font-medium text-gray-700">
            Site Engineer Name: {siteEngName}
          </p>
        </div>

        {/* Worker Selection Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Workers
          </label>
          <select
            multiple
            onChange={handleWorkerSelect}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id} data-name={worker.name}>
                {worker.name}
              </option>
            ))}
          </select>
        </div>

        {/* Display Selected Worker Details */}
        {Object.keys(selectedWorkerIds).length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Selected Workers</h3>
            {Object.entries(selectedWorkerIds).map(([workerName, workerId]) => (
              <div
                key={workerId}
                className="p-4 border border-gray-300 rounded-md mb-4"
              >
                <p className="text-sm font-medium text-gray-700">
                  Name: {workerName}
                </p>
                {
                  !isCameraOpen && <div onClick={startCamera} className="w-28 mt-4 text-white p-2 bg-blue-500 rounded-md">
                    start Camera
                  </div>
                }
                <div className="flex items-center gap-4 mt-4">
                  {isCameraOpen && (
                    <CameraImage setIsCameraOpen={setIsCameraOpen}
                      onCapture={(imageData) =>
                        handleCapture(imageData, workerId)
                      }
                    />
                  )}
                  {photos[workerId] && (
                    <img
                      src={photos[workerId]}
                      alt={`Captured for ${workerName}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div>
          <div className="flex flex-col">
            <label htmlFor="site-Location">site Location</label>
            <input type="number" 
            className=""
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default SiteEngineerAttendanceForm;
