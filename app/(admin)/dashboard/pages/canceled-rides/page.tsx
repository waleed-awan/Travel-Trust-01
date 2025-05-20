"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Ban,
  Car,
  DollarSign,
  Search,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Passenger = {
  firstName: string;
  lastName: string;
};

type Driver = {
  name: string;
};

type RawCanceledRide = {
  _id: string;
  passenger: Passenger;
  driver: Driver;
  fare: number;
  paymentStatus: string;
  status: string;
};

type CanceledRide = {
  id: string;
  passengerName: string;
  driverName: string;
  fare: number;
  paymentStatus: string;
  status: string;
};

export default function CanceledRides() {
  const [canceledRides, setCanceledRides] = useState<CanceledRide[]>([]);
  const [filteredRides, setFilteredRides] = useState<CanceledRide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    const fetchCanceledRides = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5090/api/v2/get-all-canceled-rides"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result: { data: RawCanceledRide[] } = await response.json();

        const rides: CanceledRide[] = result.data.map((ride) => ({
          id: ride._id,
          passengerName: `${ride.passenger.firstName} ${ride.passenger.lastName}`,
          driverName: ride.driver.name,
          fare: ride.fare,
          paymentStatus: ride.paymentStatus,
          status: ride.status,
        }));

        setCanceledRides(rides);
        setFilteredRides(rides);
      } catch (err) {
        console.error("Error fetching canceled rides:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load canceled rides");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCanceledRides();
  }, []);

  // Filter rides based on search query and filter status
  useEffect(() => {
    let filtered = [...canceledRides];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (ride) =>
          ride.passengerName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          ride.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ride.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (ride) =>
          ride.paymentStatus.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    setFilteredRides(filtered);
  }, [searchQuery, filterStatus, canceledRides]);

  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "refunded":
        return <Badge className="bg-blue-500">Refunded</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading canceled rides...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-6 text-center">
          <AlertCircle className="h-10 w-10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
          <p>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Ban className="h-8 w-8 text-red-500" />
            Canceled Rides
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage all canceled ride information
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search rides..."
              className="pl-8 w-full sm:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid" className="mb-6">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          {filteredRides.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <Ban className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No canceled rides found</p>
              {(searchQuery || filterStatus !== "all") && (
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRides.map((ride) => (
                <Card
                  key={ride.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        Ride #{ride.id.substring(0, 8)}...
                      </CardTitle>
                      {getPaymentStatusBadge(ride.paymentStatus)}
                    </div>
                    <CardDescription>
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 border-red-200"
                      >
                        {ride.status}
                      </Badge>
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {ride.passengerName}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span>{ride.driverName}</span>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-bold text-lg">
                            ${ride.fare.toFixed(2)}
                          </span>
                        </div>

                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          {filteredRides.length === 0 ? (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
              <Ban className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No canceled rides found</p>
              {(searchQuery || filterStatus !== "all") && (
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">
                        Ride ID
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Passenger
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Driver
                      </th>
                      <th className="px-4 py-3 text-left font-medium">Fare</th>
                      <th className="px-4 py-3 text-left font-medium">
                        Payment
                      </th>
                      <th className="px-4 py-3 text-left font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRides.map((ride, index) => (
                      <tr
                        key={ride.id}
                        className={`border-t ${
                          index % 2 === 0 ? "bg-muted/20" : ""
                        }`}
                      >
                        <td className="px-4 py-3 font-medium">
                          #{ride.id.substring(0, 8)}...
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {ride.passengerName}
                          </div>
                        </td>
                        <td className="px-4 py-3">{ride.driverName}</td>
                        <td className="px-4 py-3 font-medium">
                          ${ride.fare.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          {getPaymentStatusBadge(ride.paymentStatus)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 border-red-200"
                          >
                            {ride.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="text-sm text-muted-foreground text-center mt-4">
        Showing {filteredRides.length} of {canceledRides.length} canceled rides
      </div>
    </div>
  );
}
