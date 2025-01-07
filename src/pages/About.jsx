import React from 'react';

function About() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-6">About Us</h2>
        <p className="text-lg text-gray-700">
          We are a company committed to providing excellent services to our clients. Our team works with dedication and passion to bring the best solutions. 
          We specialize in various fields, including web development, design, and consulting. Our mission is to create value and make a difference for businesses across the globe.
        </p>
      </div>
    </div>
  );
}

export default About;
