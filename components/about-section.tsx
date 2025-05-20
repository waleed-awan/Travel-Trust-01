"use client";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Image from "next/image";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
    id="about"
      ref={ref}
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-12 md:py-16 relative"
    >
      {/* Right Side (Taxi Image with Floating Badge) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center"
      >
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-8 md:left-10 bg-black text-white px-3 py-1 md:px-4 md:py-2 rounded-full flex items-center gap-2 w-fit shadow-lg"
        >
          {/* Image inside badge */}
          <div className="rounded-full bg-amber-300 p-3 md:p-3.5">
            <Image
            width={300}
            height={300}
              src="/taxi-booking.svg"
              alt="Taxi Booking Icon"
              className="w-6 h-6 md:w-8 md:h-8"
            />
          </div>
          {/* Badge Text */}
          <p className="text-xs sm:text-sm md:text-base font-medium">
            30 Years Of Quality Service
          </p>
        </motion.div>

        <Image
        height={300}
        width={300}
          src="/01.png"
          alt="Taxi Service"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        />
      </motion.div>

      {/* Left Side (Text Content) */}
      <motion.div className="md:w-1/2 text-center md:text-left">
        {/* Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight"
        >
          We Provide Trusted{" "}
          <span className="text-yellow-500">Cab Service</span> In The World
        </motion.h2>

        {/* Animated Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-600 mt-4 text-sm sm:text-base"
        >
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour.
        </motion.p>

        {/* List Items */}
        <motion.ul className="mt-6 space-y-3 text-sm sm:text-base">
          {[
            "At vero eos et accusamus et iusto odio.",
            "Established fact that a reader will be distracted.",
            "Sed ut perspiciatis unde omnis iste natus sit.",
          ].map((text, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex items-center gap-2 text-gray-700 justify-center md:justify-start"
            >
              ✅ {text}
            </motion.li>
          ))}
        </motion.ul>

        {/* Discover More Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6"
        >
          <Button className="w-full md:w-auto cursor-pointer bg-yellow-500 text-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 px-6 py-3">
            Discover More →
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
