import React from "react";
import { motion } from "framer-motion";
import bannerImage from "../../assets/home/Banner.jpg";

export default function Banner() {
  return (
    <div className="bg-white text-gray-900  font-sans overflow-hidden">
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full h-[500px] md:h-[700px] flex items-center justify-center"
      >
        <motion.img
          src={bannerImage}
          alt="Global Network"
          className="w-full h-full object-cover brightness-50"
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
        />
        <div className="absolute text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold drop-shadow-lg"
          >
            Connecting the World
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-2xl mt-4 drop-shadow-md"
          >
            Innovating Global Networks with Cutting-Edge Solutions
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
