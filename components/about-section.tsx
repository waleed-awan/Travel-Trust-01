"use client"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isModalOpen, setIsModalOpen] = useState(false)

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
          <p className="text-xs sm:text-sm md:text-base font-medium">30 Years Of Quality Service</p>
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
          We Provide Trusted <span className="text-yellow-500">Cab Service</span> In The World
        </motion.h2>

        {/* Animated Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-600 mt-4 text-sm sm:text-base"
        >
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour.
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
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto cursor-pointer bg-yellow-500 text-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 px-6 py-3"
          >
            Discover More →
          </Button>
        </motion.div>
      </motion.div>

      {/* Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Premium <span className="text-yellow-500">Taxi Service</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Discover why we're the most trusted taxi service provider for over 30 years.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-500 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Professional Drivers</h3>
                <p className="text-sm text-gray-500">
                  All our drivers are professionally trained and certified with years of experience.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-yellow-500 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Modern Fleet</h3>
                <p className="text-sm text-gray-500">
                  Our vehicles are regularly maintained and equipped with the latest technology for your comfort.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-yellow-500 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-black"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">24/7 Availability</h3>
                <p className="text-sm text-gray-500">
                  Our services are available round the clock to ensure you're never stranded.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-between flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-100 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-600"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <span className="text-sm font-medium">Call us: +92 305 47407640</span>
            </div>
            <DialogClose asChild>
              <Button className="bg-yellow-500 text-black hover:bg-black hover:text-white">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default AboutSection
