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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DriverProfilePage() {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const [loading, setLoading] = useState(false);

  const [driver, setDriver] = useState({
    name: "",
    email: "",
    cnic: "",
    phone: "",
    licenseNumber: "",
    experienceYears: "",
    availabilityStatus: "Yes",
  });

  const [vehicle, setVehicle] = useState({
    vehicleType: "",
    model: "",
    plateNumber: "",
    seatingCapacity: "",
    color: "",
    insuranceNumber: "",
    manufacturingYear: "",
  });

  // Fetch driver's data
  useEffect(() => {
    const fetchDriverData = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5090/api/v2/get-driver/by-id/${userId}`
        );
        if (response.data) {
          setDriver({
            name: response.data.name,
            email: response.data.email,
            cnic: response.data.cnic,
            phone: response.data.phone,
            licenseNumber: response.data.licenseNumber,
            experienceYears: response.data.experienceYears,
            availabilityStatus: response.data.availabilityStatus,
          });

          if (response.data.vehicleDetails) {
            setVehicle(response.data.vehicleDetails);
          }
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, [userId]);

  // Handle personal details change
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  // Update personal details
  const updatePersonalDetails = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:5090/api/v2/update-driver/by-id/${userId}`,
        {
          name: driver.name,
          email: driver.email,
          cnic: driver.cnic,
          phone: driver.phone,
          licenseNumber: driver.licenseNumber,
          experienceYears: driver.experienceYears,
          availabilityStatus: driver.availabilityStatus,
        }
      );
      alert("Personal details updated successfully!");
    } catch (error) {
      console.error("Error updating personal details:", error);
      alert("Failed to update personal details.");
    } finally {
      setLoading(false);
    }
  };

  // Update vehicle details
  const updateVehicleDetails = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:5090/api/v2/update-driver/by-id/${userId}`,
        {
          vehicleDetails: vehicle,
        }
      );
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
        <h1 className="text-3xl font-bold tracking-tight">Driver Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal and vehicle details
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Personal Details</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle Details</TabsTrigger>
        </TabsList>

        {/* Personal Details Section */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={driver.name}
                      onChange={handlePersonalChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={driver.email}
                      onChange={handlePersonalChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnic">CNIC</Label>
                    <Input
                      id="cnic"
                      name="cnic"
                      value={driver.cnic}
                      onChange={handlePersonalChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={driver.phone}
                      onChange={handlePersonalChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      value={driver.licenseNumber}
                      onChange={handlePersonalChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experienceYears">Experience (Years)</Label>
                    <Input
                      id="experienceYears"
                      name="experienceYears"
                      value={driver.experienceYears}
                      onChange={handlePersonalChange}
                    />
                  </div>
                </div>
                <Button onClick={updatePersonalDetails} disabled={loading}>
                  {loading ? "Updating..." : "Update Personal Information"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vehicle Details Section */}
        <TabsContent value="vehicle">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>
                Update your registered vehicle details
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
                      onChange={handleVehicleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      name="model"
                      value={vehicle.model}
                      onChange={handleVehicleChange}
                    />
                  </div>
                </div>
                <Button onClick={updateVehicleDetails} disabled={loading}>
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
