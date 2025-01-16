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
    remarks: "",
  });

  useEffect(()=>{
    const dateNow=(new Date()).toLocaleDateString();
    console.log(dateNow)
    setFormData({...formData,'date':dateNow})
  },[]);

  const handleChange = (e) => {
    setSubmitText("Submit");
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `${serverUrl}/api/forms/submit-form`;
    const postBody = {
      method: "POST",
      Headers: {
        "content-Type": "application/json",
      },
    };

    await axios
      .post(url, formData, postBody)
      .then((res) => {
        if (res) {
          setSubmitText("Submitted");
          console.log("Form Submitted:", formData);
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitText("Failed!");
      });

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded shadow-md"
    >
      <h2 className="text-lg font-bold mb-4">Requirement Form</h2>
      {/* employee type */}
      <label htmlFor="employee-type" className="block text-sm font-medium mb-1">
        Employee Type*
      </label>
      <select
        id="employee-type"
        name="employee-type"
        className="w-full border rounded px-3 py-2"
      >
        <option value="vendor">Vendor</option>
        <option value="employee">Employee</option>
      </select>

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

      {/* Employee Mobile */}
      <div className="mb-4">
        <label htmlFor="empMobile" className="block text-sm font-medium mb-1">
          Mobile No.*
        </label>
        <input
          type="tel"
          id="empMobile"
          name="empMobile"
          value={formData.empMobile}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {/* Date */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <input
          type="text"
          id="date"
          name="date"
          disabled
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* state */}
      <div>
        <label htmlFor="state" className="block text-sm font-medium mb-1">
          State*
        </label>
        <select
          id="state"
          name="state"
          value={formData.state}
          className="w-full border rounded px-3 py-2"
        >
          <option value="select">Select</option>
          <option value="uttar-pradesh">Uttar Pradesh</option>
        </select>
      </div>
      {/* district */}
      <div>
        <label htmlFor="state" className="block text-sm font-medium mb-1">
          District*
        </label>
        <select
          id="district"
          name="district"
          value={formData.district}
          className="w-full border rounded px-3 py-2"
        >
          <option value="select">Select</option>
          <option value="unnao">Unnao</option>
          <option value="barabanki">Barabanki</option>
        </select>
      </div>
      {/* location */}
      <div className="mb-4">
        <label htmlFor="siteName" className="block text-sm font-medium mb-1">
          Location*
        </label>
        <select
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="select">Select</option>
          <option value="barahua">Barahua</option>
          <option value="gualchappa-kalan">Gulchappa Kalan</option>
          <option value="chamrauli"> Chamrauli</option>
        </select>
      </div>
      {/* site-name */}
      <div className="mb-4">
        <label htmlFor="siteName" className="block text-sm font-medium mb-1">
          Site Name*
        </label>
        <select
          type="text"
          id="site-name"
          name="site-name"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="pump-house">Pump House</option>
          <option value="boundary-wall">Boundary Wall</option>
          <optgroup label="Pipe Line">
            <option value="pipe-line-installation">Installation</option>
            <option value="pipe-line-maintenance">Maintenance</option>
          </optgroup>
          <option value="water-tank">Water Tank</option>
          <option value="connection">Connection</option>
          <option value="campus-development">Campus Development</option>
          <option value="cwr">(CWR)</option>
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

      {/* Remarks */}
      <div className="mb-4">
        <label htmlFor="remarks" className="block text-sm font-medium mb-1">
          Remarks*
        </label>
        <textarea
          id="remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows="3"
        ></textarea>
      </div>

      <div className="flex items-center justify-center mb-4">
        {loading && <ClipLoader color="#4A90E2" loading={loading} size={50} />}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        {submitText}
      </button>
    </form>
  );
};

export default RequirementForm;
