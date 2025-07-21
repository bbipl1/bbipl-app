import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import "font-awesome/css/font-awesome.min.css";

const serverURL = process.env.REACT_APP_SERVER_URL;
const socket = io(serverURL, { transports: ["websocket"] });

const Footer = () => {
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };

        function getCookie(name) {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
        }

        const userName = getCookie("userName");
        socket.emit("updateLocation", {
          userId: "id",
          name: userName,
          location,
        });
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      socket.disconnect();
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Business Basket Infratech Pvt. Ltd.
          </h2>
          <p className="mt-2 text-sm text-gray-200">
            Empowering businesses with reliable solutions and dedicated service.
          </p>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                {/* <li>
                  <a
                    href="https://universalmapsolutions.com/"
                    className="hover:text-blue-400 transition"
                  >
                    universalmapsolutions
                  </a>
                </li> */}

                {/* <li>
                  <a
                    href="https://gramin360.businessbasket.in/"
                    className="hover:text-blue-400 transition"
                  >
                    gramin360
                  </a>
                </li> */}
                {/* <li>
                  <a
                    href="https://pdfworks.businessbasket.in/"
                    className="hover:text-blue-400 transition"
                  >
                    pdfworks
                  </a>
                </li> */}
                <li>
                  <Link to="/pages/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link to="/pages/about">About Us</Link>
                </li>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="text-sm space-y-2">
              <p className="text-white">
                Email:{" "}
                <a
                  href="mailto:support@businessbasket.in"
                  className="text-white hover:text-blue-400 whitespace-nowrap"
                >
                  support@businessbasket.in
                </a>
              </p>
              <p className="text-white">
                Phone:{" "}
                <a
                  href="tel:+917080206885"
                  className="text-white hover:text-blue-400 whitespace-nowrap"
                >
                  +91 7080 206 885
                </a>
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect with Us</h3>
            <div className="space-y-2">
              <a
                href="https://www.facebook.com/share/184ZL2vA4E/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <i className="fa fa-facebook"></i> Facebook
              </a>
              <a
                href="https://www.linkedin.com/company/business-basket-infratech-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <i className="fa fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>

          {/* Legal & Policies */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/pages/privacy-policy"
                  className="hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/pages/terms-and-conditions"
                  className="hover:text-blue-400"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/pages/cookies-policy"
                  className="hover:text-blue-400"
                >
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link to="/pages/disclaimers" className="hover:text-blue-400">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700" />

        {/* Bottom Footer */}
        <div className="text-center text-xs text-white">
          &copy; {new Date().getFullYear()} Business Basket Infratech Pvt. Ltd.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
