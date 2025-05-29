import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const phoneNumber = process.env.REACT_APP_PHONE_NUMBER;
const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
const email = process.env.REACT_APP_EMAIL;

const FloatingSocialBar = () => {
  return (
    <>
      {/* Floating Social Buttons */}
      <div className="fixed top-1/3 right-2 md:right-4 flex flex-col space-y-3 z-50">
        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/+917080206885`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-green-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 p-2"
          aria-label="WhatsApp"
          whileTap={{ scale: 0.85 }}
        >
          <FaWhatsapp size={20} />
        </motion.a>

        {/* Phone */}
        <motion.a
          href={`tel:+917080206885`}
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-blue-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 p-2"
          aria-label="Phone"
          whileTap={{ scale: 0.85 }}
        >
          <FaPhoneAlt size={18} />
        </motion.a>

        {/* Email */}
        <motion.a
          href={`mailto:rakesh@businessbasket.in`}
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-red-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 p-2"
          aria-label="Email"
          whileTap={{ scale: 0.85 }}
        >
          <FaEnvelope size={18} />
        </motion.a>
      </div>

    </>
  );
};

export default FloatingSocialBar;