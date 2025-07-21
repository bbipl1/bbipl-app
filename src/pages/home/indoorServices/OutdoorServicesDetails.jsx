import React from 'react';
import {
  Ruler,
  Landmark,
  Home,
  CheckCircle,
  Cable,
  Camera,
  Route,
  Flame,
  Droplets,
  Globe,
  UserCheck,
  FileText,
  Users,
  LocateFixed,
  MapPin,
} from 'lucide-react'; // Tailor icons based on what's available

const outdoorServices = [
  {
    title: 'Land Survey',
    description: 'Accurate land measurements and boundary assessments for property evaluation and development.',
    icon: Ruler,
  },
  {
    title: 'Cadastral Survey',
    description: 'Mapping of property boundaries to ensure legal ownership and land parcel accuracy.',
    icon: Landmark,
  },
  {
    title: 'Door To Door Survey',
    description: 'Collecting vital information directly from households for research and planning.',
    icon: Home,
  },
  {
    title: 'Data Collection & Verification',
    description: 'Gathering and verifying essential geographical and demographic data for analytics.',
    icon: CheckCircle,
  },
  {
    title: 'Utility Survey',
    description: 'Mapping underground utilities like water, gas, and electrical lines for urban planning.',
    icon: Cable,
  },
  {
    title: 'Drone Surveys',
    description: 'Aerial imaging and topographic analysis using drones for precise land assessment.',
    icon: Camera,
  },
  {
    title: 'Road & Highway Survey',
    description: 'Geospatial data collection for road construction, maintenance, and infrastructure planning.',
    icon: Route,
  },
  {
    title: 'Gas Pipeline Survey',
    description: 'Surveying and mapping gas pipeline routes for safe and efficient network expansion.',
    icon: Flame,
  },
  {
    title: 'Water Pipeline Survey',
    description: 'Assessment and mapping of water pipeline networks for efficient distribution.',
    icon: Droplets,
  },
  {
    title: 'Topographic Survey',
    description: 'Detailed terrain mapping to aid in construction, engineering, and land-use planning.',
    icon:   Globe,
  },
  {
    title: 'Consumer Indexing',
    description: 'Identifying and mapping consumer data for utility services and urban development.',
    icon: UserCheck,
  },
  {
    title: 'Property Tax Survey',
    description: 'Evaluating property values and taxation based on land and building assessments.',
    icon: FileText,
  },
  {
    title: 'Census Survey',
    description: 'Comprehensive population data collection for government and policy-making purposes.',
    icon: Users,
  },
  {
    title: 'Ground Truthing',
    description: 'Validating remote sensing data by physically inspecting survey locations.',
    icon: LocateFixed,
  },
  {
    title: 'POI & Address Point Verification',
    description: 'Confirming location-based data accuracy for GIS and mapping applications.',
    icon: MapPin,
  },
  {
    title: 'Network Survey & Assets Mapping',
    description: 'Mapping physical infrastructure such as telecom, power, and transportation assets.',
    icon: Cable,
  },
];

const OutdoorServicesDetails = () => {
  return (
    <section className="py-12 px-16 bg-gray-50 text-gray-800">
      <div className="w-full mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">GIS Mapping - Outdoor Services</h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Explore our range of advanced outdoor geospatial services tailored for infrastructure, utilities, and planning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outdoorServices.map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all border">
              <service.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutdoorServicesDetails;
