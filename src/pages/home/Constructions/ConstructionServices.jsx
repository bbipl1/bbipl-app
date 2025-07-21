import React from "react";
import { Wrench, Building2, MapPinned, HardHat, Ruler } from "lucide-react";

export default function ConstructionServices() {
  return (
    <div className="w-full bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center ">
          Our Construction Services
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {/* Pipeline Construction */}
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <Wrench className="h-10 w-10 mx-auto text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Pipeline Construction</h3>
            <p className="text-sm text-gray-600">
              We lay durable water pipelines for municipal and private projects with precision trenching and safety.
            </p>
          </div>

          {/* Pani Tanki Installation */}
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <Building2 className="h-10 w-10 mx-auto text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Pani Tanki Setup</h3>
            <p className="text-sm text-gray-600">
              From rooftop tanks to underground reservoirs, we handle end-to-end water tank construction.
            </p>
          </div>

          {/* Site Survey */}
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <MapPinned className="h-10 w-10 mx-auto text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Site Inspection & Survey</h3>
            <p className="text-sm text-gray-600">
              Accurate measurement and GPS-based geo-mapping to plan infrastructure efficiently.
            </p>
          </div>

          {/* Civil Work */}
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <HardHat className="h-10 w-10 mx-auto text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Full Civil Work</h3>
            <p className="text-sm text-gray-600">
              Includes foundation digging, base concreting, chamber making, and finishing tasks.
            </p>
          </div>

          {/* Leveling and Marking */}
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <Ruler className="h-10 w-10 mx-auto text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Leveling & Alignment</h3>
            <p className="text-sm text-gray-600">
              Surface leveling and layout marking for proper structure placement before construction begins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
