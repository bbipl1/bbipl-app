import React from "react";
// import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-6 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo and About */}
        <div>
          <h2 className="text-lg font-bold">Our Company</h2>
          <p className="mt-2">
            Dedicated to providing the best services and solutions to our clients. 
            Your satisfaction is our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/" className="hover:text-yellow-300">
                Home
              </a>
            </li>
            <li>
              <a href="/pages/about" className="hover:text-yellow-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/pages/services" className="hover:text-yellow-300">
                Services
              </a>
            </li>
            <li>
              <a href="/pages/contact-us" className="hover:text-yellow-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact and Social Media */}
        <div>
          <h2 className="text-lg font-bold">Contact Us</h2>
          <p className="mt-2">
            Email: <a href="mailto:rakesh@businessbasket.in" className="hover:text-yellow-300">rakesh@businessbasket.in</a>
          </p>
          <p>
            Phone: <a href="+91 75036 77953" className="hover:text-yellow-300">+91 75036 77953</a>
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              <i className="fa fa-facebook"></i> Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              <i className="fa fa-twitter"></i> Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              <i className="fa fa-linkedin text-blue-600 text-xl"></i> LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-6 text-sm">
        &copy; {new Date().getFullYear()} Our Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
