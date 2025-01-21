import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConstructionsProfile = (profile) => {
  // State to hold fetched data
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the profile details from the API when the component mounts
  useEffect(() => {
    // Example API URL (replace with your actual API endpoint)
    const mobile=profile._id
    const apiUrl = 'https://api.example.com/profile'; // Replace with your actual API URL

    // Fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        // Set the fetched data to state
        setProfileData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle error
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Show loading indicator or error message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Check if profileData exists before rendering
  if (profileData) {
    const { empType, empName, empId, empMobile } = profileData;

    return (
      <div>
        <h2>Employee Profile</h2>
        <p><strong>Employee Type:</strong> {empType}</p>
        <p><strong>Employee Name:</strong> {empName}</p>
        <p><strong>Employee ID:</strong> {empId}</p>
        <p><strong>Employee Mobile:</strong> {empMobile}</p>
      </div>
    );
  }

  return null;
};

export default ConstructionsProfile;
