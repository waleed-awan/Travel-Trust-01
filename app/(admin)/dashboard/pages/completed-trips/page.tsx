"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type RawRide = {
  _id: string;
  fare: number;
  pickupLocation?: string;
  dropoffLocation?: string;
  paymentStatus: string;
};

type Ride = {
  id: string;
  fare: number;
  startPoint: string;
  endPoint: string;
  paymentStatus: string;
};

export default function CompletedRidesTable() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5090/api/v2/get-all-rides"
        );

        console.log("API Response:", response.data.data);

        if (response.data.success) {
          const rawRides: RawRide[] = response.data.data;

          const completedRides: Ride[] = rawRides
            .filter((ride) => ride.paymentStatus === "Paid")
            .map((ride) => ({
              id: ride._id,
              fare: ride.fare,
              startPoint: ride.pickupLocation || "Unknown",
              endPoint: ride.dropoffLocation || "Unknown",
              paymentStatus: ride.paymentStatus,
            }));

          setRides(completedRides);
        }
      } catch (err) {
        setError("Failed to fetch ride data. Please try again.");
        console.error("Error fetching rides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  return (
    <Card className="backdrop-blur-lg bg-white/60 shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Completed Rides
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-lg font-medium py-6">
            Loading rides...
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-6">{error}</div>
        ) : rides.length === 0 ? (
          <div className="text-center text-lg font-medium py-6">
            No completed rides found.
          </div>
        ) : (
          <Table className="w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="p-4 text-left">Fare ($)</TableHead>
                <TableHead className="p-4 text-left">Start Point</TableHead>
                <TableHead className="p-4 text-left">End Point</TableHead>
                <TableHead className="p-4 text-left">Payment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rides.map((ride) => (
                <TableRow key={ride.id} className="hover:bg-gray-100">
                  <TableCell className="p-4 font-medium">{ride.fare}</TableCell>
                  <TableCell className="p-4">{ride.startPoint}</TableCell>
                  <TableCell className="p-4">{ride.endPoint}</TableCell>
                  <TableCell className="p-4">
                    <Badge className="px-3 py-1 text-sm rounded-lg bg-green-500 text-white">
                      {ride.paymentStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
