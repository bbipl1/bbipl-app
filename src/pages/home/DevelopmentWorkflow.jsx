import React from "react";
import {
  ClipboardList,
  FileCode2,
  Layers3,
  Wrench,
  TestTube,
  Rocket,
  Users,
} from "lucide-react";

const devSteps = [
  {
    title: "1. Requirement Analysis",
    description: "Understand client needs, define project scope, and plan features.",
    icon: ClipboardList,
  },
  {
    title: "2. UI/UX Design",
    description: "Design user-friendly interfaces and intuitive experiences.",
    icon: Layers3,
  },
  {
    title: "3. Development",
    description: "Develop scalable websites, web apps, mobile apps, or WebGIS portals.",
    icon: FileCode2,
  },
  {
    title: "4. Integration",
    description: "Integrate APIs, GIS services, and third-party tools.",
    icon: Wrench,
  },
  {
    title: "5. Testing & QA",
    description: "Perform rigorous testing for functionality, usability, and performance.",
    icon: TestTube,
  },
  {
    title: "6. Deployment",
    description: "Launch to production servers or app stores securely and efficiently.",
    icon: Rocket,
  },
  {
    title: "7. Support & Maintenance",
    description: "Provide post-launch updates, monitoring, and client support.",
    icon: Users,
  },
];

const DevelopmentWorkflow = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-16">
      <div className="w-full mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Development Workflow</h2>
        <p className="text-lg text-gray-600 mb-10">
          We follow a modern, agile process to deliver efficient digital solutions.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {devSteps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-sm p-6 border hover:shadow-lg transition"
            >
              <step.icon className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentWorkflow;
