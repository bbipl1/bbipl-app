import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import servicesData from "../services/data/data";

const Services = () => {
    const [activeTab, setActiveTab] = useState("indoor");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [changingCategory, setChangingCategory] = useState(false);
    const navigate = useNavigate();
    const services = servicesData[activeTab];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % services.length);
        }, 7000);
        return () => clearInterval(interval);
    }, [activeTab, services.length]);

    const handleTabChange = (category) => {
        if (category !== activeTab) {
            setChangingCategory(true);
            setTimeout(() => {
                setActiveTab(category);
                setCurrentIndex(0);
                setChangingCategory(false);
            }, 500);
        }
    };

    // Define unique animation variants for each main category
    const categoryVariants = {
        indoor: {
            initial: { x: -100, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            exit: { x: 100, opacity: 0 },
        },
        outdoor: {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.8, opacity: 0 },
        },
        development: {
            initial: { rotate: -10, opacity: 0 },
            animate: { rotate: 0, opacity: 1 },
            exit: { rotate: 10, opacity: 0 },
        },
    };

    return (
        <section className="max-w-7xl mx-auto py-12 px-4 md:px-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
                Our Services
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 border-b border-gray-300 pb-4 mb-8">
                {Object.keys(servicesData).map((category) => (
                    <button
                        key={category}
                        onClick={() => handleTabChange(category)}
                        className={`text-sm md:text-lg font-semibold capitalize px-4 py-2 rounded-full transition-all duration-300 ${
                            activeTab === category
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-gray-700 hover:text-blue-600"
                        }`}
                    >
                        {category} Services
                    </button>
                ))}
            </div>

            {/* Service Card */}
            <div className="relative flex items-center justify-center h-auto md:h-[450px] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl rounded-3xl p-6">
                <AnimatePresence mode="wait">
                    {changingCategory ? (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center text-xl font-medium text-blue-600"
                        >
                            Loading {activeTab} Services...
                        </motion.div>
                    ) : (
                        <motion.div
                            key={services[currentIndex].id}
                            initial={categoryVariants[activeTab].initial}
                            animate={categoryVariants[activeTab].animate}
                            exit={categoryVariants[activeTab].exit}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col md:flex-row items-center w-full gap-6 md:gap-10"
                        >
                            {/* Image */}
                            <motion.div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={services[currentIndex].img}
                                    alt={services[currentIndex].title}
                                    className="w-full h-auto object-cover rounded-lg"
                                />
                            </motion.div>

                            {/* Text Content */}
                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <h3 className="text-2xl md:text-4xl font-bold text-blue-600 mb-3">
                                    {services[currentIndex].title}
                                </h3>
                                <TypeAnimation
                                    sequence={[
                                        services[currentIndex].description,
                                        5000,
                                        "",
                                        1000,
                                    ]}
                                    wrapper="p"
                                    speed={50}
                                    className="text-base md:text-lg leading-relaxed text-gray-700 mb-4"
                                    repeat={Infinity}
                                />
                                <button
                                    onClick={() =>
                                        navigate(`/pages/services/${activeTab}`)
                                    }
                                    className="px-5 py-2 md:px-6 md:py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                                >
                                    View All Services
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Services;
