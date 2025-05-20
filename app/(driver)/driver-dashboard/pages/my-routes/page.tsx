"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { MapPin, Clock, DollarSign, Plus, Trash2, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeProvider } from "../../components/theme-provider"

const CreateRoute = ({ routeId }: { routeId?: string }) => {
  const [routeData, setRouteData] = useState({
    name: "",
    startPoint: "",
    endPoint: "",
    stops: [{ location: "", fareFromStart: "" }],
    totalDistance: "",
    estimatedTime: "",
    baseFare: "",
    perKmFare: "",
    extraStopFare: "",
    availableDrivers: [],
  })

  const [driverId, setDriverId] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Fetch driverId from local storage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")
    if (storedUserId) {
      setDriverId(storedUserId)
    }
  }, [])

  const fetchRouteData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:5090/api/v2/route/${routeId}`)
      setRouteData(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching route data:", error)
      setMessage("Failed to load route data")
      setMessageType("error")
      setLoading(false)
    }
  }, [routeId])

  // Fetch existing route data for updating
  useEffect(() => {
    if (routeId) {
      fetchRouteData()
    }
  }, [routeId, fetchRouteData])

  // Update input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setRouteData({ ...routeData, [key]: e.target.value })
    // Clear error for this field when user starts typing
    if (errors[key]) {
      setErrors({ ...errors, [key]: "" })
    }
  }

  // Update stops
  const handleStopChange = (index: number, key: string, value: string) => {
    const updatedStops = [...routeData.stops]
    updatedStops[index] = { ...updatedStops[index], [key]: value }
    setRouteData({ ...routeData, stops: updatedStops })

    // Clear error for this stop when user starts typing
    const errorKey = `stops[${index}].${key}`
    if (errors[errorKey]) {
      setErrors({ ...errors, [errorKey]: "" })
    }
  }

  // Add a new stop
  const addStop = () => {
    setRouteData({
      ...routeData,
      stops: [...routeData.stops, { location: "", fareFromStart: "" }],
    })
  }

  // Remove a stop
  const removeStop = (index: number) => {
    if (routeData.stops.length > 1) {
      const updatedStops = [...routeData.stops]
      updatedStops.splice(index, 1)
      setRouteData({ ...routeData, stops: updatedStops })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Required fields
    if (!routeData.name.trim()) newErrors.name = "Route name is required"
    if (!routeData.startPoint.trim()) newErrors.startPoint = "Start point is required"
    if (!routeData.endPoint.trim()) newErrors.endPoint = "End point is required"
    if (!routeData.totalDistance) newErrors.totalDistance = "Total distance is required"
    if (!routeData.estimatedTime) newErrors.estimatedTime = "Estimated time is required"
    if (!routeData.baseFare) newErrors.baseFare = "Base fare is required"
    if (!routeData.perKmFare) newErrors.perKmFare = "Per km fare is required"

    // Validate stops
    routeData.stops.forEach((stop, index) => {
      if (!stop.location.trim()) {
        newErrors[`stops[${index}].location`] = "Stop location is required"
      }
      if (!stop.fareFromStart) {
        newErrors[`stops[${index}].fareFromStart`] = "Fare is required"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!driverId) {
      setMessage("Driver ID is required")
      setMessageType("error")
      return
    }

    if (!validateForm()) {
      setMessage("Please fix the errors before submitting")
      setMessageType("error")
      return
    }

    setLoading(true)
    setMessage("")
    setMessageType("")

    try {
      const url = routeId
        ? `http://localhost:5090/api/v2/update-route/${routeId}`
        : `http://localhost:5090/api/v2/create-route/${driverId}`

      const method = routeId ? "put" : "post"

      const response = await axios[method](url, routeData)
      setMessage(response.data.message || (routeId ? "Route updated successfully!" : "Route created successfully!"))
      setMessageType("success")

      // Reset form if creating a new route
      if (!routeId) {
        setRouteData({
          name: "",
          startPoint: "",
          endPoint: "",
          stops: [{ location: "", fareFromStart: "" }],
          totalDistance: "",
          estimatedTime: "",
          baseFare: "",
          perKmFare: "",
          extraStopFare: "",
          availableDrivers: [],
        })
      }
    } catch (error) {
      console.error("Error:", error)
      setMessage(`Error ${routeId ? "updating" : "creating"} route. Please try again.`)
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen  ">
       

        <Card className=" mx-auto shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-semibold">{routeId ? "Update Route" : "Create New Route"}</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-4">
            {/* Route Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Route Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter Route Name (e.g., Downtown to Airport)"
                value={routeData.name}
                onChange={(e) => handleChange(e, "name")}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            {/* Start and End Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startPoint" className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Start Point
                </label>
                <Input
                  id="startPoint"
                  type="text"
                  placeholder="Enter Start Point"
                  value={routeData.startPoint}
                  onChange={(e) => handleChange(e, "startPoint")}
                  className={errors.startPoint ? "border-destructive" : ""}
                />
                {errors.startPoint && <p className="text-xs text-destructive">{errors.startPoint}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="endPoint" className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> End Point
                </label>
                <Input
                  id="endPoint"
                  type="text"
                  placeholder="Enter End Point"
                  value={routeData.endPoint}
                  onChange={(e) => handleChange(e, "endPoint")}
                  className={errors.endPoint ? "border-destructive" : ""}
                />
                {errors.endPoint && <p className="text-xs text-destructive">{errors.endPoint}</p>}
              </div>
            </div>

            {/* Distance & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="totalDistance" className="text-sm font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Total Distance (km)
                </label>
                <Input
                  id="totalDistance"
                  type="number"
                  placeholder="Enter Total Distance"
                  value={routeData.totalDistance}
                  onChange={(e) => handleChange(e, "totalDistance")}
                  className={errors.totalDistance ? "border-destructive" : ""}
                />
                {errors.totalDistance && <p className="text-xs text-destructive">{errors.totalDistance}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="estimatedTime" className="text-sm font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4" /> Estimated Time (min)
                </label>
                <Input
                  id="estimatedTime"
                  type="number"
                  placeholder="Enter Estimated Time"
                  value={routeData.estimatedTime}
                  onChange={(e) => handleChange(e, "estimatedTime")}
                  className={errors.estimatedTime ? "border-destructive" : ""}
                />
                {errors.estimatedTime && <p className="text-xs text-destructive">{errors.estimatedTime}</p>}
              </div>
            </div>

            {/* Fare Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Fare Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="baseFare" className="text-sm font-medium flex items-center gap-1">
                    <DollarSign className="h-4 w-4" /> Base Fare
                  </label>
                  <Input
                    id="baseFare"
                    type="number"
                    placeholder="Enter Base Fare"
                    value={routeData.baseFare}
                    onChange={(e) => handleChange(e, "baseFare")}
                    className={errors.baseFare ? "border-destructive" : ""}
                  />
                  {errors.baseFare && <p className="text-xs text-destructive">{errors.baseFare}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="perKmFare" className="text-sm font-medium flex items-center gap-1">
                    <DollarSign className="h-4 w-4" /> Per km Fare
                  </label>
                  <Input
                    id="perKmFare"
                    type="number"
                    placeholder="Enter Fare per km"
                    value={routeData.perKmFare}
                    onChange={(e) => handleChange(e, "perKmFare")}
                    className={errors.perKmFare ? "border-destructive" : ""}
                  />
                  {errors.perKmFare && <p className="text-xs text-destructive">{errors.perKmFare}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="extraStopFare" className="text-sm font-medium flex items-center gap-1">
                    <DollarSign className="h-4 w-4" /> Extra Stop Fare
                  </label>
                  <Input
                    id="extraStopFare"
                    type="number"
                    placeholder="Enter Extra Stop Fare"
                    value={routeData.extraStopFare}
                    onChange={(e) => handleChange(e, "extraStopFare")}
                  />
                </div>
              </div>
            </div>

            {/* Stops Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Stops</h3>
                <Button variant="outline" size="sm" onClick={addStop} className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Stop
                </Button>
              </div>

              {routeData.stops.map((stop, index) => (
                <div key={index} className="p-4 border rounded-md space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Stop {index + 1}</h4>
                    {routeData.stops.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStop(index)}
                        className="h-8 w-8 p-0 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove stop</span>
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label htmlFor={`stop-${index}-location`} className="text-sm font-medium">
                        Location
                      </label>
                      <Input
                        id={`stop-${index}-location`}
                        type="text"
                        placeholder="Enter Location"
                        value={stop.location}
                        onChange={(e) => handleStopChange(index, "location", e.target.value)}
                        className={errors[`stops[${index}].location`] ? "border-destructive" : ""}
                      />
                      {errors[`stops[${index}].location`] && (
                        <p className="text-xs text-destructive">{errors[`stops[${index}].location`]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor={`stop-${index}-fare`} className="text-sm font-medium">
                        Fare from Start
                      </label>
                      <Input
                        id={`stop-${index}-fare`}
                        type="number"
                        placeholder="Enter Fare"
                        value={stop.fareFromStart}
                        onChange={(e) => handleStopChange(index, "fareFromStart", e.target.value)}
                        className={errors[`stops[${index}].fareFromStart`] ? "border-destructive" : ""}
                      />
                      {errors[`stops[${index}].fareFromStart`] && (
                        <p className="text-xs text-destructive">{errors[`stops[${index}].fareFromStart`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {message && (
              <Alert variant={messageType === "error" ? "destructive" : "default"} className="w-full">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleSubmit} disabled={loading} className="w-full" size="lg">
              <Save className="mr-2 h-4 w-4" />
              {loading ? (routeId ? "Updating..." : "Creating...") : routeId ? "Update Route" : "Create Route"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ThemeProvider>
  )
}

export default CreateRoute
