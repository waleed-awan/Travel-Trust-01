"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, UploadIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

export default function ComplaintForm() {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast("Complaint submitted", {
        description: "We've received your complaint and will review it shortly.",
      })
      // Reset form here if needed
    }, 1500)
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Submit a Complaint</CardTitle>
          <CardDescription>
            Please provide details about your cab experience. We take all complaints seriously.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Trip Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tripDate">Date of Trip</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tripTime">Approximate Time</Label>
                  <Input id="tripTime" type="time" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cabNumber">Cab Number/License Plate</Label>
                  <Input id="cabNumber" placeholder="Enter cab number if known" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverName">Driver Name</Label>
                  <Input id="driverName" placeholder="Enter driver name if known" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupLocation">Pickup Location</Label>
                <Input id="pickupLocation" placeholder="Enter pickup address" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoffLocation">Dropoff Location</Label>
                <Input id="dropoffLocation" placeholder="Enter dropoff address" required />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Complaint Details</h3>
              <div className="space-y-2">
                <Label htmlFor="complaintType">Type of Complaint</Label>
                <Select required>
                  <SelectTrigger id="complaintType">
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="driver-behavior">Driver Behavior</SelectItem>
                    <SelectItem value="vehicle-condition">Vehicle Condition</SelectItem>
                    <SelectItem value="route-issues">Route Issues</SelectItem>
                    <SelectItem value="billing-payment">Billing/Payment Issues</SelectItem>
                    <SelectItem value="safety-concerns">Safety Concerns</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="complaintDescription">Complaint Description</Label>
                <Textarea
                  id="complaintDescription"
                  placeholder="Please provide detailed information about your complaint"
                  className="min-h-[120px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evidence">Upload Evidence (optional)</Label>
                <div className="flex items-center gap-2">
                  <Input id="evidence" type="file" className="flex-1" />
                  <Button type="button" variant="outline" size="icon">
                    <UploadIcon className="h-4 w-4" />
                    <span className="sr-only">Upload file</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  You can upload photos, receipts, or other evidence related to your complaint.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
            <Button variant="outline" type="button" className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  )
}

