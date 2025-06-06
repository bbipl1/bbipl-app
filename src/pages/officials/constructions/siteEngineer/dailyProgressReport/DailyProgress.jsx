import axios from "axios";
import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const DailyProgress = ({ user }) => {
  const navigation = useNavigate();

  //expenses
  const [isExpensesTypeOpen, setIsExpenseTypeOpen] = useState(false);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  // machinary used
  const [isMachinaryOpen, setIsMachinaryOpen] = useState(false);
  const [selectedMachinaryUsed, setSelectedMachinaryUsed] = useState();
  //todays work
  const [isTodaysWorkOpen, setIsTodaysWorkOpen] = useState(false);
  const [selectdTodaysWork, setSelectedTodaysWork] = useState([]);

  const [loading, setLoading] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState(null);
  const [submitText, setSubmitText] = useState("Submit");
  const [formData, setFormData] = useState({
    id: `${user?.id}`,
    name: `${user?.name}`,
    mobile: `${user?.mobile}`,
    state: "Select",
    district: "Select", // Default value
    block: "Select",
    siteName: "Select",
    workType: "Select",
    todaysWork: [],
    machinaryUsed: [],
    expenses: {
      type: [],
      required: "0",
      status: "Unpaid",
    },

    remarks: "",
    qr: null,
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [siteNames, setSiteNames] = useState([]);
  const [workTypes, setWorkTypes] = useState([]); // This will store workTypes fetched for a site
  const [todaysWork, setTodaysWork] = useState();

  useEffect(() => {
    // Fetching states on component mount
    // console.log(paymentMethods.size)
    // console.log(user?.id)
    fetchStates();
  }, []);

  // Fetch states data from API
  const fetchStates = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${serverUrl}/api/site-management/find-site-details`
      );
      setStates(res.data.data[0].states); // Assuming response data format
      setLoading(false);
    } catch (error) {
      console.error("Error fetching states:", error);
      setLoading(false);
    }
  };

  // Fetch districts based on selected state
  const fetchDistricts = (stateName) => {
    const selectedState = states.find((state) => state.stateName === stateName);
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
    console.log(name, value);
    console.log(formData);
    if (name === "type") {
      handleExpenseAdd(name, value);
      // setFormData((prevFormData) => ({ ...prevFormData, expenses: { ...prevFormData.expenses, [name]: selectedExpenses }}));
    } else if (name === "machinaryUsed") {
      // alert("ji")
      handleMachinaryUsedAdd(name, value);
    } else if (name === "todaysWork") {
      // alert("ji")
      handleTodaysWorkAdd(name, value);
    } else if (name === "required") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        expenses: { ...prevFormData.expenses, [name]: value },
      }));
    } else if (name === "status") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        expenses: { ...prevFormData.expenses, [name]: value },
      }));
      // setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    } else if (name === "qr") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: e.target.files[0],
      }));
      console.log("qr");
      // setFormData((prevFormData) => ({
      //   ...prevFormData,
      //   expenses: { ...prevFormData.expenses, [name]: e.target.files[0] },
      // }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

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
    setSubmitText("Submitting"); // Reset submission status
    // console.log(formData);
    // return;

    // console.log("Form Submitted:", formData);
    const url = `${serverUrl}/api/constructions/site-engineers/submit-daily-progress-report`;
    const headers = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    axios
      .post(url, formData, headers)
      .then((response) => {
        if (response) {
          console.log("Submitted");
          alert("Form submitted successfully");
          setSubmitText("Submitted");
          ResetForm();
        } else {
          setSubmitText("Failed");
          console.log("form not submitted.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setSubmitText("Error");
      })
      .finally((final) => {
        setLoading(false);
      });
  };

  const ResetForm = async () => {
    setPaymentMethods("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: ` `,
      name: ` `,
      mobile: ` `,
      state: "Select",
      district: "Select", // Default value
      block: "Select",
      siteName: "Select",
      workType: "Select",
      todaysWork: [],
      machinaryUsed: [],
      expenses: {
        type: [],
        required: "0",
        status: "Select",
      },

      remarks: "",
      qr: null,
    }));
  };

  const handleExpenseAdd = (name, value) => {
    setIsExpenseTypeOpen(true);

    // Add to selectedExpenses
    setSelectedExpenses((prev) => [...prev, { name, value }]);
    console.log(selectedExpenses);

    // Add to formData.expenses.type (as array of unique values)
    setFormData((prevFormData) => ({
      ...prevFormData,
      expenses: {
        ...prevFormData.expenses,
        type: Array.isArray(prevFormData.expenses?.type)
          ? [
              ...new Set([...prevFormData.expenses.type, value]), // Add new value and ensure uniqueness
            ]
          : [value], // Initialize as an array if undefined
        required: prevFormData.expenses?.required || "0",
        status: prevFormData.expenses?.status || "Unpaid",
      },
    }));
  };

  const handleExpenseDelete = (value) => {
    setSelectedExpenses(
      (prev) => prev.filter((expense) => expense.value !== value) // Remove by value
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      expenses: {
        ...prevFormData.expenses,
        type: prevFormData.expenses.type.filter(
          (expenseValue) => expenseValue !== value
        ), // Remove from the type array
        required: prevFormData.expenses?.required || "0",
        status: prevFormData.expenses?.status || "Unpaid",
      },
    }));
  };

  const handleMachinaryUsedAdd = (name, value) => {
    setIsMachinaryOpen(true);

    // Add to selectedExpenses
    setSelectedExpenses((prev) => [...prev, { name, value }]);

    // Add to formData.machineryUsed (ensure uniqueness)
    setFormData((prevFormData) => ({
      ...prevFormData,
      machinaryUsed: [
        ...new Set([...prevFormData.machinaryUsed, value]), // Ensure value is unique in array
      ],
    }));
  };

  const handleMachinaryUsedDelete = (value) => {
    // Remove the value from selectedExpenses
    setSelectedMachinaryUsed((prev) =>
      prev.filter((expense) => expense.value !== value)
    );

    // Remove the value from formData.machineryUsed (ensuring uniqueness after deletion)
    setFormData((prevFormData) => ({
      ...prevFormData,
      machinaryUsed: prevFormData.machinaryUsed.filter(
        (item) => item !== value
      ),
    }));
  };

  const handleTodaysWorkAdd = (name, value) => {
    setIsTodaysWorkOpen(true);

    // console.log(selectdTodaysWork)

    // Add to selectedExpenses
    setSelectedTodaysWork((prev) => ({ ...prev, [name]: value }));

    // Add to formData.machineryUsed (ensure uniqueness)
    setFormData((prevFormData) => ({
      ...prevFormData,
      todaysWork: [
        ...new Set([...prevFormData.todaysWork, value]), // Ensure value is unique in array
      ],
    }));
  };

  const handleTodaysWorkDelete = (value) => {
    // Remove the value from selectedExpenses
    setSelectedTodaysWork((prev) =>
      prev.filter((expense) => expense.value !== value)
    );

    // Remove the value from formData.machineryUsed (ensuring uniqueness after deletion)
    setFormData((prevFormData) => ({
      ...prevFormData,
      todaysWork: prevFormData.todaysWork.filter((item) => item !== value),
    }));
  };

  if (!user) {
    navigation("/authentication/officials/officials-login");
  }

  //----------------------handle todays work---------------

  useEffect(() => {
    function find() {
      if (formData?.workType.toLowerCase() !== "civil") {
        return [
          "Excuvation",
          "Laying Pipe",
          "Jointing",
          "Back Filling",
          "Dismentaling",
          "Restoration",
          "Connection",
          "Cmmissioning",
          "wall sluice",
          "Air Valve",
          "Fire Hydrant",
          "Others",
        ];
      } else {
        return [
          "Column Casting",
          "OHT raft steel bending",
          "GL beam reinforcement",
          "OHT centering work",
          "OHT de-centering work",
          "OHT raft casting",
          "GL beam casting work",
          "1st beam casting work",
          "2nd beam casting work",
          "3rd beam casting work",
          "OHT dome reinforcasting work",
          "OHT dome casting work",
          "OHT slab casting work",
          "OHT slab reinforcement work",
          "1st lift column casting work",
          "2nd lift column casting work",
          "3rd lift column casting work",
          "1st lift column steel work",
          "2nd lift column steel work",
          "3rd lift column steel work",
          "OHT staircase steel work",
          "OHT staircase casting work",
          "Column centering work",
          "PCC",
          "Others",
        ];
      }
    }

    setTodaysWork(find());
  }, [formData?.workType]);


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-full w-full mt-20  mx-auto p-4 border rounded shadow-md "
    >
      <h2 className="text-2xl font-bold flex  justify-center  mb-10">
        Daily Progress Report
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Employee ID */}
        <div className="mb-4">
          <label htmlFor="empId" className="block text-sm font-medium mb-1">
            ID*
          </label>
          <input
            type="text"
            id="empId"
            name="empId"
            disabled
            value={formData?.id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 cursor-not-allowed"
          />
        </div>

        {/* Employee Name */}
        <div className="mb-4">
          <label htmlFor="empName" className="block text-sm font-medium mb-1">
            Name*
          </label>
          <input
            type="text"
            id="empName"
            name="empName"
            disabled
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 cursor-not-allowed"
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
            disabled
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 cursor-not-allowed"
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
            Gram Panchayat (GP)*
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

        {/* Work Category */}
        <div className="mb-4">
          <label htmlFor="workType" className="block text-sm font-medium mb-1">
            Work Category*
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

        {/* today-s work */}
        <div className="relative">
          <label className="w-full m-2" htmlFor="todaysWork">
            Today's Work*
          </label>
          <select
            name="todaysWork"
            id="todaysWork"
            value={selectdTodaysWork.todaysWork}
            onChange={handleChange}
            className="w-full m-2 py-2"
          >
            <option value="">select</option>

            {todaysWork &&
              todaysWork.map((tw) => {
                return (
                  <>
                    <option value={tw}>{tw}</option>
                  </>
                );
              })}
            {/* <option value="Excuvation">Excuvation</option>
            <option value="Laying pipe">Laying pipe</option>
            <option value="Jointing">Jointing</option>
            <option value="Back filling">Back filling</option>
            <option value="Dismentaling">Dismentaling</option>
            <option value="Restoration">Restoration</option>
            <option value="Connection">Connection</option>
            <option value="Commissioning">Commissioning</option>
            <option value="Wall sluice">Wall sluice</option>
            <option value="Air valve">Air valve</option>
            <option value="Fire hydrant">Fire hydrant</option>
            <option value="others">Others</option> */}
          </select>
          {isTodaysWorkOpen && (
            <div className=" w-full mt-2 pt-2 bg-white absolute z-10 border-2 border-slate-300">
              {formData?.todaysWork?.map((todaysWork) => {
                return (
                  <>
                    <div className=" w-full flex flex-row justify-between pr-2">
                      <h1 className=" text-lg bg-white w-full px-2">
                        {todaysWork}
                      </h1>
                      <button
                        onClick={() => {
                          handleTodaysWorkDelete(todaysWork);
                        }}
                        className="w-16 bg-red-600  mb-1 p-1 pl-2 lr-2 rounded-lg text-white"
                      >
                        delete
                      </button>
                    </div>
                  </>
                );
              })}
              <div className="w-full">
                <button
                  onClick={() => {
                    setIsTodaysWorkOpen(false);
                  }}
                  className="flex justify-center bg-blue-500 m-2 mx-auto p-2 w-28 rounded-lg text-white"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* macinearyUsed Type */}
        <div className="mb-4 relative">
          <label
            htmlFor="machinaryUsed"
            className="block text-sm font-medium mb-1"
          >
            Machinary Used*
          </label>
          <select
            id="machinaryUsed"
            name="machinaryUsed"
            value={selectedMachinaryUsed}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="material">HDD</option>
            <option value="JCB">JCB</option>
            <option value="tractor">Tractor</option>
            <option value="tractorTrolley">Tractor Trolley</option>
            <option value="generator">Generator</option>
            <option value="mixtureMachine">Mixture Machine</option>
            <option value="vibrator">Vibrator</option>
            <option value="others">Others</option>
          </select>

          {isMachinaryOpen && (
            <div className=" w-full mt-2 pt-2 bg-white absolute z-10 border-2 border-slate-300">
              {formData?.machinaryUsed?.map((machinaryUsed) => {
                return (
                  <>
                    <div className=" w-full flex flex-row justify-between pr-2">
                      <h1 className=" text-lg bg-white w-full px-2">
                        {machinaryUsed}
                      </h1>
                      <button
                        onClick={() => {
                          handleMachinaryUsedDelete(machinaryUsed);
                        }}
                        className="w-16 bg-red-600  mb-1 p-1 pl-2 lr-2 rounded-lg text-white"
                      >
                        delete
                      </button>
                    </div>
                  </>
                );
              })}
              <div className="w-full">
                <button
                  onClick={() => {
                    setIsMachinaryOpen(false);
                  }}
                  className="flex justify-center bg-blue-500 m-2 mx-auto p-2 w-28 rounded-lg text-white"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Expenses Type */}
        <div className="mb-4 relative">
          <label htmlFor="type" className="block text-sm font-medium mb-1">
            Expenses Type*
          </label>
          <select
            id="type"
            name="type"
            value={selectedExpenses[selectedExpenses?.length - 1]?.value}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select</option>
            <option value="self">Self</option>
            <option value="worker">Worker</option>
            <option value="selfAndWorker">Both (Self & Worker)</option>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="diseal">Diseal</option>
            <option value="others">Others</option>
          </select>

          {isExpensesTypeOpen && (
            <div className=" w-full mt-2 pt-2 bg-white absolute z-10 border-2 border-slate-300">
              {isExpensesTypeOpen &&
                formData?.expenses?.type?.map((expenses) => {
                  return (
                    <>
                      <div className="flex flex-row justify-between pr-2">
                        <h1 className=" text-lg bg-white w-full px-2">
                          {expenses}
                        </h1>
                        <button
                          onClick={() => {
                            handleExpenseDelete(expenses);
                          }}
                          className="w-24 pr-2 bg-red-600  mb-1 p-1  rounded-lg text-white"
                        >
                          delete
                        </button>
                      </div>
                    </>
                  );
                })}
              {isExpensesTypeOpen && (
                <div className="w-full">
                  <button
                    onClick={() => {
                      setIsExpenseTypeOpen(false);
                    }}
                    className="flex justify-center bg-blue-500 m-2 mx-auto p-2 w-28 rounded-lg text-white"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/*  Expenses Amount*/}
        <div>
          <label
            htmlFor="required"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Expenses Amount*
          </label>
          <input
            type="number"
            id="required"
            name="required"
            value={formData.expenses.required}
            onChange={handleChange}
            placeholder="Enter Expenses"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="qr"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload QR Code/Passbook/UPI-Id picture
          </label>
          <input
            type="file"
            id="qr"
            name="qr"
            onChange={(e) => {
              // setAccountDetails(e.target.files[0]);
              setPaymentMethods(e.target.files[0]);
              handleChange(e);
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

{/* payment status */}
        {/* <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Payment Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.expenses.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Select</option>
            <option value="Paid">Paid</option>
            <option value="PartialPaid">PartialPaid</option>
            <option value="Unpaid">Unpaid</option>
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

export default DailyProgress;
