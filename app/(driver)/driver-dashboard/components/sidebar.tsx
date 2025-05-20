import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Car, CreditCard, History, Home, LogOut, Settings, User, Map, CircleUser, Route, Bike } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

// Option 1: Use a type alias instead of an empty interface
type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex flex-col h-screen border-r", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/driver-dashboard" className="flex items-center gap-2 font-semibold">
          <Car className="h-6 w-6" />
          <span>Driver Dashboard</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-4">
          <NavItem href="/driver-dashboard" icon={<Home className="mr-2 h-4 w-4" />}>
            Dashboard
          </NavItem>
          <NavItem href="/driver-dashboard/pages/trip" icon={<History className="mr-2 h-4 w-4" />}>
            Trip History
          </NavItem>
          <NavItem href="/driver-dashboard/pages/earning" icon={<CreditCard className="mr-2 h-4 w-4" />}>
            Earnings
          </NavItem>
          <NavItem href="/driver-dashboard/pages/vehicle" icon={<Car className="mr-2 h-4 w-4" />}>
            Vehicle
          </NavItem>
          <NavItem href="/driver-dashboard/pages/profile" icon={<User className="mr-2 h-4 w-4" />}>
            Profile
          </NavItem>
          <NavItem href="/driver-dashboard/pages/my-routes" icon={<Map className="mr-2 h-4 w-4" />}>
            My Routes
          </NavItem>
          <NavItem href="/driver-dashboard/pages/pending-rides" icon={<Bike className="mr-2 h-4 w-4" />}>
            Pending Rides
          </NavItem>
          <NavItem href="/driver-dashboard/pages/all-rides" icon={<CircleUser className="mr-2 h-4 w-4" />}>
            All Rides
          </NavItem>
          <NavItem href="/driver-dashboard/pages/all-routes" icon={<Route className="mr-2 h-4 w-4" />}>
            Edit Routes
          </NavItem>
          <NavItem href="/driver-dashboard/pages/setting" icon={<Settings className="mr-2 h-4 w-4" />}>
            Settings
          </NavItem>
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}

function NavItem({ href, icon, children }: NavItemProps) {
  return (
    <Link href={href} className="flex">
      <Button variant="ghost" className="w-full justify-start">
        {icon}
        {children}
      </Button>
    </Link>
  )
}
