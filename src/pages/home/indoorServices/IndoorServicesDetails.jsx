import React from 'react';
import {
  Image,
  FileDigit,
  MapPin,
  Landmark,
  Layers3,
  ScrollText,
  Map,
  Globe ,
  Database,
  BarChart3
} from 'lucide-react';

const services = [
  {
    title: 'Imagery Services',
    description: 'High-quality satellite and aerial imagery processing for accurate mapping solutions.',
    icon: Image
  },
  {
    title: 'Digitization & Feature Extraction',
    description: 'Transform paper maps into digital format with precise feature extraction techniques.',
    icon: FileDigit
  },
  {
    title: 'Geo Referencing',
    description: 'Align spatial data to real-world coordinates for accurate geographic analysis.',
    icon: MapPin
  },
  {
    title: 'Cadastral Mapping',
    description: 'Create detailed land ownership maps with legal boundary precision.',
    icon: Landmark
  },
  {
    title: 'Base Map Creation',
    description: 'Develop foundational base maps to support spatial analysis and planning.',
    icon: Layers3
  },
  {
    title: 'Land Information Systems',
    description: 'Comprehensive solutions for land records management and property mapping.',
    icon: ScrollText
  },
  {
    title: 'Land Base Mapping',
    description: 'Accurate topographic base maps to support urban planning and infrastructure projects.',
    icon: Map
  },
  {
    title: 'Land Base Creation',
    description: 'Generate high-resolution land base layers for GIS applications.',
    icon: Globe 
  },
  {
    title: 'Data Management',
    description: 'Organize, process, and manage spatial datasets efficiently for analysis.',
    icon: Database
  },
  {
    title: 'Data Analysis & Visualization',
    description: 'Transform raw spatial data into meaningful insights using advanced analytics.',
    icon: BarChart3
  }
];

export default function IndoorServicesDetails() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12 lg-px-16">
      <div className="w-full mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          GIS Mapping - Indoor Services
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
