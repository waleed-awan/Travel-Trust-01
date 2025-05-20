"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define a type for Trip objects
interface Trip {
  _id: string
  date?: string
  pickup?: string
  dropoff?: string
  fare?: number
}

// Define a type for the API response data
interface ApiTripData {
  _id: string
  date?: string
  pickup?: string
  dropoff?: string
  fare?: number
  // Add other possible fields from your API response
}

interface ApiResponse {
  success: boolean
  data: ApiTripData[]
  totalEarnings?: number
}

export default function EarningsPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [loading, setLoading] = useState(true)

  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "default-user-id"
    setUserId(storedUserId)
  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5090/api/v2/get-rides-y-driver/${userId}`)
        const data: ApiResponse = await response.json()
        if (data.success && Array.isArray(data.data)) {
          setTrips(
            data.data.map((trip: ApiTripData) => ({
              _id: trip._id,
              date: trip.date || "N/A",
              pickup: trip.pickup || "N/A",
              dropoff: trip.dropoff || "N/A",
              fare: trip.fare || 0,
            })),
          )
          setTotalEarnings(data.totalEarnings || 0)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userId])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
      <p className="text-muted-foreground">Track and manage your earnings</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Trips</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : trips.length === 0 ? (
                <p>No trips found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Pickup</TableHead>
                      <TableHead>Dropoff</TableHead>
                      <TableHead>Fare ($)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trips.map((trip) => (
                      <TableRow key={trip._id}>
                        <TableCell>{trip.date}</TableCell>
                        <TableCell>{trip.pickup}</TableCell>
                        <TableCell>{trip.dropoff}</TableCell>
                        <TableCell>${(trip.fare ?? 0).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
