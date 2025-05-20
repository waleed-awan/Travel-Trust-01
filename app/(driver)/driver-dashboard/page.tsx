"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {  Car, Clock } from "lucide-react";
import axios from "axios";


interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
}

interface Route {
  startPoint: string;
  endPoint: string;
}

interface Ride {
  _id: string;
  bookedAt: string;
  fare: number;
  status: string;
  passenger: Passenger;
  route: Route;
  pickupLocation: string;
  dropoffLocation: string;
  distance: number;
  duration: string;
  durationMultiplier: number;
  paymentStatus: string;
}



interface DriverStats {
  totalEarnings: number;
  totalAccepted: number;
  totalCanceled: number;
}

interface Passenger {
  name: string;
}

interface Route {
  start: string;
  end: string;
}

interface Ride {
  _id: string;
  bookedAt: string;
  fare: number;
  status: string;
  passenger: Passenger;
  route: Route;
}

export default function Dashboard() {
  const [driverStats, setDriverStats] = useState<DriverStats>({
    totalEarnings: 0,
    totalAccepted: 0,
    totalCanceled: 0,
  });
  const [recentRides, setRecentRides] = useState<Ride[]>([]);

  const fetchAddressFromCoordinates = async (coordinates: string) => {
    try {
      const [lat, lon] = coordinates.split(",").map((coord) => coord.trim());
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      return response.data.display_name;
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unknown Location";
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const storedDriverId = localStorage.getItem("userId");
      if (!storedDriverId) return;
  
      try {
        const [statsRes, ridesRes] = await Promise.all([
          axios.get<DriverStats>(`http://localhost:5090/api/v2/driver/stats/${storedDriverId}`),
          axios.get<{ recentRides: Ride[] }>(`http://localhost:5090/api/v2/driver/recent-rides/${storedDriverId}`)
        ]);
  
        setDriverStats(statsRes.data);
  
        const ridesWithAddresses = await Promise.all(
          ridesRes.data.recentRides.map(async (ride) => ({
            ...ride,
            pickupLocation: await fetchAddressFromCoordinates(ride.pickupLocation),
            dropoffLocation: await fetchAddressFromCoordinates(ride.dropoffLocation),
          }))
        );
  
        setRecentRides(ridesWithAddresses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your driving activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(driverStats.totalEarnings)} RS
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle>Rides Accepted</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {driverStats.totalAccepted}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle>Rides Canceled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {driverStats.totalCanceled}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent-trips">Recent Trips</TabsTrigger>
        </TabsList>
        <TabsContent value="recent-trips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
              <CardDescription>
                Your most recent trips and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentRides.length > 0 ? (
                  recentRides.map((trip) => (
                    <div
                      key={trip._id}
                      className="flex flex-col gap-2 p-4 border-b"
                    >
                      <p>
                        <strong>Passenger:</strong> {trip.passenger.firstName}{" "}
                        {trip.passenger.lastName}
                      </p>
                      <p>
                        <strong>Route:</strong> {trip.route.startPoint} →{" "}
                        {trip.route.endPoint}
                      </p>
                      <p>
                        <strong>Fare:</strong> {Math.round(trip.fare)} RS
                      </p>
                      {/* <p>
                        <strong>Pickup Location:</strong> {trip.pickupLocation}
                      </p>
                      <p>
                        <strong>Dropoff Location:</strong>{" "}
                        {trip.dropoffLocation}
                      </p> */}
                      <p>
                        <strong>Distance:</strong> {trip.distance.toFixed(2)} km
                      </p>
                      <p>
                        <strong>Duration:</strong> {trip.duration} (Multiplier:{" "}
                        {trip.durationMultiplier})
                      </p>
                      <p>
                        <strong>Payment Status:</strong> {trip.paymentStatus}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <Badge variant="outline">{trip.status}</Badge>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No recent trips available.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
