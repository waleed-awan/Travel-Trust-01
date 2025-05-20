"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowUpDown, User, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Passenger {
  _id: string
  firstName?: string // Making name optional since it might be undefined
  email: string
  phone: string
}

type SortField = "name" | "email" | "phone"
type SortDirection = "asc" | "desc"

export default function PassengersTable() {
  const [passengers, setPassengers] = useState<Passenger[]>([])
  const [filteredPassengers, setFilteredPassengers] = useState<Passenger[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await axios.get<{ data: Passenger[] }>("http://localhost:5090/api/v2/get/all-users")
        // Assuming the API returns { data: [...passengers] }
        const passengersData = response.data.data || response.data
        setPassengers(passengersData)
        setFilteredPassengers(passengersData)
      } catch (err) {
        console.error("Error fetching passengers:", err)
        setError("Failed to fetch passengers. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPassengers()
  }, [])

  // Filter passengers based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPassengers([...passengers])
    } else {
      const filtered = passengers.filter(
        (passenger) =>
          passenger.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          false ||
          passenger.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          passenger.phone.includes(searchQuery),
      )
      setFilteredPassengers(filtered)
    }
  }, [searchQuery, passengers])

  // Sort passengers
  useEffect(() => {
    const sorted = [...filteredPassengers].sort((a, b) => {
      // Handle each sort field explicitly to avoid TypeScript error
      let valueA = ""
      let valueB = ""

      if (sortField === "name") {
        valueA = a.firstName?.toLowerCase() || ""
        valueB = b.firstName?.toLowerCase() || ""
      } else if (sortField === "email") {
        valueA = a.email.toLowerCase()
        valueB = b.email.toLowerCase()
      } else if (sortField === "phone") {
        valueA = a.phone.toLowerCase()
        valueB = b.phone.toLowerCase()
      }

      if (sortDirection === "asc") {
        return valueA.localeCompare(valueB)
      } else {
        return valueB.localeCompare(valueA)
      }
    })

    setFilteredPassengers(sorted)
  }, [sortField, sortDirection,filteredPassengers])

  // Handle sort click
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Function to safely get initials from name
  const getInitials = (name?: string): string => {
    if (!name) return "?"

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading passengers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 text-center">
          <p className="font-medium">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-2 text-sm underline">
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Passengers List</h1>
          <p className="text-muted-foreground mt-1">View and manage passenger information</p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search passengers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredPassengers.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          {searchQuery ? (
            <div>
              <p className="text-muted-foreground">No passengers match your search</p>
              <button onClick={() => setSearchQuery("")} className="mt-2 text-sm text-primary underline">
                Clear search
              </button>
            </div>
          ) : (
            <p className="text-muted-foreground">No passengers found</p>
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead className="w-[250px] bg-primary/5">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="flex items-center gap-1 font-medium p-0 h-auto"
                  >
                    <User className="h-4 w-4 mr-1 text-primary" />
                    <span className="font-bold text-primary">Passenger Name</span>
                    <ArrowUpDown className="h-3 w-3 text-muted-foreground ml-1" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("email")}
                    className="flex items-center gap-1 font-medium p-0 h-auto"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                    <ArrowUpDown className="h-3 w-3 text-muted-foreground ml-1" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("phone")}
                    className="flex items-center gap-1 font-medium p-0 h-auto"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Phone
                    <ArrowUpDown className="h-3 w-3 text-muted-foreground ml-1" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPassengers.map((passenger, index) => (
                <TableRow key={passenger._id} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium bg-primary/5">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {getInitials(passenger.firstName)}
                      </div>
                      <div>
                        {passenger.firstName || "Unnamed Passenger"}
                        <Badge variant="outline" className="ml-2 bg-primary/10 text-xs">
                          Passenger
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{passenger.email}</TableCell>
                  <TableCell>{passenger.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="mt-6 text-sm text-muted-foreground text-center">
        Total passengers: {filteredPassengers.length}
        {searchQuery && passengers.length !== filteredPassengers.length && ` (filtered from ${passengers.length})`}
      </div>
    </div>
  )
}

