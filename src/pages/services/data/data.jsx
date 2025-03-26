// Indoor Services
import baseMap from "../../../assets/services/IndoorServices/Base-Map-Creation.jpg";
import dataAnalysis from "../../../assets/services/IndoorServices/DataAnalysis.jpg";
import digitization from "../../../assets/services/IndoorServices/Digitization.jpg";
import geoRef from "../../../assets/services/IndoorServices/Geo-Ref.jpg";
import imagery from "../../../assets/services/IndoorServices/ImageryServices.jpg";

// Outdoor Services
import landSurvey from "../../../assets/services/outDoorServices/LandSurvey.jpg";
import roadSurvey from "../../../assets/services/outDoorServices/Road&Highwaysurvey.jpg";
import topoSurvey from "../../../assets/services/outDoorServices/TopographicSurvey.jpg";
import utilitySurvey from "../../../assets/services/outDoorServices/Utility.jpg";
import waterSurvey from "../../../assets/services/outDoorServices/WaterPipelineSurvey.jpg";

// Development Services
import gisDev from "../../../assets/services/DevelopmentServices/Gis.jpg";
import mobileAppDev from "../../../assets/services/DevelopmentServices/Mobileapplication.jpg";
import webAppDev from "../../../assets/services/DevelopmentServices/WebApplication.jpg";
import websiteDev from "../../../assets/services/DevelopmentServices/Website.jpg";

const servicesData = {
    indoor: [
        {
            id: "imagery",
            title: "Imagery Services",
            img: imagery,
            description: "Processing and enhancement of satellite and aerial imagery.",
        },
        {
            id: "digitization",
            title: "Digitization & Feature Extraction",
            img: digitization,
            description: "Digitization and feature extraction from scanned maps and CAD drawings.",
        },
        {
            id: "geo-referencing",
            title: "Geo Referencing",
            img: geoRef,
            description: "Geo-referencing spatial data for accurate alignment with real-world coordinates.",
        },
        {
            id: "cadastral-mapping",
            title: "Cadastral Mapping",
            img: baseMap,
            description: "Mapping land ownership and boundary identification.",
        },
        {
            id: "data-analysis",
            title: "Data Analysis",
            img: dataAnalysis,
            description: "Advanced GIS data analysis and visualization.",
        },
    ],
    outdoor: [
        {
            id: "land-survey",
            title: "Land Survey",
            img: landSurvey,
            description: "Accurate Land & Cadastral Surveys for property mapping.",
        },
        {
            id: "road-highway-survey",
            title: "Road & Highway Survey",
            img: roadSurvey,
            description: "Supporting smart city planning and transportation projects.",
        },
        {
            id: "topographic-survey",
            title: "Topographic Survey",
            img: topoSurvey,
            description: "Mapping terrain and elevation data for planning.",
        },
        {
            id: "utility-survey",
            title: "Utility Survey",
            img: utilitySurvey,
            description: "Utility, Gas, and Water Pipeline Surveys ensuring efficient infrastructure development.",
        },
        {
            id: "water-pipeline-survey",
            title: "Water Pipeline Survey",
            img: waterSurvey,
            description: "Ensuring safe and efficient water distribution planning.",
        },
    ],
    development: [
        {
            id: "webgis",
            title: "WebGIS - Land Management",
            img: gisDev,
            description: "Building powerful GIS-based land management solutions.",
        },
        {
            id: "website-creation",
            title: "Website Creation",
            img: websiteDev,
            description: "Designing modern, responsive, and interactive websites.",
        },
        {
            id: "web-application",
            title: "Web Application",
            img: webAppDev,
            description: "Creating custom web applications tailored to business needs.",
        },
        {
            id: "mobile-application",
            title: "Mobile Application",
            img: mobileAppDev,
            description: "Developing high-performance mobile applications for various industries.",
        },
    ],
};

export default servicesData;
