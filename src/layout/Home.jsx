import React from "react";
import Banner from "../pages/services/Banner";
// import About from "../components/About";
import Section from "../pages/services/Sections";
// import Team from "../components/Teams";
import FloatingSocialBar from "../pages/services/FloatingSocialBar";
import ScrollToTopButton from "../pages/services/ScrollToTopButton";
import GisMappingDetails from "../pages/home/GisMappingDetails";
import IndoorServicesDetails from "../pages/home/indoorServices/IndoorServicesDetails";
import OutdoorServicesDetails from "../pages/home/indoorServices/OutdoorServicesDetails";
import DevelopmentServicesDetails from "../pages/home/development/DevelopmentServicesDetails";
import CompanyWorkflow from "../pages/home/CompanyWorkflow";
import DevelopmentWorkflow from "../pages/home/DevelopmentWorkflow";
import SuccessStory from "../pages/home/SuccessStory";
import WhyBusinessBasket from "../pages/home/WhyBusinessBasket";
import OurVision from "../pages/home/OurVision";
import Contact from "../pages/ContactUs";
import ConstructionServices from "../pages/home/Constructions/ConstructionServices";
import ConstructionWorkflow from "../pages/home/Constructions/ConstructionWorkflow";

export default function Home() {
  return (
    <div className="relative">
      <div className="h-full w-full">
        <Banner />
        {/* <About /> */}
        <Section />
        {/* <Team /> */}
        <IndoorServicesDetails/>
        <OutdoorServicesDetails/>
        <DevelopmentServicesDetails/>
        <GisMappingDetails/>
        <CompanyWorkflow/>
        <DevelopmentWorkflow/>
        <ConstructionServices/>
        <ConstructionWorkflow/>
        <SuccessStory/>
        <WhyBusinessBasket/>
        <OurVision/>
        <Contact/>
      </div>
      <FloatingSocialBar />
      <ScrollToTopButton />
    </div>
  );
}
