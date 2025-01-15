import { BucketAccelerateStatus } from "@aws-sdk/client-s3";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  // State to toggle mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormsDropdownOpen, setIsFormsDropdownOpen] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleFormsDropdown = () => {
    setIsFormsDropdownOpen(!isFormsDropdownOpen);
  };

  const handleMenuItemClick=()=>{
    setIsFormsDropdownOpen(false);
  }

  const handledivClick=(e)=>{
      if(e.target.name!=="forms"){
        setIsFormsDropdownOpen(false);
      }
      // alert(e.target.value)
  }

  return (
    <nav onClick={handledivClick} className="bg-cyan-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <img
              src="/assets/logo/logo-png.png"
              alt="Logo"
              className="h-16 w-auto rounded-md"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul
          className={`pl-4 md:flex space-x-6 font-medium ${
            isMenuOpen ? "flex" : "hidden"
          } absolute md:static top-full left-0 w-full md:w-auto bg-cyan-600 md:bg-transparent py-4 md:py-0`}
        >
          <li>
            <Link onClick={handleMenuItemClick} to="/" className="hover:text-yellow-300 transition">
              Home
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={toggleFormsDropdown}
              name="forms"
              value={"forms"}
              className="hover:text-yellow-300 transition"
            >
              Forms
            </button>
            {isFormsDropdownOpen && (
              <ul className="absolute left-0 mt-2 bg-cyan-600  shadow-lg">
                <li className="px-4 py-2 hover:bg-cyan-700">
                  <Link className="text-nowrap" to="/pages/forms/requirements">Requirements</Link>
                </li>
                <li className="px-4 py-2 hover:bg-cyan-700">
                  <Link  className="text-nowrap" to="/pages/forms/requirements">Form 2</Link>
                </li>
                <li className="px-4 py-2 hover:bg-cyan-700">
                  <Link  className="text-nowrap" to="/pages/forms/requirements">Form 3</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
            onClick={handleMenuItemClick}
              to="/pages/services"
              className="hover:text-yellow-300 transition"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/pages/contact-us"
              className="hover:text-yellow-300 transition"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
            onClick={handleMenuItemClick}
              to="authentication/login"
              className="hover:text-yellow-300 transition"
            >
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
