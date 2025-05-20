"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Taxi data
const taxiCategories = ["ALL TAXI", "HYBRID TAXI", "TOWN TAXI", "SUV TAXI", "LIMOUSINE TAXI"]

const taxiList = [
  {
    id: 1,
    model: "BMW M5 2019 MODEL",
    price: "$1.25/km",
    image: "/taxi.png",
    category: "TOWN TAXI",
    specs: {
      doors: 4,
      passengers: 4,
      luggageCarry: 2,
      airCondition: true,
      gpsNavigation: true,
      driverChoosing: true,
    },
  },
  {
    id: 2,
    model: "Tesla Model S",
    price: "$1.40/km",
    image: "/taxi.png",
    category: "HYBRID TAXI",
    specs: {
      doors: 4,
      passengers: 5,
      luggageCarry: 2,
      airCondition: true,
      gpsNavigation: true,
      driverChoosing: true,
    },
  },
  {
    id: 3,
    model: "Mercedes E-Class",
    price: "$1.30/km",
    image: "/taxi.png",
    category: "TOWN TAXI",
    specs: {
      doors: 4,
      passengers: 4,
      luggageCarry: 3,
      airCondition: true,
      gpsNavigation: true,
      driverChoosing: true,
    },
  },
  {
    id: 4,
    model: "Cadillac Escalade",
    price: "$1.80/km",
    image: "/taxi.png",
    category: "SUV TAXI",
    specs: {
      doors: 5,
      passengers: 7,
      luggageCarry: 4,
      airCondition: true,
      gpsNavigation: true,
      driverChoosing: true,
    },
  },
  {
    id: 5,
    model: "Lincoln Continental",
    price: "$2.00/km",
    image: "/taxi.png",
    category: "LIMOUSINE TAXI",
    specs: {
      doors: 4,
      passengers: 3,
      luggageCarry: 2,
      airCondition: true,
      gpsNavigation: true,
      driverChoosing: true,
    },
  },
  {
    id: 6,
    model: "Toyota Prius",
    price: "$1.10/km",
    image: "/taxi.png",
    category: "HYBRID TAXI",
    specs: {
      doors: 4,
      passengers: 4,
      luggageCarry: 2,
      airCondition: true,
      gpsNavigation: true,
      driverChoosing: true,
    },
  },
]

