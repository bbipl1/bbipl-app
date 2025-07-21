import React from "react";
import {
  SearchCheck,
  FileSpreadsheet,
  Map,
  Settings,
  UploadCloud,
  ShieldCheck,
  Globe,
} from "lucide-react";

const workflowSteps = [
  {
    title: "1. Data Collection",
    description: "Gather spatial and field data through surveys, sensors, and drones.",
    icon: SearchCheck,
  },
  {
    title: "2. Data Processing",
    description: "Clean, normalize, and process raw data into usable formats.",
    icon: FileSpreadsheet,
  },
  {
    title: "3. Geo-referencing",
    description: "Align data with real-world coordinates using GIS tools.",
    icon: Map,
  },
  {
    title: "4. Analysis & Mapping",
    description: "Perform spatial analysis and create detailed GIS maps.",
    icon: Settings,
  },
  {
    title: "5. Data Upload",
    description: "Publish maps and datasets to cloud platforms or WebGIS apps.",
    icon: UploadCloud,
  },
  {
    title: "6. Quality Assurance",
    description: "Ensure accuracy, legal compliance, and quality of deliverables.",
    icon: ShieldCheck,
  },
  {
    title: "7. Delivery",
    description: "Deliver final outputs via websites, mobile apps, and reports.",
    icon: Globe,
  },
];

const CompanyWorkflow = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-16">
      <div className="w-full mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">GIS Mapping - Our Workflow</h2>
        <p className="text-lg text-gray-600 mb-10">
          From field to cloud, here's how we transform raw spatial data into meaningful GIS solutions.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-lg transition"
            >
              <step.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyWorkflow;
