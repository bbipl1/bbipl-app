import React, { useState } from "react";
import Details from "./Details"; // Import the Details component
import Upload from "./UploadFiles"; // Import the Upload component
import Others from "./Others"; // Import the Others component
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import ContactUsMessages from "./ContactUsMessages";
import FormRequirementDetails from "./FormRequirementDetails";
import SiteManagement from "./SitesUpdateManagement";

const AdminDashboard = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [activeComponent, setActiveComponent] = useState("details"); // State to track active component

  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "details":
        return <Details />;
      case "upload":
        return <Upload />;
      case "contactUsMessages":
        return <ContactUsMessages />;
      case "form-requirements":
        return <FormRequirementDetails />;
      case "sites-management":
        return <SiteManagement />;
      default:
        return (
          <p className="text-gray-600">Please select an option from above.</p>
        );
    }
  };

  const handleLogout = () => {
    // alert("navigating")
    const allowMe = window.confirm("Are you sure to logOut?");
    if (allowMe) {
      navigate("/");
    }
  };

  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-14">
        Hi {data?.user?.empName}
      </h1>
      <div className=" grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        <button
          onClick={() => setActiveComponent("details")}
          className="w-100 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Show Details
        </button>
        
        <button
          onClick={() => setActiveComponent("upload")}
          className=" w-100 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Add Employees
        </button>
        <button
          onClick={() => setActiveComponent("sites-management")}
          className=" w-100 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Add Sites
        </button>
        <button
          onClick={() => setActiveComponent("form-requirements")}
          className=" w-100 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Requirements Form
        </button>
        <button
          onClick={() => setActiveComponent("contactUsMessages")}
          className=" w-100 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200"
        >
          Contact Us
        </button>
        <button
          onClick={() => handleLogout()}
          className=" w-100  px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-200"
        >
          Logout
        </button>
      </div>
      <div className=" bg-gray-50 rounded shadow">{renderComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
