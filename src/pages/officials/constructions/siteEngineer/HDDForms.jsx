import React, { useState } from "react";

const HDDForms = () => {
  const [paymentRec, setPaymentRec] = useState("No");
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        <div className="">
          <label htmlFor="">Id*</label>
          <input type="text" className="w-full border-2  p-2" />
        </div>
        <div>
          <label htmlFor="">Client Name*</label>
          <input type="text" className="w-full border-2  p-2" />
        </div>
        <div>
          <label htmlFor="">Mobile No*</label>
          <input type="text" className="w-full border-2  p-2" />
        </div>
        <div>
          <label htmlFor="">Date of requirements*</label>
          <input type="text" className="w-full border-2  p-2" />
        </div>
        <div>
          <label htmlFor="">DIA*</label>
          <select name="" id="" className="w-full border-2 p-2">
            <option value="">Select</option>
            <option value="">63</option>
            <option value="">75</option>
            <option value="">90</option>
            <option value="">110</option>
            <option value="">125</option>
            <option value="">140</option>
            <option value="">160</option>
            <option value="">180</option>
            <option value="">200</option>
            <option value="">220</option>
          </select>
        </div>
        <div>
          <label htmlFor="">No. of jobs*</label>
          <input type="text" className="w-full border-2  p-2" />
        </div>
        <div>
          <label className="" htmlFor="">Select one*</label>
          <div className="grid grid-cols-3 gap-4 ">
            <div>
              <input 
              type="radio" 
              value="Mtrs" 
              name="selectOne" />
              <label className="pl-2" htmlFor="">
                Mtrs
              </label>
            </div>
            <div>
              <input type="radio" value="Mtrs" name="selectOne" />
              <label className="pl-2" htmlFor="Rate">
                Rate
              </label>
            </div>
            <div>
              <input type="radio" value="Mtrs" name="selectOne" />
              <label className="pl-2" htmlFor="">
                Amount
              </label>
            </div>
          </div>
        </div>
        <div>
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
              <div className="absolute z-20 bg-neutral-200 w-full p-2">
                <label htmlFor="">Amount*</label>
                <input type="number" className="w-full border-2 p-2" />
              </div>
            </>
          )}
        </div>
        <div className="w-full">
          <label className="w-full " htmlFor="All days expenses">
            All days expenses*
          </label>
          <select 
          name=""
           id=""
           className="w-full p-2"
          >
            <option value="Deisel">Select</option>
            <option value="Deisel">Deisel</option>
            <option value="Deisel">Petrol</option>
            <option value="Deisel">Fooding</option>
            <option value="Deisel">Advance</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center m-4">
      <button className="p-2 bg-blue-600 w-48 text-white rounded-lg">Submit</button>

      </div>
    </div>
  );
};

export default HDDForms;
