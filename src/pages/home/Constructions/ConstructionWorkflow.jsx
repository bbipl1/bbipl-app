import React from "react";
import {
  MapPinned,
  Ruler,
  Wrench,
  Building2,
  HardHat,
  ClipboardCheck,
} from "lucide-react";

export default function ConstructionWorkflow() {
  const steps = [
    {
      title: "1. Site Inspection & Geo-Mapping",
      icon: <MapPinned className="h-8 w-8 text-blue-600" />,
      description:
        "We inspect the location, collect coordinates, and prepare a geo-mapping report using GPS tools.",
    },
    {
      title: "2. Layout & Planning",
      icon: <Ruler className="h-8 w-8 text-blue-600" />,
      description:
        "Based on survey data, we design the layout for pipelines, tanks, or foundations including depth and alignment.",
    },
    {
      title: "3. Pipeline Construction",
      icon: <Wrench className="h-8 w-8 text-blue-600" />,
      description:
        "Trenching is done, pipes are laid and jointed (HDPE/PVC), followed by leak testing and coverage.",
    },
    {
      title: "4. Pani Tanki Setup",
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
      description:
        "We build rooftop or underground water tanks using reinforced concrete and waterproofing methods.",
    },
    {
      title: "5. Civil Work Execution",
      icon: <HardHat className="h-8 w-8 text-blue-600" />,
      description:
        "We perform foundational excavation, base concreting, chamber making, and final finishing.",
    },
    {
      title: "6. Final Inspection & Handover",
      icon: <ClipboardCheck className="h-8 w-8 text-blue-600" />,
      description:
        "Every site undergoes a final inspection, documentation, and is handed over with quality assurance.",
    },
  ];

  return (
    <div className="w-full bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          Construction Workflow
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow p-6 hover:shadow-md transition"
            >
              <div className="flex items-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
