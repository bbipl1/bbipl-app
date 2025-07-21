import React from "react";
import {
  HardHat,
  Globe,
  MonitorSmartphone,
  Smartphone,
} from "lucide-react";

export default function AboutUs() {
  const services = [
    {
      title: "Construction Services",
      icon: <HardHat className="h-8 w-8 text-blue-600" />,
      description: `
        BusinessBasket excels in civil and structural construction projects.
        We undertake pipeline installations, water storage tanks (pani tanki),
        trenching, concrete chamber works, and foundational civil development.
        With a strong presence in rural and government projects, our team
        ensures durable, on-time, and compliant infrastructure delivery.
      `,
    },
    {
      title: "GIS & Geo-Mapping Solutions",
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      description: `
        We provide Geographic Information System (GIS) based services like
        land surveying, asset mapping, utility planning, and geo-tagging. Our
        team collects accurate location data, processes satellite imagery, and
        creates interactive spatial maps essential for rural planning,
        infrastructure design, and smart governance.
      `,
    },
    {
      title: "Web Application Development",
      icon: <MonitorSmartphone className="h-8 w-8 text-blue-600" />,
      description: `
        BusinessBasket builds robust, scalable web platforms tailored for
        construction management, data visualization, user dashboards, and
        enterprise portals. Our web solutions use modern technologies such as
        React, Node.js, and cloud integration to deliver secure and
        performance-optimized tools for both government and business clients.
      `,
    },
    {
      title: "Android App Development",
      icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      description: `
        We create Android applications for on-field data capture, progress
        tracking, geo-coordinated reporting, and offline-first user experiences.
        Our apps are optimized for low-bandwidth rural environments and
        integrated directly with our web platforms for end-to-end ecosystem support.
      `,
    },
  ];

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-gray-600 text-base mb-10">
          <strong>BusinessBasket</strong> is a dynamic and growing company focused on
          empowering infrastructure through technology. We combine traditional
          construction expertise with modern software solutions to enable better
          planning, execution, and management across India. From laying pipelines
          in villages to building custom web portals for data analysis, we do it all.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
