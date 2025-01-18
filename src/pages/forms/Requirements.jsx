import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const RequirementForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitText, setSubmitText] = useState("Submit");
  const [formData, setFormData] = useState({
    date: "",
    empName: "",
    empId: "",
    empMobile: "",
    siteName: "",
    dateOfRequirement: "",
    requirementType: "Material", // Default value
    workType: "", // Added workType field
    remarks: "",
    state: "select",
    district: "select",
    block: "select",
    empType: "select", // Added Employee Type field
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [siteNames, setSiteNames] = useState([]);
  const [workTypes, setWorkTypes] = useState([]); // This will store workTypes fetched for a site

  useEffect(() => {
    // Fetching states on component mount
    fetchStates();
  }, []);

  useEffect(() => {
    // Set current date
    // const dateNow = (new Date()).toLocaleDateString();
    const dateNow = new Intl.DateTimeFormat("en-GB").format(new Date());

    console.log(dateNow);
    setFormData({ ...formData, date: dateNow });
  }, []);

  // Fetch states data from API
  const fetchStates = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/site-management/find-site-details`
      );
      setStates(res.data.data[0].states); // Assuming response data format
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Fetch districts based on selected state
  const fetchDistricts = (stateName) => {
    const selectedState = states.find((state) => state.stateName === stateName);
    setDistricts(selectedState ? selectedState.districts : []);
    setFormData((prevFormData) => ({
      ...prevFormData,
      district: "select",
      block: "select",
      siteName: "select",
      workType: "", // Reset workType when state or district changes
    }));
  };

  // Fetch blocks based on selected district
  const fetchBlocks = (districtName) => {
    const selectedDistrict = districts.find(
      (district) => district.districtName === districtName
    );
    setBlocks(selectedDistrict ? selectedDistrict.blocks : []);
    setFormData((prevFormData) => ({
      ...prevFormData,
      block: "select",
      siteName: "select",
      workType: "", // Reset workType when district or block changes
    }));
  };

  // Fetch site names based on selected block
  const fetchSiteNames = (blockName) => {
    const selectedBlock = blocks.find((block) => block.blockName === blockName);
    setSiteNames(selectedBlock ? selectedBlock.sites : []);
    setFormData((prevFormData) => ({
      ...prevFormData,
      siteName: "select",
      workType: "", // Reset workType when block or siteName changes
    }));
  };

  // Set work types based on selected site name
  const fetchWorkTypes = (siteName) => {
    const selectedSite = siteNames.find((site) => site.siteName === siteName);
    if (selectedSite) {
      setWorkTypes(selectedSite.workType || []);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      workType: "select", // Reset workType if no workType available
    }));
  };

  const handleChange = (e) => {
    setSubmitText("Submit");
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    // Fetch dependent data based on selected dropdown value
    if (name === "state") {
      fetchDistricts(value); // Fetch districts when state is selected
    } else if (name === "district") {
      fetchBlocks(value); // Fetch blocks when district is selected
    } else if (name === "block") {
      fetchSiteNames(value); // Fetch site names when block is selected
    } else if (name === "siteName") {
      fetchWorkTypes(value); // Fetch work types when site is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `${serverUrl}/api/forms/submit-form`;

    try {
      // Directly sending the POST request with data and headers
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json", // Correct header for JSON
        },
      });

      // Handle successful form submission
      setSubmitText("Submitted");
      console.log("Form Submitted:", formData);
    } catch (err) {
      // Handle errors during form submission
      console.error("Error submitting form:", err);
      setSubmitText("Failed!");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full w-full mt-20  mx-auto p-4 border rounded shadow-md "
    >
      <h2 className="text-2xl font-bold flex  justify-center  mb-10">
        Requirement Form
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Employee Type */}
        <div className="mb-4">
          <label htmlFor="empType" className="block text-sm font-medium mb-1">
            Employee Type*
          </label>
          <select
            id="empType"
            name="empType"
            value={formData.empType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="select">Select</option>
            <option value="vendor">Vendor</option>
            <option value="employee">Employee</option>
            {/* <option value="Contract">Contract</option> */}
          </select>
        </div>

        {/* Employee Name */}
        <div className="mb-4">
          <label htmlFor="empName" className="block text-sm font-medium mb-1">
            Employee Name*
          </label>
          <input
            type="text"
            id="empName"
            name="empName"
            value={formData.empName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Employee ID */}
        <div className="mb-4">
          <label htmlFor="empId" className="block text-sm font-medium mb-1">
            Employee ID*
          </label>
          <input
            type="text"
            id="empId"
            name="empId"
            value={formData.empId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Mobile No. */}
        <div className="mb-4">
          <label htmlFor="empMobile" className="block text-sm font-medium mb-1">
            Mobile*
          </label>
          <input
            type="text"
            id="empMobile"
            name="empMobile"
            value={formData.empMobile}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium mb-1">
            State*
          </label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="select">Select</option>
            {states.map((state) => (
              <option key={state._id} value={state.stateName}>
                {state.stateName}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div className="mb-4">
          <label htmlFor="district" className="block text-sm font-medium mb-1">
            District*
          </label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="select">Select</option>
            {districts.map((district) => (
              <option key={district._id} value={district.districtName}>
                {district.districtName}
              </option>
            ))}
          </select>
        </div>

        {/* Block */}
        <div className="mb-4">
          <label htmlFor="block" className="block text-sm font-medium mb-1">
            Block*
          </label>
          <select
            id="block"
            name="block"
            value={formData.block}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="select">Select</option>
            {blocks.map((block) => (
              <option key={block._id} value={block.blockName}>
                {block.blockName}
              </option>
            ))}
          </select>
        </div>

        {/* Site Name */}
        <div className="mb-4">
          <label htmlFor="siteName" className="block text-sm font-medium mb-1">
            Site Name*
          </label>
          <select
            id="siteName"
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="select">Select</option>
            {siteNames.map((site) => (
              <option key={site._id} value={site.siteName}>
                {site.siteName}
              </option>
            ))}
          </select>
        </div>

        {/* Work Type */}
        <div className="mb-4">
          <label htmlFor="workType" className="block text-sm font-medium mb-1">
            Type of Work*
          </label>
          <select
            id="workType"
            name="workType"
            value={formData.workType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="select">Select</option>
            {workTypes.map((type) => (
              <option key={type._id} value={type.workTypeName}>
                {type.workTypeName}
              </option>
            ))}
          </select>
        </div>

        {/* Date of Requirement */}
        <div className="mb-4">
          <label
            htmlFor="dateOfRequirement"
            className="block text-sm font-medium mb-1"
          >
            Date Of Requirement*
          </label>
          <input
            type="date"
            id="dateOfRequirement"
            name="dateOfRequirement"
            value={formData.dateOfRequirement}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Requirement Type */}
        <div className="mb-4">
          <label
            htmlFor="requirementType"
            className="block text-sm font-medium mb-1"
          >
            Requirement Type*
          </label>
          <select
            id="requirementType"
            name="requirementType"
            value={formData.requirementType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Material">Material</option>
            <option value="Amount">Amount</option>
          </select>
        </div>
      </div>

      {/* Remarks */}
      <div className="mb-4 ">
        <label htmlFor="remarks" className="block text-sm font-medium mb-1">
          Remarks*
        </label>
        <div className="w-full flex justify-center">
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="3"
          ></textarea>
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        {loading && <ClipLoader color="#4A90E2" loading={loading} size={50} />}
      </div>

      <div className="flex justify-center">
        {/* Submit Button */}
        <button
          type="submit"
          className="w-1/4  bg-blue-500 text-white py-2 rounded hover:bg-blue-600 "
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default RequirementForm;
