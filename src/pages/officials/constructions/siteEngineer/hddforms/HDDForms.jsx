import axios from "axios";
import React, { useEffect, useState } from "react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const HDDForms = ({ siteEngineerId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentRec, setPaymentRec] = useState("No");
  const [paymentRecAmount, setPaymentRecAmount] = useState("");
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [dateOfRequirements, setDateOfRequirements] = useState("");
  const [dia, setDia] = useState("");
  const [noOfJobs, setNoOfJobs] = useState("");
  const [siteEngObjId, setSiteEngObjId] = useState([]);
  const [meter, setMeter] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [hddDetails, setHddDetails] = useState([]);

  // Handle form submission
  const handleSubmit = () => {
    const url = `${serverUrl}/api/constructions/site-engineers/submit-hdd-form`;
    const header = {
      header: "application/json",
    };
    const payload = {
      paymentRec,
      paymentRecAmount,
      siteEngId: userId,
      siteEngObjId,
      userName,
      mobileNo,
      dateOfRequirements,
      hddDetails,
      expenses,
      remarks,
    };

    // Validation
    if (!userId) return alert("Id is required.");
    if (!userName) return alert("userName is required.");
    if (!mobileNo) return alert("mobile No is required.");
    if (!dateOfRequirements) return alert("Date of requirements is required.");
    // if (!dia) return alert("Diameter is required.");
    // if (!noOfJobs) return alert("No of Jobs is required.");
    // if (!meter) return alert("Length is required.");
    // if (!rate) return alert("Rate per meter is required.");
    if (!paymentRec) return alert("Payment status is required.");

    setIsLoading(true);

    console.log(payload)

    axios
      .post(url, payload, header)
      .then((res) => {
        alert(res?.data?.message);
      })
      .catch((err) => {
        alert(err?.response?.data?.message || "An error occurred");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handle dynamic job details
  const handleAddHDD = () => {
    setHddDetails((prevHdd) => [
      ...prevHdd,
      { dia: "", meter: "", rate: "" },
    ]);
  };

  // Handle changes for each HDD job entry
  const handleHddDetailChange = (index, field, value) => {
    const updatedHdd = [...hddDetails];
    updatedHdd[index][field] = value;
    setHddDetails(updatedHdd);
  };

  // Handle expense changes
  const handleAddExpense = (e) => {
    const expenseName = e.target.value;
    if (!expenseName || expenses.some((exp) => exp.name === expenseName))
      return;
    setExpenses([...expenses, { name: expenseName, value: "" }]);
  };

  const handleExpenseValueChange = (index, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].value = value;
    setExpenses(updatedExpenses);
  };

  const handleRemoveExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (siteEngineerId) {
      setUserId(siteEngineerId.id);
      setUserName(siteEngineerId.name);
      setMobileNo(siteEngineerId.mobile);
      setSiteEngObjId(siteEngineerId.siteEngObjId);
    }
  }, [siteEngineerId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        <div>
          <label htmlFor="">Id*</label>
          <input
            disabled
            value={userId}
            type="text"
            className="w-full cursor-not-allowed border-2 p-2"
          />
        </div>
        <div>
          <label htmlFor="">Client Name*</label>
          <input
            value={userName}
            type="text"
            disabled
            className="w-full cursor-not-allowed border-2 p-2"
          />
        </div>
        <div>
          <label htmlFor="">Mobile No*</label>
          <input
            disabled
            value={mobileNo}
            type="text"
            className="w-full cursor-not-allowed border-2 p-2"
          />
        </div>
        <div>
          <label htmlFor="">Date of Requirements*</label>
          <input
            onChange={(e) => setDateOfRequirements(e.target.value)}
            value={dateOfRequirements}
            type="date"
            className="w-full border-2 p-2"
          />
        </div>

        <div>
          <label>Payment Received*</label>
          <div className="grid grid-cols-5 gap-4">
            <div>
              <input
                type="radio"
                name="paymentReceived"
                value="No"
                checked={paymentRec === "No"}
                onChange={() => setPaymentRec("No")}
              />
              <label>No</label>
            </div>
            <div>
              <input
                type="radio"
                name="paymentReceived"
                value="Yes"
                checked={paymentRec === "Yes"}
                onChange={() => setPaymentRec("Yes")}
              />
              <label>Yes</label>
            </div>
          </div>
          {paymentRec === "Yes" && (
            <div>
              <label>Amount Received*</label>
              <input
                onChange={(e) => setPaymentRecAmount(e.target.value)}
                value={paymentRecAmount}
                type="number"
                className="w-full border-2 p-2"
              />
            </div>
          )}
        </div>

        <div>
          <label>Expenses*</label>
          <select onChange={handleAddExpense} className="w-full p-2">
            <option value="">Select</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
            <option value="Fooding">Fooding</option>
            <option value="Advance">Advance</option>
            <option value="Labour Expenses">Labour Expenses</option>
            <option value="Others">Others</option>
          </select>
          {expenses.map((expense, index) => (
            <div key={index} className="w-full flex justify-between mt-2">
              <span>{expense.name}</span>
              <input
                type="number"
                className="border-2 p-1"
                value={expense.value}
                onChange={(e) =>
                  handleExpenseValueChange(index, e.target.value)
                }
              />
              <button
                onClick={() => handleRemoveExpense(index)}
                className="bg-red-500 hover:bg-red-600 m-1 p-1 px-2 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        {hddDetails.map((hdd, index) => (
          <div key={index} className="m-4">
            <div>
              <label htmlFor={`dia-${index}`}>Diameter*</label>
              <select
                id={`dia-${index}`}
                value={hdd.dia}
                onChange={(e) => handleHddDetailChange(index, "dia", e.target.value)}
                className="w-full border-2 p-2"
              >
                <option value="">Select</option>
                <option value="63">63</option>
                <option value="75">75</option>
                <option value="90">90</option>
                <option value="110">110</option>
                <option value="125">125</option>
                <option value="140">140</option>
                <option value="160">160</option>
                <option value="180">180</option>
                <option value="200">200</option>
                <option value="220">220</option>
              </select>
            </div>
            <div>
              <label htmlFor={`meter-${index}`}>Length (meter)*</label>
              <input
                id={`meter-${index}`}
                type="number"
                value={hdd.meter}
                onChange={(e) => handleHddDetailChange(index, "meter", e.target.value)}
                className="w-full border-2 p-2"
              />
            </div>
            <div>
              <label htmlFor={`rate-${index}`}>Rate (INR)*</label>
              <input
                id={`rate-${index}`}
                type="number"
                value={hdd.rate}
                onChange={(e) => handleHddDetailChange(index, "rate", e.target.value)}
                className="w-full border-2 p-2"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={handleAddHDD}
          className="bg-blue-500 hover:bg-blue-600 m-1 p-1 px-2 rounded-lg text-white w-32"
        >
          Add new job
        </button>
      </div>

      <div>
        <label htmlFor="remarks">Remarks</label>
        <textarea
          id="remarks"
          name="remarks"
          rows={2}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full p-1"
          placeholder="Write remarks here"
        />
      </div>

      <div className="flex justify-center m-4">
        <button
          onClick={handleSubmit}
          className="p-2 mb-4 bg-blue-600 w-48 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default HDDForms;
