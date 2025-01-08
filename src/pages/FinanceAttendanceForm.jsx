import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
const FinanceAttendanceForm = () => {
    const navigate=useNavigate();
    const handleBack=()=>{
        navigate("/authentication/login")
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-600">
          We're working hard to bring this feature to life. Stay tuned for updates!
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceAttendanceForm;
