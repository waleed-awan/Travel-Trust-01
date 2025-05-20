"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Save, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }).optional(),
  phone: z.string().min(10, { message: "Phone number must be valid." }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function AdminProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [adminId, setAdminId] = useState("")

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    mode: "onChange",
  })

  // Fetch Admin ID from local storage
  useEffect(() => {
    const storedAdminId = localStorage.getItem("userId")
    if (storedAdminId) setAdminId(storedAdminId)
  }, [])

  // Fetch Admin Data using Axios
  useEffect(() => {
    if (!adminId) return

    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:5090/api/v2/get-admin/by-id/${adminId}`)
        const data = response.data

        form.reset({
          name: data.userType, // Adjusted to match the correct field
          email: data.email,
          phone: data.phone,
        })
      } catch (error) {
        console.error("Error fetching admin data:", error)
        toast.error("Failed to fetch admin data")
      }
    }

    fetchAdminData()
  }, [adminId, form]) // Added 'form' to the dependency array

  // Submit Form using Axios
  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true)

    try {
      await axios.patch(
        // Removed the unused 'response' variable
        `http://localhost:5090/api/v2/update-admin/by-id/${adminId}`,
        data,
      )

      toast.success("Profile updated", {
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-10">
      <div className="container max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and profile information</p>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile information and manage your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Admin role" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="New password (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-between">
            <p className="text-sm text-muted-foreground">Last updated: March 14, 2025</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
