"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"
import { Car, CreditCard, History, Home, Menu, Settings, User, CircleUser , Map , Bike, Route} from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-14 items-center border-b px-4 md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 sm:w-72">
          <div className="flex h-14 items-center px-4">
            <Link href="/driver-dashbaord" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
              <Car className="h-6 w-6" />
              <span>Driver Dashboard</span>
            </Link>
          </div>
          <div className="space-y-1 py-4">
            <MobileNavItem href="/driver-dashboard" icon={<Home className="mr-2 h-4 w-4" />} setOpen={setOpen}>
              Dashboard
            </MobileNavItem>
            <MobileNavItem href="/driver-dashboard/pages/trip" icon={<History className="mr-2 h-4 w-4" />} setOpen={setOpen}>
              Trip History
            </MobileNavItem>
            <MobileNavItem href="/driver-dashboard/pages/earning" icon={<CreditCard className="mr-2 h-4 w-4" />} setOpen={setOpen}>
              Earnings
            </MobileNavItem>
            <MobileNavItem href="/driver-dashboard/pages/vehicle" icon={<Car className="mr-2 h-4 w-4" />} setOpen={setOpen}>
              Vehicle
            </MobileNavItem>
            <MobileNavItem href="/driver-dashboard/pages/profile" icon={<User className="mr-2 h-4 w-4" />} setOpen={setOpen}>
              Profile
            </MobileNavItem>
            <MobileNavItem href="/driver-dashboard/pages/my-routes" icon={<Map className="mr-2 h-4 w-4" />} setOpen={setOpen}>
              My Routes
            </MobileNavItem>
            <MobileNavItem href="/driver-dashboard/pages/pending-rides" icon={<Bike className="mr-2 h-4 w-4" />} setOpen={setOpen}>
              Pending Rides
            </MobileNavItem>
            <MobileNavItem href="/driver-dashboard/pages/all-rides" icon={<CircleUser className="mr-2 h-4 w-4" />} setOpen={setOpen}>
              All Rides
            </MobileNavItem>
            <MobileNavItem href="/driver-dashboard/pages/all-routes" icon={<Route className="mr-2 h-4 w-4" />} setOpen={setOpen}>
              Edit Routes
            </MobileNavItem>
            <MobileNavItem href="/driver-dashboard/pages/setting" icon={<Settings className="mr-2 h-4 w-4" />} setOpen={setOpen}>
              Settings
            </MobileNavItem>
          </div>
          <div className="absolute bottom-4 left-4">
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Car className="h-6 w-6" />
        <span>Driver Dashboard</span>
      </Link>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </div>
  )
}

interface MobileNavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  setOpen: (open: boolean) => void
}

function MobileNavItem({ href, icon, children, setOpen }: MobileNavItemProps) {
  return (
    <Link href={href} onClick={() => setOpen(false)}>
      <Button variant="ghost" className="w-full justify-start">
        {icon}
        {children}
      </Button>
    </Link>
  )
}

