import axios from "axios";
import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

// const serverUrl = process.env.REACT_APP_SERVER_URL;
const S3_BUCKET = "bpipl-attendance-image";
const REGION = "ap-south-1";
const access_key = process.env.REACT_APP_ACCESS_KEY;
const secrect_access_key = process.env.REACT_APP_SECRECT_ACCESS_KEY;
const serverUrl = process.env.REACT_APP_SERVER_URL;

const RequirementForm = ({ user }) => {
  const navigation = useNavigate();
    const [timeStamp, setTimeStamps] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState(null);
    const [submitText, setSubmitText] = useState("Submit");
    const [formData, setFormData] = useState({
      empType: "Select",
      date: "",
      empName: "",
      empId: "",
      empMobile: "",
      dateOfRequirement: "",
      materialUsed: [], // Default value
      state: "Select",
      district: "Select",
      block: "Select",
      siteName: "",
      workType: "",
      expensesAmount: "",
      expensesType: "",
      paymentMethod: "",
      paymentStatus: "",
      remarks: "",
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
      setTimeStamps(Date.now());
      const dateNow = new Intl.DateTimeFormat("en-GB").format(new Date());

      // console.log(dateNow);
      setFormData({ ...formData, date: dateNow });
    }, [formData]);

  

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
      const selectedState = states.find(
        (state) => state.stateName === stateName
      );
      setDistricts(selectedState ? selectedState.districts : []);
      setFormData((prevFormData) => ({
        ...prevFormData,
        district: "Select",
        block: "Select",
        siteName: "Select",
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
      const selectedBlock = blocks.find(
        (block) => block.blockName === blockName
      );
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

    const [isPaymentMethodReady, setIsPaymentMethodReady] = useState(false); // Flag for payment method ready

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setSubmitText(""); // Reset submission status

    };

    const ResetForm = async () => {
      setPaymentMethods("");
      setFormData((prevFormData) => ({
        ...prevFormData,
        empType: "Select",
        date: "",
        empName: "",
        empId: "",
        empMobile: "",
        dateOfRequirement: "",
        materialUsed: [],
        state: "Select",
        district: "Select",
        block: "Select",
        siteName: "",
        workType: "",
        expensesAmount: "",
        expensesType: "",
        paymentMethod: "",
        paymentStatus: "",
        remarks: "",
      }));
    };

 
    // if (!user) {
    //   navigation("/authentication/officials/officials-login");
    // }

    return (
      <>
      <form
        onSubmit={handleSubmit}
        className="max-w-full w-full  mx-auto p-4 border rounded shadow-md "
      >
        <h2 className="text-2xl font-bold flex mt-16  justify-center  mb-10">
          Requirement Form
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* designationType Type */}
          <div className="mb-4">
            <label htmlFor="designationType" className="block text-sm font-medium mb-1">
              Designation*
            </label>
            <select
              id="designationType"
              name="designationType"
              value={formData.designationType}
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
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Employee ID */}
          <div className="mb-4">
            <label htmlFor="id" className="block text-sm font-medium mb-1">
              ID*
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Mobile No. */}
          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium mb-1"
            >
              Mobile*
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
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
            <label
              htmlFor="district"
              className="block text-sm font-medium mb-1"
            >
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
            <label
              htmlFor="siteName"
              className="block text-sm font-medium mb-1"
            >
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
            <label
              htmlFor="workType"
              className="block text-sm font-medium mb-1"
            >
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
          <div className="mb-4 relative">
            <label
              htmlFor="materialUsed"
              className="block text-sm font-medium mb-1"
            >
              Material Used*
            </label>
            <select
              id="materialUsed"
              name="materialUsed"
              // value={selectedMaterialUsed}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select</option>
              <option value="morang">Morang</option>
              <option value="Steel">Steel</option>
              <option value="Cement(OCC)">Cement(OCC)</option>
              <option value="Cement(PCC)">Cement(PCC)</option>
              <option value="Brick">Brick</option>
              <option value="Concrete">Concrete </option>
              <option value="Paint">Paint</option>
              <option value="Gate">Gate</option>
              <option value="others">Others</option>
            </select>

            
          </div>
          <div>
            <label
              htmlFor="expensesType"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Requirement Type*
            </label>
            <select
              id="expensesType"
              name="expensesType"
              value={formData.expensesType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Expenses Type</option>
              <option value="manpower">Manpower</option>
              <option value="material">Material</option>
              <option value="tools and machinery">Tools & Machinery</option>
              <option value="repair">Repair</option>
              <option value="ration">Ration</option>
              <option value="vendor">Vendor</option>
              <option value="vendor">Self</option>
            </select>
          </div>
          {/* </div> */}

          {/* Payments Status */}

          <div>
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload QR Code/Passbook/UPI-Id picture
            </label>
            <input
              type="file"
              id="paymentMethod"
              name="paymentMethod"
              onChange={(e) => {
                // setAccountDetails(e.target.files[0]);
                setPaymentMethods(e.target.files[0]);
              }}
              accept="image/png, image/jpg, image/jpeg"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Please upload a clear image(jpg, jpeg, png files only) of the
              Account details.
            </p>
          </div>

          {/* <div>
          <label
            htmlFor="paymentStatus"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Payment Status
          </label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select Payment Status</option>
            <option value="Received">Received</option>
            <option value="Pending">Pending</option>
          </select>
        </div> */}
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
          {loading && (
            <ClipLoader color="#4A90E2" loading={loading} size={50} />
          )}
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
      </>
    );
  
};

export default RequirementForm;