export default function AvailableTaxisSection() {
  const [activeCategory, setActiveCategory] = useState("ALL TAXI")
  const [filteredTaxis, setFilteredTaxis] = useState(taxiList)
  const [animateCards, setAnimateCards] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Filter taxis when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setAnimateCards(false)

    setTimeout(() => {
      if (category === "ALL TAXI") {
        setFilteredTaxis(taxiList)
      } else {
        const filtered = taxiList.filter((taxi) => taxi.category === category)
        setFilteredTaxis(filtered)
      }
      setAnimateCards(true)
    }, 300)
  }

  // Animation variants for taxi cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
      },
    },
    tap: {
      y: -5,
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  }

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight * 0.75) {
        setAnimateCards(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check on mount
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="w-full bg-white py-16" ref={sectionRef}>
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-yellow-500 font-medium tracking-wide uppercase">OUR TAXI</p>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">Let&apos;s Check Available Taxi</h2>
        <div className="w-16 h-1 bg-yellow-400 mx-auto mt-2 rounded-full"></div>
      </motion.div>

      {/* Category filters */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {taxiCategories.map((category) => (
          <motion.button
            key={category}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category ? "bg-yellow-400 text-black" : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            onClick={() => handleCategoryChange(category)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Taxi grid */}
      <div className="max-w-6xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredTaxis.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={animateCards ? "visible" : "hidden"}
              >
                {filteredTaxis.map((taxi, index) => (
                  <motion.div
                    key={taxi.id}
                    className="bg-gray-50 rounded-md p-6 flex flex-col items-center"
                    custom={index}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {/* Category tag */}
                    <motion.span
                      className="self-start bg-gray-800 text-white text-xs px-3 py-1 rounded-full mb-3"
                      whileHover={{ scale: 1.05, backgroundColor: "#1f2937" }}
                    >
                      {taxi.category}
                    </motion.span>

                    {/* Taxi image */}
                    <motion.div
                      className="bg-white p-6 rounded-md mb-3 w-full flex justify-center"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <motion.img
                        src={taxi.image}
                        alt={taxi.model}
                        className="h-28 object-contain"
                        whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                      />
                    </motion.div>

                    {/* Taxi model and price */}
                    <h3 className="font-bold text-center mb-1">{taxi.model}</h3>
                    <p className="text-yellow-500 font-medium text-sm mb-2">{taxi.price}</p>

                    {/* Yellow divider */}
                    <motion.div
                      className="w-12 h-1 bg-yellow-400 mb-4"
                      whileHover={{ width: "100px", transition: { duration: 0.3 } }}
                    ></motion.div>

                    {/* Specifications */}
                    <div className="w-full space-y-2">
                      <motion.div
                        className="flex items-center justify-between"
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M5 10H19M5 10V18H19V10M5 10L7 4H17L19 10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="text-xs">Taxi Doors:</span>
                        </div>
                        <span className="font-medium text-xs">{taxi.specs.doors}</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-between"
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle
                                cx="9"
                                cy="7"
                                r="4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M23 21V19C22.9986 17.1771 21.7218 15.5857 20 15.13"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16 3.13C17.7248 3.58317 19.0043 5.17792 19.0043 7.005C19.0043 8.83208 17.7248 10.4268 16 10.88"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="text-xs">Passengers:</span>
                        </div>
                        <span className="font-medium text-xs">{taxi.specs.passengers}</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-between"
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                              <path d="M6 18V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <path d="M18 18V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                          <span className="text-xs">Luggage Carry:</span>
                        </div>
                        <span className="font-medium text-xs">{taxi.specs.luggageCarry}</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-between"
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M16.24 7.76C15.07 6.59 13.54 6 12 6C10.46 6 8.93 6.59 7.76 7.76C6.6 8.93 6 10.46 6 12C6 13.54 6.6 15.07 7.76 16.24C8.93 17.4 10.46 18 12 18C13.54 18 15.07 17.4 16.24 16.24C17.4 15.07 18 13.54 18 12C18 10.46 17.4 8.93 16.24 7.76Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <line
                                x1="20"
                                y1="12"
                                x2="20"
                                y2="12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <line
                                x1="4"
                                y1="12"
                                x2="4"
                                y2="12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <line
                                x1="12"
                                y1="20"
                                x2="12"
                                y2="20"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <line
                                x1="12"
                                y1="4"
                                x2="12"
                                y2="4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="text-xs">Air Condition:</span>
                        </div>
                        <span className="font-medium text-xs text-green-500">Yes</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-between"
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                              <path
                                d="M12 22C12 22 20 16 20 12C20 8 16 4 12 4C8 4 4 8 4 12C4 16 12 22 12 22Z"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </div>
                          <span className="text-xs">GPS Navigation:</span>
                        </div>
                        <span className="font-medium text-xs text-green-500">Yes</span>
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-between"
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center mr-2">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle
                                cx="12"
                                cy="8"
                                r="4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="text-xs">Driver Choosing:</span>
                        </div>
                        <span className="font-medium text-xs text-green-500">Yes</span>
                      </motion.div>
                    </div>

                    {/* Book button */}
                    <motion.a
                      href="/pages/book-your-ride"
                      className="w-full bg-yellow-400 text-black font-medium py-3 rounded-md mt-6 text-sm flex items-center justify-center"
                      whileHover={{
                        backgroundColor: "#F59E0B",
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      BOOK CAB NOW
                      <motion.svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ x: 0 }}
                        whileHover={{
                          x: 3,
                          transition: { repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 0.6 },
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </motion.svg>
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p
                  className="text-gray-500 text-lg"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  No taxis available in this category.
                </motion.p>
                <motion.button
                  className="mt-4 px-5 py-2 bg-yellow-400 text-black rounded-full font-medium"
                  onClick={() => handleCategoryChange("ALL TAXI")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Taxis
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
