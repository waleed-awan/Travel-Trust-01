"use client";
import { useState, useEffect } from "react";
import type React from "react";

import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

interface Stop {
  _id: string;
  location: string;
}

interface Route {
  _id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  stops: Stop[];
  driver: string;
}

export function BookRide() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    stops: [],
    passenger: "",
    driver: "",
    route: "",
    pickupDateTime: "",
    duration: "One-Time",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      router.push("/pages/Sign-In");
      return;
    }

    setFormData((prev) => ({ ...prev, passenger: userId }));
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5090/api/v2/get-all/routes"
        );
        if (response.data.success) {
          setRoutes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, [router]);
  const handleRouteChange = (routeId: string) => {
    const selectedRoute = routes.find((route) => route._id === routeId);
    if (selectedRoute) {
      setFormData((prev) => ({
        ...prev,
        route: routeId,
        driver: selectedRoute.driver || "",
        pickupLocation: "",
        dropoffLocation: "",
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5090/api/v2/create-ride",
        formData
      );
      setMessage(
        `Ride request has been sent successfully! Fare: ${response.data.ride.fare}RS <n /> Please! wait for the conformation email form your ride captain.`
      );
    } catch (error) {
      setMessage("Failed to book ride. Please try again.");
      console.error("Error:", error);
    }

    setLoading(false);
  };
  return (
    <div className="w-full mt-6 border max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
      <button
        onClick={() => router.push("/")}
        className="flex items-center text-gray-700 hover:text-[#FFA500] mb-4 transition-colors"
      >
        <ArrowLeft className="mr-1 h-5 w-5" />
        Back to Main Page
      </button>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Book Your Ride
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Select Route */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Route
          </label>
          <select
            className="w-full py-3 px-4 rounded-lg border"
            value={formData.route}
            onChange={(e) => handleRouteChange(e.target.value)}
          >
            <option value="">Select a Route</option>
            {routes.map((route) => (
              <option key={route._id} value={route._id}>
                {route.name} ({route.startPoint} → {route.endPoint})
              </option>
            ))}
          </select>
        </div>

        {/* Pickup and Dropoff Locations */}
        {["Pick Up Location", "Drop Off Location"].map((label, idx) => (
          <div className="space-y-2" key={idx}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <select
              className="w-full py-3 px-4 rounded-lg border"
              value={
                idx === 0 ? formData.pickupLocation : formData.dropoffLocation
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [idx === 0 ? "pickupLocation" : "dropoffLocation"]:
                    e.target.value,
                }))
              }
              disabled={!formData.route}
            >
              <option value="">Select {label}</option>
              {formData.route &&
                (() => {
                  const selectedRoute = routes.find(
                    (route) => route._id === formData.route
                  );
                  return selectedRoute
                    ? idx === 0
                      ? [
                          <option key="start" value={selectedRoute.startPoint}>
                            {selectedRoute.startPoint}
                          </option>,
                          ...selectedRoute.stops.map((stop) => (
                            <option key={stop._id} value={stop.location}>
                              {stop.location}
                            </option>
                          )),
                        ]
                      : [
                          ...selectedRoute.stops.map((stop) => (
                            <option key={stop._id} value={stop.location}>
                              {stop.location}
                            </option>
                          )),
                          <option key="end" value={selectedRoute.endPoint}>
                            {selectedRoute.endPoint}
                          </option>,
                        ]
                    : [];
                })()}
            </select>
          </div>
        ))}

        {/* Pickup Date and Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Pickup Date & Time
          </label>
          <input
            type="datetime-local"
            className="w-full py-3 px-4 rounded-lg border"
            value={formData.pickupDateTime}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                pickupDateTime: e.target.value,
              }))
            }
            required
          />
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Duration</label>
          <select
            className="w-full py-3 px-4 rounded-lg border"
            value={formData.duration}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                duration: e.target.value,
              }))
            }
          >
            <option value="One-Time">One-Time</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        {/* Driver ID (Auto-filled from route selection) */}
        <div className="space-y-2">
          <input
            type="hidden"
            className="w-full py-3 px-4 rounded-lg border"
            value={formData.driver}
            readOnly
            placeholder="Auto-filled when selecting a route"
          />
        </div>

        {/* Hidden Passenger ID (Auto-filled from localStorage) */}
        <input type="hidden" value={formData.passenger} />

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-[#FFA500] text-white py-3 rounded-lg font-medium hover:bg-[#FF8C00] transition duration-200"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Ride"}
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-6 text-center">
          <div
            className={`p-4 rounded-lg inline-block ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.split("<n />").map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>

          {message.includes("successfully") && (
            <div className="mt-4">
              <button
                onClick={() => router.push("/track-ride")}
                className="bg-[#FFA500] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#FF8C00] transition duration-200"
              >
                Track Your Ride
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
