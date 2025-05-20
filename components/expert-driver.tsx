"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const drivers = [
  { name: "Alma Mcelroy", image: "/driver-1.jpg" },
  { name: "Marie Hooks", image: "/driver-2.jpg" },
  { name: "Daniel Nesmith", image: "/driver-3.jpg" },
  { name: "Gertrude Barrow", image: "/driver-4.jpg" },
];

// Staggered animation for cards
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

// Individual card animations
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.07, rotate: 2, transition: { duration: 0.3 } },
};

// Image zoom effect
const imageVariants = {
  hover: { scale: 1.1, transition: { duration: 0.5 } },
};

export default function ExpertDrivers() {
  return (
    <section className="text-center py-10">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-yellow-500 uppercase tracking-widest"
      >
        Drivers
      </motion.h3>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl font-bold my-2"
      >
        Our Expert Drivers
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex justify-center gap-6 mt-8 flex-wrap"
      >
        {drivers.map((driver, index) => (
          <motion.div key={index} variants={cardVariants} whileHover="hover">
            <Card className="p-4 shadow-lg border border-yellow-400 rounded-xl cursor-pointer">
              <motion.div
                className="relative w-48 h-48 p-0.5 mx-auto rounded-xl overflow-hidden border-2 border-yellow-400"
                variants={imageVariants}
                whileHover="hover"
              >
                <Image height={300} width={300} src={driver.image} alt={driver.name} className="w-full h-full rounded-xl object-cover" />
              </motion.div>
              <CardContent className="text-center mt-4">
                <h4 className="font-semibold text-lg">{driver.name}</h4>
                <p className="text-yellow-500 text-sm">Expert Driver</p>
                <motion.div
                  className="flex justify-center gap-3 mt-3 text-yellow-500"
                  whileHover={{ scale: 1.1, transition: { yoyo: Infinity } }}
                >
                  <FaFacebookF />
                  <FaTwitter />
                  <FaLinkedinIn />
                  <FaYoutube />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
