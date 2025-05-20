"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

// Define TypeScript types based on API response
interface Vehicle {
  _id: string;
  name: string;
  vehicleDetails: {
    vehicleType: string;
    model: string;
    plateNumber: string;
  };
}

export default function VehiclesTable() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const router = useRouter();

  // Admin check and fetch vehicles
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "SuperAdmin") {
      router.push("/"); // Redirect to main page if not admin
      return;
    }

    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:5090/api/v2/get-all/vehicles");
        setVehicles(response.data);
      } catch {
        setError("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 mt-10"
    >
      <Card className="w-full backdrop-blur-lg bg-white/50 shadow-2xl rounded-3xl overflow-hidden border border-gray-300">
        <CardHeader className="bg-gray-800 text-white py-6 px-4 rounded-t-3xl">
          <CardTitle className="text-2xl font-bold">🚗 Available Vehicles</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          {loading ? (
            <p className="text-center text-gray-600 animate-pulse">Loading vehicles...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <Table className="w-full">
              <TableHeader className="bg-gray-100 text-gray-700 w-full">
                <TableRow>
                  <TableHead className="p-4 text-left w-1/5">👤 Owner</TableHead>
                  <TableHead className="p-4 text-left w-1/5">🚘 Type</TableHead>
                  <TableHead className="p-4 text-left w-1/5">🛠 Model</TableHead>
                  <TableHead className="p-4 text-left w-1/5">🔢 Plate</TableHead>
                  <TableHead className="p-4 text-left w-1/5">🔍 View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full">
                {vehicles.map((vehicle, index) => (
                  <motion.tr
                    key={vehicle._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`transition-all hover:bg-indigo-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <TableCell className="p-4 font-medium">{vehicle.name}</TableCell>
                    <TableCell className="p-4">{vehicle.vehicleDetails.vehicleType}</TableCell>
                    <TableCell className="p-4">{vehicle.vehicleDetails.model}</TableCell>
                    <TableCell className="p-4 font-semibold text-indigo-600">
                      {vehicle.vehicleDetails.plateNumber}
                    </TableCell>
                    <TableCell className="p-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all"
                            onClick={() => setSelectedVehicle(vehicle)}
                          >
                            <Eye size={16} /> View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="backdrop-blur-lg bg-white/80 rounded-xl shadow-lg border border-gray-300">
                          <DialogHeader>
                            <DialogTitle className="text-indigo-600">🚗 Vehicle Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-2">
                            <p><strong>👤 Owner:</strong> {selectedVehicle?.name}</p>
                            <p><strong>🚘 Type:</strong> {selectedVehicle?.vehicleDetails.vehicleType}</p>
                            <p><strong>🛠 Model:</strong> {selectedVehicle?.vehicleDetails.model}</p>
                            <p><strong>🔢 Plate Number:</strong> {selectedVehicle?.vehicleDetails.plateNumber}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
