"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"

type FormDataType = {
  name: string;
  email: string;
  password: string;
  cnic: string;
  phone: string;
  licenseNumber: string;
  experienceYears: string;
  vehicleDetails: {
    vehicleType: string;
    model: string;
    plateNumber: string;
    seatingCapacity: string;
    color: string;
    insuranceNumber: string;
    manufacturingYear: string;
  };
  documents: string[];
};


export default function MultiStepSignup() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    cnic: "",
    phone: "",
    licenseNumber: "",
    experienceYears: "",
    vehicleDetails: {
      vehicleType: "Car",
      model: "",
      plateNumber: "",
      seatingCapacity: "",
      color: "",
      insuranceNumber: "",
      manufacturingYear: "",
    },
    documents: [],
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...(prev[parent as keyof FormDataType] as Record<string, unknown>), [child]: value, },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess("")

    // Convert string values to appropriate types
    const formattedData = {
      ...formData,
      experienceYears: Number(formData.experienceYears),
      vehicleDetails: {
        ...formData.vehicleDetails,
        seatingCapacity: Number(formData.vehicleDetails.seatingCapacity),
        manufacturingYear: Number(formData.vehicleDetails.manufacturingYear),
      },
    }

    try {
      // Replace with your actual API endpoint
      const response = await axios.post("http://localhost:5090/api/v2/create/driver", formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Registration successful", response.data)
      setSuccess("Driver registration successful! Redirecting to dashboard...")

      // Redirect after successful registration (optional)
      setTimeout(() => {
        window.location.href = "/driver-dashboard"
      }, 2000)
    } catch (err) {
      console.error("Registration failed", err)

      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Registration failed. Please try again.")
      } else {
        setError("Network error. Please check your connection and try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] max-w-6xl shadow-lg rounded-xl overflow-hidden border border-gray-200">
        {/* Left Side - Image */}
        <div className="hidden md:block">
          <Image
            src="/driver-2.jpg"
            alt="Cab Driver Signup"
            width={500} // Set an appropriate width
            height={500} // Set an appropriate height
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12 bg-white"
        >
          <Card className="bg-white border-none shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-black text-3xl font-bold">
                {step === 1 ? "Personal Information" : "Vehicle Details"}
              </CardTitle>
              <p className="text-gray-600 text-sm mt-2">
                {step === 1 ? "Enter your personal details to continue" : "Provide your vehicle details"}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="johndoe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+92 300 1234567"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cnic">CNIC Number</Label>
                      <Input
                        id="cnic"
                        name="cnic"
                        type="text"
                        placeholder="42101-1234567-8"
                        value={formData.cnic}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition-all duration-300"
                    >
                      Next Step
                    </Button>
                  </>
                )}

                {/* Step 2: Vehicle Info */}
                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Drivers License Number</Label>
                      <Input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        placeholder="DL-123456789"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experienceYears">Years of Driving Experience</Label>
                      <Input
                        id="experienceYears"
                        name="experienceYears"
                        type="number"
                        placeholder="5"
                        value={formData.experienceYears}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicleDetails.model">Car Model</Label>
                      <Input
                        id="vehicleDetails.model"
                        name="vehicleDetails.model"
                        type="text"
                        placeholder="Toyota Corolla"
                        value={formData.vehicleDetails.model}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicleDetails.color">Car Color</Label>
                      <Input
                        id="vehicleDetails.color"
                        name="vehicleDetails.color"
                        type="text"
                        placeholder="White"
                        value={formData.vehicleDetails.color}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicleDetails.plateNumber">Car Plate Number</Label>
                      <Input
                        id="vehicleDetails.plateNumber"
                        name="vehicleDetails.plateNumber"
                        type="text"
                        placeholder="ABC-1234"
                        value={formData.vehicleDetails.plateNumber}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicleDetails.seatingCapacity">Seating Capacity</Label>
                      <Input
                        id="vehicleDetails.seatingCapacity"
                        name="vehicleDetails.seatingCapacity"
                        type="number"
                        placeholder="4"
                        value={formData.vehicleDetails.seatingCapacity}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicleDetails.insuranceNumber">Insurance Number</Label>
                      <Input
                        id="vehicleDetails.insuranceNumber"
                        name="vehicleDetails.insuranceNumber"
                        type="text"
                        placeholder="INS-987654321"
                        value={formData.vehicleDetails.insuranceNumber}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicleDetails.manufacturingYear">Manufacturing Year</Label>
                      <Input
                        id="vehicleDetails.manufacturingYear"
                        name="vehicleDetails.manufacturingYear"
                        type="number"
                        placeholder="2020"
                        value={formData.vehicleDetails.manufacturingYear}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
                      />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition-all duration-300"
                      >
                        {isSubmitting ? "Registering..." : "Register"}
                      </Button>
                    </div>
                  </>
                )}

                {/* Sign In Link */}
                <p className="text-center text-gray-600 text-sm mt-4">
                  Already have an account?{" "}
                  <Link href="/pages/Sign-In">
                    <span className="text-black font-semibold hover:underline cursor-pointer">Sign in</span>
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}