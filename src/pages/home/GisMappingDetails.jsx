import React from "react";
import { Map, Compass, Goal, Info } from "lucide-react";

const SectionCard = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 transition hover:shadow-lg">
    <div className="flex items-center mb-4">
      <div className="bg-blue-100 p-2 rounded-full">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800 ml-3">{title}</h2>
    </div>
    <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
  </div>
);

const GisMappingDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-10 lg:px-16">
      <div className="w-full  mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-blue-700">
          GIS Mapping Workflow Overview
        </h1>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <SectionCard title="What is GIS Mapping?" icon={Map}>
            Geographic Information System (GIS) mapping involves capturing,
            storing, analyzing, and visualizing spatial or geographic data. It
            enables digital representation of real-world features like roads,
            buildings, rivers, and land use.
          </SectionCard>

          <SectionCard title="How We Are Doing It" icon={Compass}>
            We collect spatial and geographic data through on-ground surveys.
            The gathered data—coordinates, infrastructure, environment—is
            digitized and layered onto maps using tools like Leaflet and QGIS
            to ensure accuracy and local relevance.
          </SectionCard>

          <SectionCard title="What We Are Doing" icon={Info}>
            We're building a scalable web-based GIS platform where organizations
            like municipalities or telecoms can access real-time map overlays
            for infrastructure, demographics, and logistics—complete with
            filtering, zoom, export, and interaction features.
          </SectionCard>

          <SectionCard title="Why We Are Doing This" icon={Map}>
            There's a gap in localized, real-time GIS access for rural and urban
            areas. By simplifying spatial data visualization, we empower
            decision-makers in planning, emergency response, and infrastructure.
          </SectionCard>

          <SectionCard title="Our Goals" icon={Goal}>
            <ul className="list-disc list-inside space-y-2">
              <li>Intuitive GIS UI for non-technical users</li>
              <li>Secure and private GIS hosting/sharing</li>
              <li>Modular API for real-time GIS integration</li>
              <li>Offline access and edge computing support</li>
              <li>Support for open mapping standards</li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default GisMappingDetails;
