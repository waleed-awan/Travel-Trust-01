"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, DollarSign, RouteIcon } from "lucide-react"

interface Stop {
  location: string
  fareFromPreviousStop?: number
  expectedArrivalTime?: string
}

interface RouteType {
  _id: string
  name: string
  startPoint: string
  endPoint: string
  stops: Stop[]
  totalDistance: number
  estimatedTime: number
  baseFare: number
  perKmFare: number
  extraStopFare: number
}

// Define the shape of the API response
interface ApiRouteType {
  _id: string
  name: string
  startPoint: string
  endPoint: string
  stops: Stop[]
  totalDistance: string | number
  estimatedTime: string | number
  baseFare: string | number
  perKmFare: string | number
  extraStopFare: string | number
}

export default function RouteDisplay() {
  const [routes, setRoutes] = useState<RouteType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:5090/api/v2/get-all/routes")
        const fetchedRoutes = response.data.data.map((route: ApiRouteType) => ({
          ...route,
          totalDistance: Number(route.totalDistance),
          estimatedTime: Number(route.estimatedTime),
          baseFare: Number(route.baseFare),
          perKmFare: Number(route.perKmFare),
          extraStopFare: Number(route.extraStopFare),
        }))
        setRoutes(fetchedRoutes)
        setError(null)
      } catch (error) {
        console.error("Error fetching routes:", error)
        setError("Failed to load routes. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-destructive text-center">
          <p className="text-lg font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Route Information</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <Card key={route._id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{route.name}</CardTitle>
                <Badge variant="outline" className="bg-primary/10">
                  {route.totalDistance} km
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {route.startPoint} to {route.endPoint}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Time</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{route.estimatedTime} min</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Base Fare</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{route.baseFare}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Per Km</span>
                  <div className="flex items-center gap-1">
                    <RouteIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{route.perKmFare}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Extra Stop</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{route.extraStopFare}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-2" />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="stops">
                  <AccordionTrigger className="text-sm font-medium">View Stops ({route.stops.length})</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {route.stops.map((stop, index) => (
                        <div key={index} className="bg-muted/50 p-3 rounded-md">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="font-medium">{stop.location}</span>
                          </div>

                          {stop.fareFromPreviousStop !== undefined && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground ml-6">
                              <DollarSign className="h-3 w-3" />
                              <span>Fare from previous: {stop.fareFromPreviousStop}</span>
                            </div>
                          )}

                          {stop.expectedArrivalTime && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground ml-6">
                              <Clock className="h-3 w-3" />
                              <span>Expected arrival: {stop.expectedArrivalTime}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {routes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No routes found</p>
        </div>
      )}
    </div>
  )
}
