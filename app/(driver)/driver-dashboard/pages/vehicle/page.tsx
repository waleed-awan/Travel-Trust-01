"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState({
    vehicleType: "",
    model: "",
    plateNumber: "",
    seatingCapacity: "",
    color: "",
    insuranceNumber: "",
    manufacturingYear: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch userId from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in local storage");
    }
  }, []);

  // Fetch vehicle details when userId is available
  useEffect(() => {
    if (!userId) return; // Wait for userId to be set

    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5090/api/v2/get-driver/by-id/${userId}`
        );
        if (response.data && response.data.vehicleDetails) {
          setVehicle(response.data.vehicleDetails);
        }
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [userId]); // Run when userId changes

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  // Update vehicle details
  const handleUpdate = async () => {
    if (!userId) {
      alert("User ID is missing. Cannot update vehicle details.");
      return;
    }

    try {
      setLoading(true);
      await axios.patch
      (`http://localhost:5090/api/v2/update-driver/by-id/${userId}`, {
        vehicleDetails: vehicle,
      });

      alert("Vehicle details updated successfully!");
    } catch (error) {
      console.error("Error updating vehicle details:", error);
      alert("Failed to update vehicle details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Vehicle</h1>
        <p className="text-muted-foreground">
          Manage your vehicle information and maintenance
        </p>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Vehicle Details</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>
                Details about your registered vehicle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Input
                      id="vehicleType"
                      name="vehicleType"
                      value={vehicle.vehicleType}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      name="model"
                      value={vehicle.model}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Manufacturing Year</Label>
                    <Input
                      id="year"
                      name="manufacturingYear"
                      value={vehicle.manufacturingYear}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      name="color"
                      value={vehicle.color}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plateNumber">License Plate</Label>
                    <Input
                      id="plateNumber"
                      name="plateNumber"
                      value={vehicle.plateNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurance">Insurance Number</Label>
                    <Input
                      id="insurance"
                      name="insuranceNumber"
                      value={vehicle.insuranceNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Vehicle Information"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
