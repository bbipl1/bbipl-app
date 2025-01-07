import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  // State to toggle mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <img
              src="/path-to-your-logo.png"
              alt="Logo"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex space-x-6 font-medium ${
            isMenuOpen ? "flex" : "hidden"
          } absolute md:static top-full left-0 w-full md:w-auto bg-blue-600 md:bg-transparent py-4 md:py-0`}
        >
          <li>
            <Link to="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/pages/about" className="hover:text-yellow-300 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/pages/services" className="hover:text-yellow-300 transition">
              Services
            </Link>
          </li>
          <li>
            <Link to="/pages/contact-us" className="hover:text-yellow-300 transition">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="authentication/login" className="hover:text-yellow-300 transition">
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu (Hamburger Icon) */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
