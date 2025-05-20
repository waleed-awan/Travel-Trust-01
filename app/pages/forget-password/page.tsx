"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] max-w-4xl shadow-lg rounded-xl overflow-hidden border border-gray-200">
        
        {/* Left Side - Image */}
        <div className="hidden md:block">
          <Image
          width={300}
          height={300} 
            src="/forget-password.jpg" 
            alt="Forgot Password" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12 bg-white"
        >
          <Card className="bg-white border-none shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-black text-3xl font-bold">
                Forgot Password
              </CardTitle>
              <p className="text-gray-600 text-sm mt-2">
                Enter your email to reset your password.
              </p>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <p className="text-center text-gray-700">
                  If an account exists with this email, you will receive a reset link shortly.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg" 
                    />
                  </div>

                  <Button type="submit" className="w-full cursor-pointer bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition-all duration-300">
                    Send Reset Link
                  </Button>

                  <p className="text-center text-gray-600 text-sm mt-4">
                    Remembered your password?{" "}
                    <Link href="/signin">
                      <span className="text-black font-semibold hover:underline cursor-pointer">
                        Sign in
                      </span>
                    </Link>
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
