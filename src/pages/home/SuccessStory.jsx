import React from "react";
import { CheckCircle2, Map, Laptop2 } from "lucide-react";

const SuccessStory = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-16">
      <div className="w-full mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Our Success Story
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          BusinessBasket has transformed how governments, organizations, and enterprises manage land, data, and digital presence through innovative GIS Mapping and Development solutions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          {/* GIS Mapping Success */}
          <div className="bg-white shadow-sm rounded-2xl p-6 hover:shadow-md transition">
            <Map className="text-green-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              GIS Mapping Revolution
            </h3>
            <p className="text-gray-600 mb-4">
              Our field teams conducted extensive door-to-door surveys, cadastral mapping, and drone-based assessments across multiple Indian districts. This helped local governments in digitizing land records, planning utilities, and improving property tax collections.
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="text-green-500 w-4 h-4 mr-2" />
                Mapped over 1 lakh properties with 98% accuracy
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="text-green-500 w-4 h-4 mr-2" />
                Supported smart city and AMRUT initiatives
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="text-green-500 w-4 h-4 mr-2" />
                Built interactive GIS dashboards for officials
              </li>
            </ul>
          </div>

          {/* Development Success */}
          <div className="bg-white shadow-sm rounded-2xl p-6 hover:shadow-md transition">
            <Laptop2 className="text-blue-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Digital Transformation with Development
            </h3>
            <p className="text-gray-600 mb-4">
              We delivered scalable web and mobile apps to government departments, NGOs, and businesses—enabling real-time field data reporting, citizen services, and asset management.
            </p>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center">
                <CheckCircle2 className="text-blue-500 w-4 h-4 mr-2" />
                Developed 5+ portals and mobile apps
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="text-blue-500 w-4 h-4 mr-2" />
                Integrated GIS maps with dynamic data layers
              </li>
              <li className="flex items-center">
                <CheckCircle2 className="text-blue-500 w-4 h-4 mr-2" />
                Enabled e-governance with digital form systems
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16">
          <p className="text-gray-700 text-lg">
            At BusinessBasket, our mission is to empower communities and systems with data-driven, tech-powered solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;
