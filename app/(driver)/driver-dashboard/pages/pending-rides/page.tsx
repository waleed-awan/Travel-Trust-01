"use client";

import { useEffect, useState } from "react";

interface Ride {
  _id: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: number;
  fare: number;
  bookedAt: string;
}

const Page: React.FC = () => {
  const [pendingRides, setPendingRides] = useState<Ride[]>([]);

  useEffect(() => {
    const fetchRides = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5090/api/v2/rides/pending/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch pending rides.");
        const data = await response.json();
        setPendingRides(data.pendingRides);
      } catch (error) {
        console.error("Error fetching rides:", error);
      }
    };

    fetchRides();
  }, []);

  // Accept Ride Handler
  const handleAccept = async (rideId: string) => {
    const driverId = localStorage.getItem("userId");

    try {
      const response = await fetch("http://localhost:5090/api/v2/rides/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rideId, driverId }),
      });

      if (!response.ok) throw new Error("Failed to accept ride.");
      const data = await response.json();
      console.log("Ride accepted:", data);

      setPendingRides(pendingRides.filter(ride => ride._id !== rideId));
    } catch (error) {
      console.error("Error accepting ride:", error);
    }
  };

  // Cancel Ride Handler
  const handleCancel = async (rideId: string) => {
    const driverId = localStorage.getItem("userId");

    try {
      const response = await fetch("http://localhost:5090/api/v2/rides/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rideId, driverId }),
      });

      if (!response.ok) throw new Error("Failed to cancel ride.");
      const data = await response.json();
      console.log("Ride cancelled:", data);

      setPendingRides(pendingRides.filter(ride => ride._id !== rideId));
    } catch (error) {
      console.error("Error cancelling ride:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">Pending Rides</h1>

      {pendingRides.length > 0 ? (
        <ul className="space-y-6">
          {pendingRides.map(ride => (
            <li
              key={ride._id}
              className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 transition-transform hover:scale-105"
            >
              <div className="mb-4">
                <p><strong>Pickup:</strong> {ride.pickupLocation}</p>
                <p><strong>Dropoff:</strong> {ride.dropoffLocation}</p>
                <p><strong>Distance:</strong> {ride.distance} km</p>
                <p><strong>Fare:</strong> ${ride.fare.toFixed(2)}</p>
                <p><strong>Booked At:</strong> {new Date(ride.bookedAt).toLocaleString()}</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleAccept(ride._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
                >
                  Accept ✅
                </button>
                <button
                  onClick={() => handleCancel(ride._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
                >
                  Cancel ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No pending rides available.</p>
      )}
    </div>
  );
};

export default Page;
