import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import Indoor Services Images
import imagery from "../../assets/services/IndoorServices/ImageryServices.jpg";
import digitization from "../../assets/services/IndoorServices/Digitization.jpg";
import geoRef from "../../assets/services/IndoorServices/Geo-Ref.jpg";
import cadastral from "../../assets/services/IndoorServices/CadastralMapping.jpg";
import baseMap from "../../assets/services/IndoorServices/Base-Map-Creation.jpg";
import land from "../../assets/services/IndoorServices/Land.jpg";
import landBase from "../../assets/services/IndoorServices/LandBase.jpg";
import landBaseCreation from "../../assets/services/IndoorServices/LandBaseCreation.jpg";
import data from "../../assets/services/IndoorServices/Data.jpg";
import dataAnalysis from "../../assets/services/IndoorServices/DataAnalysis.jpg";

const indoorServices = [
  {
    title: "Imagery Services",
    img: imagery,
    description: "High-quality satellite and aerial imagery processing for accurate mapping solutions.",
  },
  {
    title: "Digitization & Feature Extraction",
    img: digitization,
    description: "Transform paper maps into digital format with precise feature extraction techniques.",
  },
  {
    title: "Geo Referencing",
    img: geoRef,
    description: "Align spatial data to real-world coordinates for accurate geographic analysis.",
  },
  {
    title: "Cadastral Mapping",
    img: cadastral,
    description: "Create detailed land ownership maps with legal boundary precision.",
  },
  {
    title: "Base Map Creation",
    img: baseMap,
    description: "Develop foundational base maps to support spatial analysis and planning.",
  },
  {
    title: "Land Information Systems",
    img: land,
    description: "Comprehensive solutions for land records management and property mapping.",
  },
  {
    title: "Land Base Mapping",
    img: landBase,
    description: "Accurate topographic base maps to support urban planning and infrastructure projects.",
  },
  {
    title: "Land Base Creation",
    img: landBaseCreation,
    description: "Generate high-resolution land base layers for GIS applications.",
  },
  {
    title: "Data Management",
    img: data,
    description: "Organize, process, and manage spatial datasets efficiently for analysis.",
  },
  {
    title: "Data Analysis & Visualization",
    img: dataAnalysis,
    description: "Transform raw spatial data into meaningful insights using advanced analytics.",
  },
];

const IndoorServices = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto py-16 px-6 sm:px-10 lg:px-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center sm:text-left">
          Our Indoor Services
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/pages/services/development")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            Development Services
          </button>
          <button
            onClick={() => navigate("/pages/services/outdoor")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            Outdoor Services
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {indoorServices.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
              
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IndoorServices;
