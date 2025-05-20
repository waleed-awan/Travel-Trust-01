"use client";

import { motion, useInView } from "framer-motion";
import { FaTaxi, FaUserTie, FaMapMarkerAlt } from "react-icons/fa";
import { useRef } from "react";

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    {
      id: 1,
      icon: <FaTaxi className="text-yellow-500 text-2xl" />, 
      title: "Best Quality Taxi",
      description:
        "There are many variations of passages available but the majority have suffered alteration in form.",
    },
    {
      id: 2,
      icon: <FaUserTie className="text-yellow-500 text-2xl" />,
      title: "Expert Drivers",
      description:
        "There are many variations of passages available but the majority have suffered alteration in form.",
    },
    {
      id: 3,
      icon: <FaMapMarkerAlt className="text-yellow-500 text-2xl" />,
      title: "Many Locations",
      description:
        "There are many variations of passages available but the majority have suffered alteration in form.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="FAQ"
      className="relative  w-full bg-black text-white py-20 px-6"
    >
      {/* Background Overlay Design */}
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

      {/* Container */}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <p className="text-yellow-500 font-semibold uppercase">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            We Are Dedicated <span className="text-yellow-500">To Provide</span>{" "}
            Quality Service
          </h2>
          <p className="text-gray-400 mt-4 text-sm md:text-base">
            There are many variations of passages available but the majority
            have suffered alteration in some form.
          </p>
        </motion.div>

        {/* Right Content - Features */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 flex flex-col gap-4 mt-10 md:mt-0"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white text-black rounded-md p-4 shadow-md flex items-center gap-3 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="p-2 bg-yellow-100 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
              <span className="text-gray-300 text-3xl font-bold ml-auto">{`0${feature.id}`}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Taxi Image */}
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        src="/taxi.png"
        alt="Taxi"
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-72 md:w-80"
      />
    </section>
  );
}
