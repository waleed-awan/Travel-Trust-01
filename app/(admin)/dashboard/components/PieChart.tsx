"use client"

import * as React from "react"
import { Pie, PieChart, Tooltip, Cell, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const API_ENDPOINTS = {
  drivers: "http://localhost:5090/api/v2/get-all/drivers",
  users: "http://localhost:5090/api/v2/get/all-users",
  rides: "http://localhost:5090/api/v2/get-all-rides",
}

const COLORS = ["#E23670", "#2662D9", "#2EB88A"]

export function ChartPie() {
  const [data, setData] = React.useState<{ name: string; value: number }[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [driversRes, usersRes, ridesRes] = await Promise.all([
          fetch(API_ENDPOINTS.drivers).then((res) => res.json()),
          fetch(API_ENDPOINTS.users).then((res) => res.json()),
          fetch(API_ENDPOINTS.rides).then((res) => res.json()),
        ])

        setData([
          { name: "Drivers", value: driversRes.length },
          { name: "Users", value: usersRes.length },
          { name: "Rides", value: ridesRes.data.length }, // Corrected here!
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card className="flex flex-col items-center p-4">
      <CardHeader>
        <CardTitle>Plateform Data</CardTitle>
        <CardDescription>Showing Drivers, Users, and Rides</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        {loading ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          <PieChart width={350} height={350}> {/* Chart size reduced */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100} // Outer radius reduced
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  )
}
