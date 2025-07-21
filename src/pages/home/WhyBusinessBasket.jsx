import React from "react";
import { ShieldCheck, Layers3, Globe, Code, Clock, Star } from "lucide-react";

const WhyBusinessBasket = () => {
  return (
    <section className="bg-white py-16 px-6 lg:px-16">
      <div className="w-full mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Why Choose <span className="text-blue-600">BusinessBasket?</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Reliability */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <ShieldCheck className="text-blue-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Trusted & Reliable</h3>
            <p className="text-gray-600">
              Proven track record in delivering government, commercial, and public sector projects with trust and transparency.
            </p>
          </div>

          {/* GIS Expertise */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <Globe className="text-green-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">GIS & Mapping Excellence</h3>
            <p className="text-gray-600">
              Specialized in satellite imagery, cadastral mapping, and land-based solutions using high-precision tools.
            </p>
          </div>

          {/* Full-Stack Dev */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <Code className="text-purple-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Full-Stack Development</h3>
            <p className="text-gray-600">
              From websites to mobile apps to custom software, we build robust, scalable, and secure digital platforms.
            </p>
          </div>

          {/* End-to-End Solutions */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <Layers3 className="text-yellow-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">End-to-End Services</h3>
            <p className="text-gray-600">
              From data collection to deployment and maintenance, we handle every stage of your project lifecycle.
            </p>
          </div>

          {/* Timely Delivery */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <Clock className="text-red-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">On-Time Delivery</h3>
            <p className="text-gray-600">
              Strong project management and agile methodology ensure timely milestones without compromising on quality.
            </p>
          </div>

          {/* Quality & Support */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <Star className="text-indigo-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality Support</h3>
            <p className="text-gray-600">
              Continuous support and client-first approach help us build long-term relationships and successful partnerships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBusinessBasket;
