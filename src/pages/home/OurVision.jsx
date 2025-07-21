import React from "react";
import { Eye, Map, Laptop, Rocket } from "lucide-react";

const OurVision = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 lg:px-16">
      <div className="w-full  mx-auto text-center">
        <Eye className="text-blue-600 w-12 h-12 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Our Vision
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          At <strong>BusinessBasket</strong>, we envision a future where technology and spatial intelligence converge to empower industries, governments, and communities. We aim to be a global leader in GIS-driven land management and transformative digital solutions.
        </p>
        <div className="grid md:grid-cols-2 gap-10 text-left">
          {/* GIS Vision */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <Map className="text-green-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Revolutionizing GIS Mapping</h3>
            <p className="text-gray-600">
              We strive to digitize and modernize land records, spatial assets, and geographic data to enable accurate, transparent, and efficient decision-making for both public and private sectors.
            </p>
          </div>

          {/* Software Vision */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <Laptop className="text-purple-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Empowering Digital Transformation</h3>
            <p className="text-gray-600">
              Our mission is to build secure, scalable, and intuitive digital platforms—from mobile apps to enterprise software—that solve real-world challenges and drive sustainable innovation.
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-12">
          <Rocket className="text-red-600 w-10 h-10 mb-4 mx-auto" />
          <p className="text-gray-700 text-md max-w-xl mx-auto">
            Together, we’re on a mission to shape a smarter, more connected world—one map, one line of code, one client at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
