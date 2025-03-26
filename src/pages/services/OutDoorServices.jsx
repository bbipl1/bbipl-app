import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import landSurvey from "../../assets/services/outDoorServices/LandSurvey.jpg";
import cadastralSurvey from "../../assets/services/outDoorServices/Cadastral survey.jpg";
import doorSurvey from "../../assets/services/outDoorServices/Door.jpg";
import dataCollection from "../../assets/services/outDoorServices/Census Survey.jpg";
import utilitySurvey from "../../assets/services/outDoorServices/Utility.jpg";
import droneSurvey from "../../assets/services/outDoorServices/Drone surveys.jpg";
import roadSurvey from "../../assets/services/outDoorServices/Road&Highwaysurvey.jpg";
import gasPipeline from "../../assets/services/outDoorServices/Gas Pipeline Survey.jpg";
import waterPipeline from "../../assets/services/outDoorServices/WaterPipelineSurvey.jpg";
import topoSurvey from "../../assets/services/outDoorServices/TopographicSurvey.jpg";
import consumerIndexing from "../../assets/services/outDoorServices/Consumer Indexing Survey.jpg";
import propertyTax from "../../assets/services/outDoorServices/Property Tax Survey.jpg";
import censusSurvey from "../../assets/services/outDoorServices/Census Survey.jpg";
import groundTrothing from "../../assets/services/outDoorServices/Ground trothing.jpg";
import poiAddress from "../../assets/services/outDoorServices/POI & Address.jpg";
import networkSurvey from "../../assets/services/outDoorServices/Assets survey and mapping.jpg";

const outdoorServices = [
  {
    title: "Land Survey",
    img: landSurvey,
    description: "Accurate land measurements and boundary assessments for property evaluation and development.",
  },
  {
    title: "Cadastral Survey",
    img: cadastralSurvey,
    description: "Mapping of property boundaries to ensure legal ownership and land parcel accuracy.",
  },
  {
    title: "Door To Door Survey",
    img: doorSurvey,
    description: "Collecting vital information directly from households for research and planning.",
  },
  {
    title: "Data Collection & Verification",
    img: dataCollection,
    description: "Gathering and verifying essential geographical and demographic data for analytics.",
  },
  {
    title: "Utility Survey",
    img: utilitySurvey,
    description: "Mapping underground utilities like water, gas, and electrical lines for urban planning.",
  },
  {
    title: "Drone Surveys",
    img: droneSurvey,
    description: "Aerial imaging and topographic analysis using drones for precise land assessment.",
  },
  {
    title: "Road & Highway Survey",
    img: roadSurvey,
    description: "Geospatial data collection for road construction, maintenance, and infrastructure planning.",
  },
  {
    title: "Gas Pipeline Survey",
    img: gasPipeline,
    description: "Surveying and mapping gas pipeline routes for safe and efficient network expansion.",
  },
  {
    title: "Water Pipeline Survey",
    img: waterPipeline,
    description: "Assessment and mapping of water pipeline networks for efficient distribution.",
  },
  {
    title: "Topographic Survey",
    img: topoSurvey,
    description: "Detailed terrain mapping to aid in construction, engineering, and land-use planning.",
  },
  {
    title: "Consumer Indexing",
    img: consumerIndexing,
    description: "Identifying and mapping consumer data for utility services and urban development.",
  },
  {
    title: "Property Tax Survey",
    img: propertyTax,
    description: "Evaluating property values and taxation based on land and building assessments.",
  },
  {
    title: "Census Survey",
    img: censusSurvey,
    description: "Comprehensive population data collection for government and policy-making purposes.",
  },
  {
    title: "Ground Trothing",
    img: groundTrothing,
    description: "Validating remote sensing data by physically inspecting survey locations.",
  },
  {
    title: "POI & Address Point Verification",
    img: poiAddress,
    description: "Confirming location-based data accuracy for GIS and mapping applications.",
  },
  {
    title: "Network Survey & Assets Mapping",
    img: networkSurvey,
    description: "Mapping physical infrastructure such as telecom, power, and transportation assets.",
  },
];

const OutdoorServices = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto py-16 px-6 sm:px-10 lg:px-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center sm:text-left">
          Our Outdoor Services
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/pages/services/development")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            Development Services
          </button>
          <button
            onClick={() => navigate("/pages/services/indoor")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            Indoor Services
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {outdoorServices.map((service, index) => (
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
                loading="lazy"
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

export default OutdoorServices;
