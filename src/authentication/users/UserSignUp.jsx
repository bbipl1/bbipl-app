import { useState } from "react";
import axios from "axios";
import apiService from "../../api/services/apiServices";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    countryCode: "+91",
    gender: "",
    dob: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [Loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      fullname:
        formData.firstName +
        " " +
        formData.middleName +
        " " +
        formData.lastName,
      isEmailVerified: false,
      isMobileVerified: false,
    };

    try {
      setLoading(true);
      const suburl = `/api/end-users/create-new-end-user`;
      apiService
        .post(suburl, payload)
        .then((res) => {
          console.log("Success:", res.data.msg);
          alert("Sign Up Successful!");
        })
        .catch((err) => {
          console.log("Success:", err.response.data.err);
        })
        .finally((final) => {
          setLoading(false);
        });
    } catch (err) {
      console.error("Error:", err);
      alert("Sign Up Failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Middle Name</label>
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name (optional)"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/3">
              <label className="block mb-1 font-medium">
                Country Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="countryCode"
                placeholder="+91"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                required
              />
            </div>
            <div className="w-2/3">
              <label className="block mb-1 font-medium">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
