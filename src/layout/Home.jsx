import React from "react";
import Banner from "../pages/services/Banner";
// import About from "../components/About";
import Section from "../pages/services/Sections";
// import Team from "../components/Teams";
import FloatingSocialBar from "../pages/services/FloatingSocialBar";
import ScrollToTopButton from "../pages/services/ScrollToTopButton";

export default function Home() {
  return (
    <div className="relative">
      <div className="h-full w-full">
        <Banner />
        {/* <About /> */}
        <Section />
        {/* <Team /> */}
        
      </div>
      <FloatingSocialBar />
      <ScrollToTopButton />
    </div>
  );
}
