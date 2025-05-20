"use client"

import type React from "react"
import type { ReactNode } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Car, Landmark, Plane, Briefcase, BusFront, MapPin, X, CheckCircle, type LucideIcon } from "lucide-react"
import Image from "next/image"

// Define TypeScript interfaces
interface ServiceFeature {
  longDescription: string
  features: string[]
}

interface Service {
  id: number
  title: string
  image: string
  description: string
  icon: ReactNode
  iconComponent: LucideIcon
  details: ServiceFeature
}

interface ServiceIconProps {
  icon: ReactNode
}

interface ServiceModalProps {
  service: Service
  isOpen: boolean
  onClose: () => void
}

// Service data
const services: Service[] = [
  {
    id: 1,
    title: "Online Booking",
    image: "/01.jpg",
    description:
      "Book your ride online with ease. Enjoy a seamless and hassle-free taxi booking experience with our platform.",
    icon: <Car className="w-6 h-6 text-black" />,
    iconComponent: Car,
    details: {
      longDescription:
        "Our online booking system allows you to reserve a taxi in just a few clicks. Available 24/7, you can book a ride anytime, anywhere.",
      features: ["24/7 availability", "Real-time tracking", "Instant confirmation"],
    },
  },
  {
    id: 2,
    title: "City Transport",
    image: "/02.jpg",
    description: "Get around the city effortlessly with our efficient and reliable transportation service.",
    icon: <Landmark className="w-6 h-6 text-black" />,
    iconComponent: Landmark,
    details: {
      longDescription:
        "Navigate the city with ease using our reliable city transport service. Our experienced drivers know the best routes to avoid traffic.",
      features: ["Knowledgeable local drivers", "Fixed pricing", "No surge charges"],
    },
  },
  {
    id: 3,
    title: "Airport Transport",
    image: "/03.jpg",
    description: "Enjoy stress-free airport transfers with our comfortable and punctual rides.",
    icon: <Plane className="w-6 h-6 text-black" />,
    iconComponent: Plane,
    details: {
      longDescription:
        "Start or end your journey stress-free with our dedicated airport transport service. We monitor flight times to ensure we're there when you need us.",
      features: ["Flight tracking", "Meet & greet service", "Luggage assistance"],
    },
  },
  {
    id: 4,
    title: "Business Transport",
    image: "/04.jpg",
    description: "Professional transport solutions for business meetings, corporate events, and more.",
    icon: <Briefcase className="w-6 h-6 text-black" />,
    iconComponent: Briefcase,
    details: {
      longDescription:
        "Make the right impression with our premium business transport service. Our professional drivers and executive vehicles ensure you arrive in style.",
      features: ["Professional chauffeurs", "Executive vehicles", "Corporate accounts"],
    },
  },
  {
    id: 5,
    title: "Regular Transport",
    image: "/05.jpg",
    description: "Reliable and affordable daily transport for your everyday needs.",
    icon: <BusFront className="w-6 h-6 text-black" />,
    iconComponent: BusFront,
    details: {
      longDescription:
        "Count on us for your daily commute or regular transportation needs. Our subscription plans offer great value for frequent riders.",
      features: ["Subscription plans", "Loyalty rewards", "Consistent drivers"],
    },
  },
  {
    id: 6,
    title: "Tour Transport",
    image: "/06.jpg",
    description: "Explore new destinations with our premium tour transport services.",
    icon: <MapPin className="w-6 h-6 text-black" />,
    iconComponent: MapPin,
    details: {
      longDescription:
        "Discover new places with our specialized tour transport service. Whether it's a day trip or a multi-day excursion, our comfortable vehicles enhance your experience.",
      features: ["Custom itineraries", "Local guides available", "Group discounts"],
    },
  },
]

const ServiceIcon: React.FC<ServiceIconProps> = ({ icon }) => {
  return (
    <motion.div
      id="services"
      className="absolute bottom-5 right-5 bg-yellow-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
      whileHover={{ scale: 1.1, rotate: 10 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {icon}
    </motion.div>
  )
}

// Simple modal component with no scrollbar
const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
  const IconComponent = service.iconComponent

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl max-w-lg w-full shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            {/* Header with image */}
            <div className="relative h-48 overflow-hidden rounded-t-xl">
              <Image
              height={300}
              width={300}
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-2 hover:bg-white/30 transition-colors border border-white/20"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center space-x-3 mb-1">
                  <div className="bg-yellow-500 p-2 rounded-lg">
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white">{service.title}</h2>
              </div>
            </div>

            {/* Simple content */}
            <div className="p-6">
              {/* Service description */}
              <p className="text-gray-700 mb-5">{service.details.longDescription}</p>

              {/* Features - simplified */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">Key Features:</h3>
                <div className="grid grid-cols-1 gap-2">
                  {service.details.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const TaxiServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const openModal = (service: Service): void => {
    setSelectedService(service)
  }

  const closeModal = (): void => {
    setSelectedService(null)
  }

  return (
    <motion.div
      className="bg-gray-100 py-16 w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-yellow-500 font-medium tracking-wide uppercase">SERVICES</p>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">Our Best Services For You</h2>
        <div className="w-16 h-1 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
      </motion.div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 max-w-[360px] mx-auto p-6 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image container */}
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-44 object-cover rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                />
                <ServiceIcon icon={service.icon} />
              </motion.div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <motion.button
                  className="bg-yellow-500 text-black px-5 py-2 rounded text-sm font-medium flex items-center shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => openModal(service)}
                >
                  READ MORE
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <ServiceModal service={selectedService} isOpen={selectedService !== null} onClose={closeModal} />
      )}
    </motion.div>
  )
}

export default TaxiServices
