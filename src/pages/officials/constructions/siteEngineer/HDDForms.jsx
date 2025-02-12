import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [fuel, setFuel] = useState([]);
  const [meter, setMeter] = useState();
  const [rate, setRate] = useState();
  const [amount, setAmount] = useState();
  const [expenses, setExpenses] = useState([]);
  const [remarks, setRemarks] = useState();

  const handleSubmit = () => {
    const url = ``;
    const header = {
      header: "application/json",
    };
    const payload = {
      paymentRec,
      paymentRecAmount,
      UserId,
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

    if (!UserId) {
      alert("Id is required.");
    }
    if (!userName) {
      alert("userName is required.");
    }
    if (!mobileNo) {
      alert("mobile No is required.");
    }
    if (!dateOfRequirements) {
      alert("dateOfRequirements is required.");
    }
    if (!dia) {
      alert("dia is required.");
    }
    if (!NoOfJobs) {
      alert("No Of Jobs are required.");
    }
    if (!meter) {
      alert("meter is required.");
    }
    if (!rate) {
      alert("rate is required.");
    }
    if (!paymentRec) {
      alert("payment status is required.");
    }

    setIsLoading(true);

    axios
      .post(url, payload, header)
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(siteEngineerId);
    setUserId(siteEngineerId?.id);
    setUserName(siteEngineerId?.name);
    setMobileNo(siteEngineerId?.mobile);
  }, [siteEngineerId]);

  useEffect(() => {
    console.log(expenses);
    // const set=new Set(expenses);
    // setExpenses(new Array(set))
  }, [expenses]);

  const handleRemove = (exp) => {
    setExpenses(expenses.filter((ex) => ex.expenses !== exp));
  };
  const handleAddExpenses = (e) => {
    setExpenses((ex) => {
      // Check if the value already exists in the array
      const isDuplicate = ex.some(
        (item) => item[e.target.name] === e.target.value
      );
      if (isDuplicate) return ex; // Return the current state if it's a duplicate

      // Add the new item if it's not a duplicate
      return [...ex, { [e.target.name]: e.target.value }];
    });
  };

  const handleRemoveFuel = (fl) => {
    setFuel(fuel.filter((f) => f.fuel !== fl));
  };

  const handleFuel = (e) => {
    // const [name,value]=e.target;
    if (!e.target.value) {
      return;
    }
    setFuel((f) => {
      // Check if the value already exists in the array
      const isDuplicate = f.some(
        (item) => item[e.target.name] === e.target.value
      );
      if (isDuplicate) return f; // Return the current state if it's a duplicate

      // Add the new item if it's not a duplicate
      return [...f, { [e.target.name]: e.target.value }];
    });
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
        <div>
          <label htmlFor="dia">DIA*</label>
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
          <label htmlFor="">No. of jobs*</label>
          <input
            onChange={(e) => {
              setNoOfJobs(e.target.value);
            }}
            value={NoOfJobs}
            type="number"
            className="w-full border-2  p-2"
          />
        </div>
       

          <div>
            <label className="pl-2" htmlFor="">
              Meter
            </label>
            <input
              className="w-full p-1"
              value={meter}
              placeholder="Meter"
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
              Rate/meter (INR)
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
          <div>
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
          
        </div>
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
        <div className="w-full">
          <label className="w-full " htmlFor="All days expenses">
            All days expenses*
          </label>
          <select
            onChange={(e) => {
              handleAddExpenses(e);
              // setExpenses((ex) => [...ex, { [e.target.name]: e.target.value }]);
            }}
            value={expenses[expenses.length - 1]?.value}
            name="expenses"
            id="expenses"
            className="w-full p-2"
          >
            <option name="select" value="">
              Select
            </option>
            <option name="deisel" value="deisel">
              Deisel
            </option>
            <option name="petrol" value="petrol">
              Petrol
            </option>
            <option name="fooding" value="fooding">
              Fooding
            </option>
            <option name="advance" value="advance">
              Advance
            </option>
            <option name="labourExpenses" value="labourExpenses">
              Labour expenses
            </option>
            <option name="others" value="others">
              Others
            </option>
          </select>

          {expenses &&
            expenses.map((expense) => {
              return (
                <>
                  <div className="w-full flex justify-between">
                    <h1>
                      {expense.expenses}{" "}
                      <input
                        type="number"
                        className="border-2 border-blue-50 p-1"
                      />
                    </h1>
                    <button
                      onClick={() => {
                        handleRemove(expense.expenses);
                      }}
                      className="bg-red-500 hover:bg-red-600 m-1 p-1 px-2 rounded-lg text-white"
                    >
                      Delete
                    </button>
                  </div>
                </>
              );
            })}
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
