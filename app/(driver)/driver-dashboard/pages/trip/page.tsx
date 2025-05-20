"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MapPin } from "lucide-react";

// API URL for Geocoding
const GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

// Define the types for the Trip and Passenger
interface Passenger {
  firstName?: string;
  lastName?: string;
}

interface Trip {
  _id: string;
  fare: number;
  status: string;
  bookedAt: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  passenger?: Passenger;
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [totalEarnings, setTotalEarnings] = useState<number>(0);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in localStorage");

        const response = await fetch(
          `http://localhost:5090/api/v2/rides-by-driver/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch trips");

        const data = await response.json();
        const tripsData: Trip[] = data.data || [];

        // Calculate total earnings from trips only
        const tripEarnings = tripsData.reduce(
          (total, trip) => total + (trip.fare || 0),
          0
        );
        setTotalEarnings(tripEarnings);

        // Convert coordinates to real addresses
        const updatedTrips = await Promise.all(
          tripsData.map(async (trip) => {
            const pickupAddress = await getAddressFromCoordinates(
              trip.pickupLocation
            );
            const dropoffAddress = await getAddressFromCoordinates(
              trip.dropoffLocation
            );
            return {
              ...trip,
              pickupAddress: pickupAddress || "Unknown Location",
              dropoffAddress: dropoffAddress || "Unknown Location",
            };
          })
        );

        setTrips(updatedTrips);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Function to get address from coordinates
  const getAddressFromCoordinates = async (
    coordinates: string
  ): Promise<string> => {
    try {
      if (!coordinates || typeof coordinates !== "string") {
        return "Unknown Location";
      }

      const [lat, lng] = coordinates.split(",").map(Number);
      if (isNaN(lat) || isNaN(lng)) return "Invalid Coordinates";

      // Use Google Maps API if available
      if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        const response = await fetch(
          `${GEOCODING_API_URL}?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === "OK" && data.results.length > 0) {
          return data.results[0].formatted_address;
        }
      }

      // Fallback to OpenStreetMap
      const osmResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            "Accept-Language": "en",
            "User-Agent": "YourAppName/1.0",
          },
        }
      );

      const osmData = await osmResponse.json();
      if (osmData && osmData.display_name) return osmData.display_name;

      return "Location Not Found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unknown Location";
    }
  };

  // Format date function
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Trip History</h1>
        <p className="text-muted-foreground">View and manage your past trips</p>
      </div>

      {/* Earnings Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-green-600">
            RS {totalEarnings.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      {/* Trip History Section */}
      <Card>
        <CardHeader>
          <CardTitle>Trip History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 p-4">{error}</p>
          ) : trips.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No trips found.</p>
              <p className="text-sm mt-2">
                Your completed trips will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {trips.map((trip) => (
                <div
                  key={trip._id}
                  className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {trip.passenger?.firstName?.[0] || "?"}
                        {trip.passenger?.lastName?.[0] || ""}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {trip.passenger?.firstName || "Unknown"}{" "}
                          {trip.passenger?.lastName || "Passenger"}
                        </p>
                        <Badge
                          variant={
                            trip.status === "Completed"
                              ? "outline"
                              : "destructive"
                          }
                          className={
                            trip.status === "Completed"
                              ? "text-green-500 bg-green-50 dark:bg-green-950/20"
                              : ""
                          }
                        >
                          {trip.status}
                        </Badge>
                      </div>

                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatDate(trip.bookedAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end">
                    <div className="flex items-center gap-2 md:justify-end">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span
                        className="text-xs max-w-[300px] truncate"
                        title={`${trip.pickupAddress} → ${trip.dropoffAddress}`}
                      >
                        {trip.pickupAddress} → {trip.dropoffAddress}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 md:justify-end">
                      <span className="text-sm font-medium">
                        RS {trip.fare?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
