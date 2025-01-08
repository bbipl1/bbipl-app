import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';


function Login() {

  const [Role,setRole]=useState('admin');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRole=(e)=>{
    setFormData((prevData) => ({ ...prevData, 'role': e.target.value }));
    setRole(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if(Role==="admin"){
      navigate('/pages/admin');
    }else if(Role==="developer"){
      navigate('/pages/developer-attendance-form');
    }else if(Role==="finance"){
      navigate('/pages/finance-attendance-form');
    }else if(Role==="worker"){
      navigate('/pages/worker-attendance-form');
    }

    return 
    

    try {
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      setSuccess('Login successful!');
      // You can store the token or user data here if required
      console.log(data);
      // Redirect or perform additional actions upon successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            //   required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            //   required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={Role}
              onChange={handleRole}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            //   required
            >
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              <option value="finance">Finance</option>
              <option value="worker">Worker</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600 text-center">
          Don’t have an account?{' '}
          <Link to="/authentication/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
