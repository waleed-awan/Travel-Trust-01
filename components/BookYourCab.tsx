"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function RequestQuote() {
  return (
    <section
      id="contact"
      className="relative bg-yellow-500 py-16 px-6 text-center overflow-hidden"
    >
      {/* Top Animated Checkered Border */}
      <motion.div
        className="absolute top-0 left-0 h-6 w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 12px, transparent 12px, transparent 24px)",
          backgroundSize: "48px 48px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {/* Bottom Animated Checkered Border */}
      <motion.div
        className="absolute bottom-0 left-0 h-6 w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 12px, transparent 12px, transparent 24px)",
          backgroundSize: "48px 48px",
        }}
        animate={{
          backgroundPosition: ["100% 0%", "0% 0%"],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10"
      >
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-white text-left md:w-2/3"
        >
          <h2 className="text-3xl font-bold leading-tight">
            Request a Free Quote <br /> No Obligation
          </h2>
          <p className="text-white/80 mt-3">
            Get a detailed estimate for your project with transparent pricing.
            Our team will analyze your requirements and provide a comprehensive
            quote.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="hidden md:block h-16 w-[2px] bg-white mx-6"
        ></motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start md:w-1/3"
        >
          <div className="flex flex-col gap-3">
            <motion.div
              className="flex items-center gap-2 text-white text-lg font-semibold"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaPhone className="text-xl" />
              +92 305 4740764
            </motion.div>
            <motion.div
              className="flex items-center gap-2 text-white text-lg font-semibold"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaEnvelope className="text-xl" />
              arhamshahzad957@gmail.com{" "}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
