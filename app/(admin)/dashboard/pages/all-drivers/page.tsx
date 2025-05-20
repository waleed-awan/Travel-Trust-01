"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

// Define TypeScript types based on API response
interface Booking {
  _id: string;
  name: string;
  email: string;
  cnic: string;
  approvedStatus: "Pending" | "Approved" | "Rejected";
}

// Status Badge Colors
const statusColor: Record<Booking["approvedStatus"], string> = {
  Approved: "bg-green-500 text-white",
  Pending: "bg-yellow-500 text-white",
  Rejected: "bg-red-500 text-white",
};

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Fetch Bookings Data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5090/api/v2/get-all/drivers"
        ); // Adjust API URL
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to update approval status
  const handleUpdateStatus = async (
    id: string,
    newStatus: "Pending" | "Approved" | "Rejected"
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:5090/api/v2/approve-status/${id}`,
        {
          approvedStatus: newStatus,
        }
      );

      if (response.status === 200) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id
              ? { ...booking, approvedStatus: newStatus }
              : booking
          )
        );
      }
    } catch {
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <Card className="backdrop-blur-lg bg-white/60 shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">
          All Drivers
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center text-gray-500">Loading bookings...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Table className="w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="p-4 text-left">Passenger</TableHead>
                <TableHead className="p-4 text-left">Email</TableHead>
                <TableHead className="p-4 text-left">CNIC</TableHead>
                <TableHead className="p-4 text-left">Status</TableHead>
                <TableHead className="p-4 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking, index) => (
                <TableRow
                  key={booking._id}
                  className={`transition-all hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <TableCell className="p-4 font-medium">
                    {booking.name}
                  </TableCell>
                  <TableCell className="p-4">{booking.email}</TableCell>
                  <TableCell className="p-4">{booking.cnic}</TableCell>
                  <TableCell className="p-4">
                    <Badge
                      className={`px-3 py-1 text-sm rounded-lg ${
                        statusColor[booking.approvedStatus]
                      }`}
                    >
                      {booking.approvedStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4 flex gap-2">
                    {/* View Button with Modal */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye size={16} /> View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Booking Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                          <p>
                            <strong>Passenger:</strong> {selectedBooking?.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {selectedBooking?.email}
                          </p>
                          <p>
                            <strong>CNIC:</strong> {selectedBooking?.cnic}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            {selectedBooking?.approvedStatus}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Status Update Dropdown */}
                    <select
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                      value={booking.approvedStatus}
                      onChange={(e) =>
                        handleUpdateStatus(
                          booking._id,
                          e.target.value as "Pending" | "Approved" | "Rejected"
                        )
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
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
