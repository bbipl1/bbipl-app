import axios from "axios";
import React, { useEffect, useState } from "react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const HDDForms = ({ siteEngineerId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentRec, setPaymentRec] = useState("No");
  const [paymentRecAmount, setPaymentRecAmount] = useState("No");
  const [UserId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [dateOfRequirements, setDateOfRequirements] = useState();
  const [dia, setDia] = useState();
  const [NoOfJobs, setNoOfJobs] = useState();
  const [siteEngObjId, setSiteEngObjId] = useState([]);
  const [meter, setMeter] = useState();
  const [rate, setRate] = useState();
  const [amount, setAmount] = useState();
  const [expenses, setExpenses] = useState([]);
  const [remarks, setRemarks] = useState();
  const [HDDDetails, setHDDDetails] = useState([]);

  const handleSubmit = () => {
    const url = `${serverUrl}/api/constructions/site-engineers/submit-hdd-form`;
    const header = {
      header: "application/json",
    };
    const payload = {
      paymentRec,
      paymentRecAmount,
      siteEngId: UserId,
      siteEngObjId,
      userName,
      mobileNo,
      dateOfRequirements,
      dia,
      NoOfJobs,
      meter,
      rate,
      amount,
      expenses,
      remarks,
    };

    console.log(payload);

    if (!UserId) {
      return alert("Id is required.");
    }
    if (!userName) {
      return alert("userName is required.");
    }
    if (!mobileNo) {
      return alert("mobile No is required.");
    }
    if (!dateOfRequirements) {
      return alert("dateOfRequirements is required.");
    }
    if (!dia) {
      return alert("dia is required.");
    }
    if (!NoOfJobs) {
      return alert("No Of Jobs are required.");
    }
    if (!meter) {
      return alert("meter is required.");
    }
    if (!rate) {
      return alert("rate is required.");
    }
    if (!paymentRec) {
      return alert("payment status is required.");
    }

    setIsLoading(true);

    axios
      .post(url, payload, header)
      .then((res) => {
        alert(res?.data?.message);
      })
      .catch((err) => {
        alert(err?.reponse?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(siteEngineerId);
    setUserId(siteEngineerId?.id);
    setUserName(siteEngineerId?.name);
    setMobileNo(siteEngineerId?.mobile);
    setSiteEngObjId(siteEngineerId.siteEngObjId);
  }, [siteEngineerId]);

  useEffect(() => {
    console.log(expenses);
    // const set=new Set(expenses);
    // setExpenses(new Array(set))
  }, [expenses]);

  const handleRemoveExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };
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

  const handleAddHDD = () => {
    setHDDDetails((hdd) => [...hdd, newHddDetails(HDDDetails.length+1)]);
  };

  const newHddDetails = (len) => {
    return (
      <>
        <div className="m-4">
          <div>
            <label htmlFor="dia"><span className="font-bold">{len}</span>. Diameter*</label>
            <select
              onChange={(e) => {
                setDia(e.target.value);
              }}
              value={dia}
              name="dia"
              id="dia"
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
            <label className="pl-2" htmlFor="">
              Length* (meter)
            </label>
            <input
              className="w-full p-1"
              value={meter}
              placeholder="Length in meter"
              name="km"
              id="km"
              type="number"
              onChange={(e) => {
                setMeter(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="pl-2" htmlFor="Rate">
              Rate/meter* (INR)
            </label>
            <input
              placeholder="Rate/meter"
              type="number"
              className="w-full p-1"
              value={rate}
              name="rate"
              id="rate"
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        <div className="">
          <label htmlFor="">Id*</label>
          <input
            disabled
            value={UserId}
            type="text"
            className="w-full cursor-not-allowed border-2  p-2"
          />
        </div>
        <div>
          <label htmlFor="">Client Name*</label>
          <input
            value={userName}
            type="text"
            disabled
            className="w-full border-2  p-2 cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="">Mobile No*</label>
          <input
            disabled
            value={mobileNo}
            type="number"
            className="w-full border-2  p-2 cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="">Date of requirements*</label>
          <input
            onChange={(e) => {
              setDateOfRequirements(e.target.value);
            }}
            value={dateOfRequirements}
            type="Date"
            className="w-full border-2  p-2"
          />
        </div>

        {/* <div>
          <label className="pl-2" htmlFor="">
            Amount (INR)
          </label>
          <input
            placeholder="Amount"
            className="w-full p-1"
            type="number"
            value={amount}
            name="amount"
            id="amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div> */}
        <div className="">
          <label htmlFor="">Payment received from client*</label>
          <div className="grid grid-cols-5 gap-4 relative">
            <div>
              <input
                type="radio"
                name="paymentReceived"
                id="paymentReceivedAsNo"
                value={paymentRec}
                checked={paymentRec === "No"}
                onClick={(e) => {
                  setPaymentRec("No");
                }}
              />
              <label id="paymentReceivedAsNo" className="pl-2" htmlFor="">
                No
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="paymentReceived"
                id="paymentReceivedAsYes"
                value={paymentRec}
                checked={paymentRec === "Yes"}
                onClick={(e) => {
                  setPaymentRec("Yes");
                }}
              />
              <label className="pl-2" id="paymentReceivedAsYes" htmlFor="">
                Yes
              </label>
            </div>
          </div>
          {paymentRec === "Yes" && (
            <>
              <div className="border-2 border-neutral-100 w-full p-2">
                <label htmlFor="">Amount*</label>
                <input
                  onChange={(e) => {
                    setPaymentRecAmount(e.target.value);
                  }}
                  value={paymentRecAmount}
                  type="number"
                  className="w-full border-2 p-2"
                />
              </div>
            </>
          )}
        </div>
        <div>
          <label>All days expenses*</label>
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

      <div className="w-full">
        <div>
          {HDDDetails?.map((hdd, index) => {
            return (
              <>
                <div>
                  {/* <h1 className="m-4 font-bold">{++index}</h1> */}
                  {hdd}
                </div>
              </>
            );
          })}
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => handleAddHDD()}
            className="bg-blue-500 hover:bg-blue-600 m-1 p-1 px-2 rounded-lg text-white w-32"
          >
            Add new job
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="remarks"></label>
        <textarea
          className="w-full p-1"
          placeholder="Write remarks here"
          id="remarks"
          name="remarks"
          rows={2}
          value={remarks}
          onChange={(e) => {
            setRemarks(e.target.value);
          }}
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
