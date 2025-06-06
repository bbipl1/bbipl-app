import React, { useState } from "react";
import StatesManagement from "./StatesManagement";
import DistrictsManagement from "./DistrictsManagement";
import BlocksManagement from "./BlocksManagement";
import SitesManagement from "./SitesManagement";
import WorkTypeManagement from "./WorkTypeManagement";

import { Navigate, useNavigate, useLocation } from "react-router-dom";
import AllSites from "./AllSites";

const SitesUpdateManagement = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [activeComponent, setActiveComponent] = useState("all"); // State to track active component

  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "all":
        return <AllSites />;
      case "states":
        return <StatesManagement />;
      case "districts":
        return <DistrictsManagement />;
      case "blocks":
        return <BlocksManagement />;
      case "sites":
        return <SitesManagement />;
      case "work-type":
        return <WorkTypeManagement />;
      default:
        return (
          <p className="text-gray-600">Please select an option from above.</p>
        );
    }
  };

  // Function to determine button classes
  const getButtonClass = (component) => {
    const baseClass = "w-100 px-4 py-2 text-white rounded transition duration-200";
    if (activeComponent === component) {
      // Active button class
      return `${baseClass} bg-gray-300  text-black hover:bg-blue-700`;  // Adjust for other colors as needed
    } else {
      // Inactive button class
      return `${baseClass} bg-blue-500 hover:bg-blue-600`; // Adjust for other colors as needed
    }
  };

  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div className="grid gap-2 grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
        <button
          onClick={() => setActiveComponent("all")}
          className={getButtonClass("all")}
        >
          All sites
        </button>
        <button
          onClick={() => setActiveComponent("states")}
          className={getButtonClass("states")}
        >
          State
        </button>

        <button
          onClick={() => setActiveComponent("districts")}
          className={getButtonClass("districts")}
        >
          District
        </button>

        <button
          onClick={() => setActiveComponent("blocks")}
          className={getButtonClass("blocks")}
        >
          Block
        </button>

        <button
          onClick={() => setActiveComponent("sites")}
          className={getButtonClass("sites")}
        >
          Sites
        </button>

        <button
          onClick={() => setActiveComponent("work-type")}
          className={getButtonClass("work-type")}
        >
          Work Type
        </button>
      </div>

      <div className="bg-gray-50 rounded shadow">{renderComponent()}</div>
    </div>
  );
};

export default SitesUpdateManagement;
