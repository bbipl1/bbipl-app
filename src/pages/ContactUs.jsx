import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";
import 'font-awesome/css/font-awesome.min.css';


const initialState = {
  name: "",
  email: "",
  message: "",
};

const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
    
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_PUBLIC_KEY")
      .then(
        (result) => {
          console.log(result.text);
          clearState();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <div id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="lg:flex lg:space-x-8">
            {/* Form Section */}
            <div className="lg:w-2/3">
              <div className="section-title mb-8">
                <h2 className="text-3xl font-extrabold text-gray-800">Get In Touch</h2>
                <p className="text-gray-600 mt-4">
                  Please fill out the form below to send us an email, and we will get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group mt-6">
                  <textarea
                    name="message"
                    id="message"
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info Section */}
            <div className="lg:w-1/3 space-y-6">
              <div className="contact-item">
                <h3 className="text-2xl font-semibold text-gray-800">Contact Info</h3>
                <p className="text-gray-600">
                  <span className="font-semibold">Address:</span>
                  {props.data ? props.data.address : " vibhutikhand, gomti nagar lucknow"}
                </p>
              </div>
              <div className="contact-item">
                <p className="text-gray-600">
                  <span className="font-semibold">Phone:</span>
                  {props.data ? props.data.phone : " +91 75036 77953"}
                </p>
              </div>
              <div className="contact-item">
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span>
                  {props.data ? props.data.email : " Rakesh@businessbasket.in"}
                </p>
              </div>
              {/* Social Links */}
              <div className="social flex space-x-6">
                <a
                  href={props.data ? props.data.facebook : "/"}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a
                  href={props.data ? props.data.twitter : "/"}
                  className="text-blue-400 hover:text-blue-500"
                >
                  <i className="fa fa-twitter"></i>
                </a>
                <a
                  href={props.data ? props.data.youtube : "/"}
                  className="text-red-600 hover:text-red-700"
                >
                  <i className="fa fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Contact;
