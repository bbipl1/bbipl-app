import React from "react";
import {
  Globe,
  MonitorSmartphone,
  Smartphone,
  Code2
} from "lucide-react";

const services = [
  {
    title: "WebGIS - Land Management",
    description: "Advanced land management using GIS technology.",
    icon: Globe,
  },
  {
    title: "Website Creation",
    description: "Custom website design and development services.",
    icon: Code2,
  },
  {
    title: "Web Application",
    description: "Scalable and robust web application solutions.",
    icon: MonitorSmartphone,
  },
  {
    title: "Mobile Application",
    description: "Feature-rich mobile applications for various platforms.",
    icon: Smartphone,
  },
];

const DevelopmentServicesDetails = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-16">
      <div className="w-full mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Our Development Services
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Building modern, scalable solutions for the web, mobile, and GIS platforms.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-2xl shadow-sm border hover:shadow-lg transition"
            >
              <service.icon className="w-10 h-10 text-indigo-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentServicesDetails;
