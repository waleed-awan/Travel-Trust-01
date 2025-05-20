"use client"

import { Car, Users, UserCheck, MapPin, Shield, Clock, DollarSign, HeadphonesIcon } from "lucide-react"
import CountUp from "./CountUp"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const hasBeenInView = useRef(false)
  const isInView = useInView(sectionRef, { amount: 0.3 })

  if (isInView) hasBeenInView.current = true

  return (
    <div className="relative overflow-hidden">
      {/* Stats Section */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] py-16">
        <div className="container mx-auto px-4">
          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={hasBeenInView.current ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              { icon: Car, count: 500, text: "Available Taxi" },
              { icon: Users, count: 900, text: "Happy Clients" },
              { icon: UserCheck, count: 700, text: "Our Drivers" },
              { icon: MapPin, count: 1800, text: "Road Trip Done" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={hasBeenInView.current ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              >
                <div className="mb-4 rounded-full bg-amber-500 p-4 ring-4 ring-amber-500/30">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white">
                  <CountUp end={stat.count} />
                </div>
                <div className="mt-2 text-sm text-gray-300">+ {stat.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="text-amber-500 text-sm font-semibold uppercase tracking-wider">FEATURE</div>
            <h2 className="mt-2 text-4xl font-bold ">Our Awesome Feature</h2>
            <div className="mt-4 inline-block h-1 w-20 bg-amber-500"></div>
          </div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 30 }}
            animate={hasBeenInView.current ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {[
              { icon: Shield, title: "Safety Guarantee" },
              { icon: Clock, title: "Fast Pickup" },
              { icon: DollarSign, title: "Affordable Rate" },
              { icon: HeadphonesIcon, title: "24/7 Support" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative rounded-lg bg-white p-8 text-center shadow-lg transition-transform hover:-translate-y-2 hover:scale-105 hover:rotate-2 hover:shadow-2xl hover:ring-4 hover:ring-amber-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={hasBeenInView.current ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.1, rotate: 2, transition: { duration: 0.3, ease: "easeInOut" } }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-amber-500 p-4 ring-4 ring-amber-500/30">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-800">{feature.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  There are many variations of majority have suffered alteration in some form injected humour randomised
                  words.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 🔥 Corrected Checkered Border Animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-6 w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #F59E0B 0, #F59E0B 12px, transparent 12px, transparent 24px)",
          backgroundSize: "48px 48px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 7,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  )
}
