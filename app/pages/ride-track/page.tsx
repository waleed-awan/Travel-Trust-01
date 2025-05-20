"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Car,
  Phone,
  MessageSquare,
  Star,
  Clock,
  MapPin,
  Navigation,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RideTrackerProps {
  bookingId: string
  pickupLocation: string
  destination: string
  rideType: string
  driverName?: string
  driverRating?: number
  vehicleInfo?: string
  licensePlate?: string
}

export default function RideTracker({
  bookingId = "RD-1234567",
  pickupLocation = "123 Main St, Anytown",
  destination = "456 Market St, Anytown",
  rideType = "Standard",
  driverName = "Michael Chen",
  driverRating = 4.8,
  vehicleInfo = "Toyota Camry, Black",
  licensePlate = "ABC 123",
}: RideTrackerProps) {
  const [rideStatus, setRideStatus] = useState<
    "searching" | "assigned" | "arriving" | "arrived" | "inProgress" | "completed"
  >("searching")
  const [eta, setEta] = useState(12)
  const [distance, setDistance] = useState(2.4)
  const [progress, setProgress] = useState(0)
  const [expandedMap, setExpandedMap] = useState(true)
  const [expandedDetails, setExpandedDetails] = useState(true)

  // Simulate ride progress
  useEffect(() => {
    // Initial delay to simulate finding a driver
    const findDriverTimeout = setTimeout(() => {
      setRideStatus("assigned")
      setProgress(10)
    }, 3000)

    // Simulate driver approaching
    const driverApproachingTimeout = setTimeout(() => {
      setRideStatus("arriving")
      setProgress(30)
    }, 8000)

    // Simulate driver arrived
    const driverArrivedTimeout = setTimeout(() => {
      setRideStatus("arrived")
      setProgress(50)
    }, 15000)

    // Simulate ride in progress
    const rideInProgressTimeout = setTimeout(() => {
      setRideStatus("inProgress")
      setProgress(75)
    }, 20000)

    // Simulate ride completed
    const rideCompletedTimeout = setTimeout(() => {
      setRideStatus("completed")
      setProgress(100)
    }, 35000)

    // Simulate ETA updates
    const etaInterval = setInterval(() => {
      setEta((prev) => {
        if (prev <= 1) {
          clearInterval(etaInterval)
          return 0
        }
        return prev - 1
      })
    }, 5000)

    // Simulate distance updates
    const distanceInterval = setInterval(() => {
      setDistance((prev) => {
        if (prev <= 0.1) {
          clearInterval(distanceInterval)
          return 0
        }
        return Number.parseFloat((prev - 0.2).toFixed(1))
      })
    }, 4000)

    return () => {
      clearTimeout(findDriverTimeout)
      clearTimeout(driverApproachingTimeout)
      clearTimeout(driverArrivedTimeout)
      clearTimeout(rideInProgressTimeout)
      clearTimeout(rideCompletedTimeout)
      clearInterval(etaInterval)
      clearInterval(distanceInterval)
    }
  }, [])

  // Get status text and color based on ride status
  const getStatusInfo = () => {
    switch (rideStatus) {
      case "searching":
        return { text: "Finding your driver...", color: "bg-muted" }
      case "assigned":
        return { text: "Driver assigned", color: "bg-blue-500" }
      case "arriving":
        return { text: "Driver is on the way", color: "bg-blue-500" }
      case "arrived":
        return { text: "Driver has arrived", color: "bg-yellow-500" }
      case "inProgress":
        return { text: "Ride in progress", color: "bg-green-500" }
      case "completed":
        return { text: "Ride completed", color: "bg-green-600" }
      default:
        return { text: "Unknown status", color: "bg-muted" }
    }
  }

  const statusInfo = getStatusInfo()

  // Simulate driver movement on the map
  const getDriverPosition = () => {
    if (rideStatus === "searching") return { left: "10%", top: "70%" }
    if (rideStatus === "assigned") return { left: "20%", top: "65%" }
    if (rideStatus === "arriving") return { left: "35%", top: "55%" }
    if (rideStatus === "arrived") return { left: "45%", top: "45%" }
    if (rideStatus === "inProgress") return { left: "70%", top: "30%" }
    if (rideStatus === "completed") return { left: "85%", top: "20%" }
    return { left: "10%", top: "70%" }
  }

  const driverPosition = getDriverPosition()

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 max-w-3xl">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Your Ride</CardTitle>
            <Badge variant="outline" className="text-primary-foreground border-primary-foreground">
              {bookingId}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Badge className={cn("text-white", statusInfo.color)}>{statusInfo.text}</Badge>
            {rideStatus !== "completed" && (
              <div className="text-sm flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>ETA: {eta} min</span>
              </div>
            )}
          </div>
        </CardHeader>

        <div className="relative">
          <Progress value={progress} className="h-2 rounded-none" />
        </div>

        <div className="border-b">
          <div className="flex justify-between items-center p-4">
            <h3 className="font-medium">Live Tracking</h3>
            <Button variant="ghost" size="sm" onClick={() => setExpandedMap(!expandedMap)} className="h-8 w-8 p-0">
              {expandedMap ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          {expandedMap && (
            <div className="relative h-[250px] bg-muted/30 overflow-hidden">
              {/* Simulated map */}
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=800')] bg-cover bg-center opacity-50"></div>

              {/* Route visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[1px] bg-primary/50 relative">
                  <div className="absolute w-full h-full bg-primary" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              {/* Pickup location marker */}
              <div className="absolute left-[10%] top-[45%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-green-500 text-white p-1 rounded-full">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium bg-background/80 px-2 py-1 rounded whitespace-nowrap">
                  Pickup
                </div>
              </div>

              {/* Destination marker */}
              <div className="absolute left-[85%] top-[20%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-red-500 text-white p-1 rounded-full">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium bg-background/80 px-2 py-1 rounded whitespace-nowrap">
                  Destination
                </div>
              </div>

              {/* Driver marker */}
              {rideStatus !== "searching" && (
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
                  style={{ left: driverPosition.left, top: driverPosition.top }}
                >
                  <div className="bg-primary text-primary-foreground p-1 rounded-full animate-pulse">
                    <Car className="h-5 w-5" />
                  </div>
                </div>
              )}

              {/* Distance indicator */}
              {rideStatus !== "completed" && rideStatus !== "searching" && (
                <div className="absolute bottom-4 right-4 bg-background/90 rounded-md px-3 py-2 text-sm font-medium shadow-sm">
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-primary" />
                    <span>{distance} miles away</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-b">
          <div className="flex justify-between items-center p-4">
            <h3 className="font-medium">Ride Details</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedDetails(!expandedDetails)}
              className="h-8 w-8 p-0"
            >
              {expandedDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          {expandedDetails && (
            <CardContent className="p-4 pt-0">
              {rideStatus !== "searching" && (
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" alt={driverName} />
                    <AvatarFallback>
                      {driverName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{driverName}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{driverRating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Car className="h-3 w-3" />
                      <span>{vehicleInfo}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                      <MapPin className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="w-[1px] h-10 bg-muted-foreground/30"></div>
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                      <MapPin className="h-3 w-3 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <p className="font-medium">Pickup</p>
                      <p className="text-sm text-muted-foreground">{pickupLocation}</p>
                    </div>
                    <div className="h-6"></div>
                    <div>
                      <p className="font-medium">Destination</p>
                      <p className="text-sm text-muted-foreground">{destination}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ride Type</p>
                    <p className="font-medium">{rideType}</p>
                  </div>
                  {rideStatus !== "searching" && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">License Plate</p>
                      <p className="font-medium">{licensePlate}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          )}
        </div>

        <CardFooter className="p-4 flex flex-wrap gap-2">
          {rideStatus !== "completed" && rideStatus !== "searching" && (
            <>
              <Button variant="outline" className="flex-1" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Call Driver
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
            </>
          )}

          {rideStatus !== "completed" && (
            <Button variant="destructive" className="w-full mt-2" size="sm">
              <AlertCircle className="mr-2 h-4 w-4" />
              {rideStatus === "searching" ? "Cancel Search" : "Cancel Ride"}
            </Button>
          )}

          {rideStatus === "completed" && (
            <>
              <Button variant="default" className="w-full">
                Rate Your Ride
              </Button>
              <Button variant="outline" className="w-full mt-2">
                Book Another Ride
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

