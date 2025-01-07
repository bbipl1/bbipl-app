import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6">
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
              <a href="/about" className="hover:text-yellow-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-yellow-300">
                Services
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-yellow-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact and Social Media */}
        <div>
          <h2 className="text-lg font-bold">Contact Us</h2>
          <p className="mt-2">
            Email: <a href="mailto:info@company.com" className="hover:text-yellow-300">info@company.com</a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890" className="hover:text-yellow-300">+1 234 567 890</a>
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              <i className="fab fa-linkedin-in"></i> LinkedIn
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
