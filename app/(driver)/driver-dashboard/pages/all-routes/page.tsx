"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { Edit, MapPin, RouteIcon, Plus, Save, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Stop {
  location: string
  fareFromStart: number
}

interface Route {
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
  availableDrivers: string[]
}

export default function DriverRoutes() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [driverId, setDriverId] = useState<string | null>(null)
  const [routes, setRoutes] = useState<Route[]>([])
  const [editingRoute, setEditingRoute] = useState<Partial<Route> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const storedDriverId = localStorage.getItem("userId")
    setDriverId(storedDriverId)

    if (storedDriverId) {
      fetchRoutes(storedDriverId)
    } else {
      setLoading(false)
      setError("Driver ID not found. Please log in again.")
    }
  }, [])

  const fetchRoutes = async (driverId: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`http://localhost:5090/api/v2/get-all/routes/${driverId}`)

      if (res.data.success && Array.isArray(res.data.data)) {
        setRoutes(res.data.data)
      } else {
        setError("Unexpected data format received from server")
        console.error("Unexpected data format:", res.data)
      }
    } catch (error) {
      setError("Failed to fetch routes. Please try again later.")
      console.error("Error fetching routes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (route: Route) => {
    setEditingRoute(route)
    setSuccess(null)
  }

  const handleCancelEdit = () => {
    setEditingRoute(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, stopIndex?: number) => {
    if (editingRoute) {
      const { name, value } = e.target

      if (name.startsWith("stop-") && stopIndex !== undefined) {
        const updatedStops = [...(editingRoute.stops || [])]
        const fieldName = name.split("-")[1]
        updatedStops[stopIndex] = {
          ...updatedStops[stopIndex],
          [fieldName]: fieldName === "fareFromStart" ? Number(value) : value,
        }
        setEditingRoute({ ...editingRoute, stops: updatedStops })
      } else {
        setEditingRoute({ ...editingRoute, [name]: isNaN(Number(value)) ? value : Number(value) })
      }
    }
  }

  const handleSave = async () => {
    if (!editingRoute || !editingRoute._id) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await axios.put(`http://localhost:5090/api/v2/update-route/by-id/${editingRoute._id}`, editingRoute)

      if (res.data.success) {
        const updatedRoutes = routes.map((r) => (r._id === editingRoute._id ? res.data.data : r))
        setRoutes(updatedRoutes)
        setEditingRoute(null)
        setSuccess("Route updated successfully!")
      } else {
        setError("Failed to update the route: " + res.data.message)
      }
    } catch (error) {
      setError("Error updating the route. Please try again.")
      console.error("Error updating the route:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading && routes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground">Loading routes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Routes</h1>
          <p className="text-muted-foreground mt-1">View and manage your driving routes</p>
        </div>
        <Button disabled={editingRoute !== null}>
          <Plus className="mr-2 h-4 w-4" /> Add New Route
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-500 text-green-500">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {routes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <RouteIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Routes Found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              You don&apos;t have any routes assigned yet. Routes will appear here once they are assigned to you.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {routes.map((route) => (
            <Card key={route._id} className={editingRoute?._id === route._id ? "border-primary" : ""}>
              {editingRoute?._id === route._id ? (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Edit Route</h3>
                    <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <Tabs defaultValue="basic">
                    <TabsList className="mb-4">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="fare">Fare Details</TabsTrigger>
                      <TabsTrigger value="stops">Stops</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Route Name</Label>
                          <Input id="name" name="name" value={editingRoute.name || ""} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="totalDistance">Total Distance (km)</Label>
                          <Input
                            id="totalDistance"
                            name="totalDistance"
                            type="number"
                            value={editingRoute.totalDistance || ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="startPoint">Start Point</Label>
                          <Input
                            id="startPoint"
                            name="startPoint"
                            value={editingRoute.startPoint || ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="endPoint">End Point</Label>
                          <Input
                            id="endPoint"
                            name="endPoint"
                            value={editingRoute.endPoint || ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="estimatedTime">Estimated Time (mins)</Label>
                          <Input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="number"
                            value={editingRoute.estimatedTime || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="fare" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="baseFare">Base Fare (₹)</Label>
                          <Input
                            id="baseFare"
                            name="baseFare"
                            type="number"
                            value={editingRoute.baseFare || ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="perKmFare">Fare per km (₹)</Label>
                          <Input
                            id="perKmFare"
                            name="perKmFare"
                            type="number"
                            value={editingRoute.perKmFare || ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="extraStopFare">Extra Stop Fare (₹)</Label>
                          <Input
                            id="extraStopFare"
                            name="extraStopFare"
                            type="number"
                            value={editingRoute.extraStopFare || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="stops">
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                          <h4 className="font-medium">Route Stops</h4>
                          {(editingRoute.stops || []).map((stop, idx) => (
                            <Card key={idx}>
                              <CardHeader className="py-3">
                                <CardTitle className="text-base">Stop {idx + 1}</CardTitle>
                              </CardHeader>
                              <CardContent className="py-2 space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`stop-location-${idx}`}>Location</Label>
                                  <Input
                                    id={`stop-location-${idx}`}
                                    name="stop-location"
                                    value={stop.location}
                                    onChange={(e) => handleChange(e, idx)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`stop-fare-${idx}`}>Fare from Start (₹)</Label>
                                  <Input
                                    id={`stop-fare-${idx}`}
                                    name="stop-fareFromStart"
                                    type="number"
                                    value={stop.fareFromStart}
                                    onChange={(e) => handleChange(e, idx)}
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? (
                        <>
                          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" /> Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{route.name}</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(route)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </Button>
                    </div>
                    <CardDescription className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      {route.startPoint} → {route.endPoint}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Distance</span>
                        <span className="font-medium">{route.totalDistance} km</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Time</span>
                        <span className="font-medium">{route.estimatedTime} mins</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Base Fare</span>
                        <span className="font-medium">₹{route.baseFare}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Per km</span>
                        <span className="font-medium">₹{route.perKmFare}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="stops">
                        <AccordionTrigger>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {route.stops.length} Stops
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {route.stops.map((stop, idx) => (
                              <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                                <div className="flex items-center">
                                  <Badge variant="outline" className="mr-3">
                                    {idx + 1}
                                  </Badge>
                                  <span>{stop.location}</span>
                                </div>
                                <Badge>₹{stop.fareFromStart}</Badge>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
