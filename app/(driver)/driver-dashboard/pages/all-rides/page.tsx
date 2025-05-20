"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MapPin, Navigation, User, Calendar, Clock, AlertCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface Ride {
  _id: string
  passenger: { firstName: string; lastName: string }
  driver: { name: string }
  pickupLocation: string
  dropoffLocation: string
  route: {
    name: string
    startPoint: string
    endPoint: string
    stops: Array<{
      name: string
      location: string
      order?: number
    }>
  }
  status: string
  pickupDateTime: string
  fare: number
  duration: string
}

export default function RidesByDriver() {
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const driverId = localStorage.getItem("userId")

    if (!driverId) {
      setError("Driver ID not found in local storage.")
      setLoading(false)
      return
    }

    const fetchRides = async () => {
      try {
        const response = await axios.get(`http://localhost:5090/api/v2/rides-by-driver/${driverId}`)

        // Check if the response has the expected structure
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
          setRides(response.data.data)
        } else {
          console.error("Unexpected API response structure:", response.data)
          setError("Received unexpected data format from the server.")
          setRides([])
        }
      } catch (err) {
        console.error("Error fetching rides:", err)
        setError("Failed to fetch rides.")
        setRides([])
      } finally {
        setLoading(false)
      }
    }

    fetchRides()
  }, [isClient])

  if (!isClient) return null

  const getStatusBadge = (status?: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      pending: {
        color: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        label: "Pending",
      },
      accepted: {
        color: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        label: "Accepted",
      },
      completed: {
        color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        label: "Completed",
      },
      cancelled: {
        color: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
        label: "Cancelled",
      },
    }

    const defaultStatus = {
      color: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
      label: "Unknown",
    }

    const statusInfo = status ? statusMap[status.toLowerCase()] || defaultStatus : defaultStatus

    return (
      <Badge variant="outline" className={`${statusInfo.color}`}>
        {statusInfo.label}
      </Badge>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return "N/A"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const truncateLocation = (location: string, maxLength = 60) => {
    if (!location) return "Location not available"
    return location.length > maxLength ? location.substring(0, maxLength) + "..." : location
  }

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-8 w-24" />
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mx-4 my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Rides</h2>
        <Badge variant="outline" className="text-sm">
          {rides?.length || 0} {(rides?.length || 0) === 1 ? "ride" : "rides"}
        </Badge>
      </div>

      {(rides?.length || 0) === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-muted p-3 mb-3">
              <Navigation className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No rides found</h3>
            <p className="text-sm text-muted-foreground text-center">
              You don&apos;t have any rides assigned yet. Check back later.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-1">
          {rides?.map((ride) => (
            <Card key={ride._id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Ride #{ride._id.substring(ride._id.length - 6)}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <User className="h-3.5 w-3.5 mr-1" />
                      {ride.passenger?.firstName} {ride.passenger?.lastName || ""}
                    </CardDescription>
                  </div>
                  {getStatusBadge(ride.status)}
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid gap-3">
                  <div className="flex items-start gap-2 mt-2">
                    <div className="flex flex-col items-center mt-1">
                      <div className="rounded-full bg-green-500/20 p-1">
                        <MapPin className="h-3 w-3 text-green-500" />
                      </div>
                      <div className="w-0.5 h-10 bg-border my-1"></div>
                      <div className="rounded-full bg-blue-500/20 p-1">
                        <MapPin className="h-3 w-3 text-blue-500" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">PICKUP</p>
                        <p className="text-sm">
                          {truncateLocation(ride.route?.startPoint || "Location not available")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">DROPOFF</p>
                        <p className="text-sm">{truncateLocation(ride.route?.endPoint || "Location not available")}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-1" />

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {formatDate(ride.pickupDateTime)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {formatTime(ride.pickupDateTime)}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground">Fare:</div>
                    <div className="font-medium">{formatCurrency(ride.fare)}</div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground">Duration:</div>
                    <div>{ride.duration || "N/A"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
