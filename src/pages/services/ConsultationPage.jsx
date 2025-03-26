import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const ConsultationSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://development-services-backend.onrender.com/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      alert(data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit consultation request");
    }
  };
  

  return (
    <section className="max-w-6xl mx-auto py-20 px-6 md:px-16" id="consultation-section">
      {/* CTA Section */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-gray-900">Get a Free Consultation</h2>
        <p className="text-lg text-gray-600 mt-3">Book an appointment or request a demo to explore our services.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          <button 
            className="px-6 py-3 bg-gradient-to-br from-purple-900 to-pink-700 text-white rounded-full shadow-lg hover:opacity-90 transition-all"
            onClick={() => navigate("/book-appointment")}
          >
            Book an Appointment
          </button>
          <button 
            className="px-6 py-3 bg-gradient-to-br from-blue-900 to-indigo-700 text-white rounded-full shadow-lg hover:opacity-90 transition-all"
            onClick={() => navigate("/request-demo")}
          >
            Request a Demo
          </button>
        </div>
      </div>

      {/* Inquiry Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl p-10 rounded-xl border border-gray-200"
      >
        <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Send Us a Message</h3>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <input type="text" name="name" placeholder="Your Name" className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Your Phone" className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          <select name="service" className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} required>
            <option value="">Select Service</option>
            
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Website ceation">Website Creation</option>
            <option value="WebGIS - Land Management">WebGIS - Land Management</option>
          </select>
          <textarea name="message" placeholder="Your Message" className="p-4 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500" onChange={handleChange} required></textarea>
          <button type="submit" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:opacity-90 transition-all text-lg font-semibold">Submit</button>
        </form>
      </motion.div>

      {/* Live Chat Support */}
      <div className="text-center mt-12">
        <p className="text-lg">Need instant help? Chat with us on:</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="https://wa.me/+917503677953" className="text-green-600 text-xl font-bold flex items-center gap-2 hover:text-green-700 transition">
            <FaWhatsapp size={24} /> WhatsApp
          </a>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-20">
        <h3 className="text-4xl font-extrabold text-gray-900 text-center">What Our Clients Say</h3>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <p className="italic text-gray-700">"Fantastic service! The team exceeded our expectations."</p>
            {/* <p className="mt-4 font-semibold text-blue-600">- John Doe</p> */}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <p className="italic text-gray-700">"Highly professional and great communication throughout."</p>
            {/* <p className="mt-4 font-semibold text-blue-600">- Jane Smith</p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;