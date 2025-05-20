"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Car,
  Truck,
  Bike,
  MapPin,
  FileText,
  Settings,
  BarChart3,
  Users,
  DollarSign,
  User,
  LogOut,
} from "lucide-react";

// Define types for driver data
interface DriverVehicle {
  type: "car" | "truck" | "bike" | "van";
  name: string;
}

interface Driver {
  name: string;
  vehicle: DriverVehicle;
}

// Sample driver data
const driverData: Driver = {
  name: "Arham Shehzad",
  vehicle: {
    type: "car",
    name: "Toyota Camry",
  },
};

// Get vehicle icon based on vehicle type
const getVehicleIcon = (type: DriverVehicle["type"]) => {
  switch (type) {
    case "car":
      return Car;
    case "truck":
      return Truck;
    case "bike":
      return Bike;
    default:
      return Car;
  }
};

interface NavItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  items?: { label: string; href: string }[];
}

// Navigation items customized for driver dashboard
const getNavItems = (driver: Driver): NavItem[] => [
  { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
  {
    icon: getVehicleIcon(driver.vehicle.type),
    label: "My Vehicle",
    href: "/dashboard/pages/vehicle",
  },
  { icon: MapPin, label: "Routes", href: "/dashboard/pages/routes" },
  { icon: User, label: "Passengers", href: "/dashboard/pages/ps" },
  {
    icon: FileText,
    label: "Trips",
    href: "#",
    items: [
      { label: "All Trips", href: "/dashboard/pages/all-trips" },
      { label: "Completed Trips", href: "/dashboard/pages/completed-trips" },
      { label: "Cancelled Trips", href: "/dashboard/pages/canceled-rides" },
    ],
  },
  {
    icon: Users,
    label: "Drivers",
    href: "#",
    items: [{ label: "All Drivers", href: "/dashboard/pages/all-drivers" }],
  },
  { icon: DollarSign, label: "Earnings", href: "/dashboard/pages/earnings" },
  { icon: Settings, label: "Settings", href: "/dashboard/pages/setting" },
];

interface SidebarProps {
  isCollapsed?: boolean;
}

const ModernSidebar: React.FC<SidebarProps> = ({
  isCollapsed: initialIsCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(initialIsCollapsed);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const router = useRouter();

  const navItems = getNavItems(driverData);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !initialIsCollapsed) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialIsCollapsed]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div
      className={`relative flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-6 z-10 rounded-full p-1 bg-white border border-gray-200"
        aria-label="Toggle sidebar"
      >
        <ChevronRight
          className={`h-4 w-4 transition-transform ${
            isCollapsed ? "" : "rotate-180"
          }`}
        />
      </button>

      <div className="flex flex-col h-full">
        <div className="p-4 pb-2 flex-shrink-0">
          <div
            className={`flex items-center gap-2 ${
              isCollapsed ? "justify-center" : "px-2"
            }`}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white font-bold text-xl">
              {driverData.name.charAt(0)}
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="font-bold text-base truncate">
                  {driverData.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {driverData.vehicle.name}
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {!item.items ? (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 text-gray-700 ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </Link>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full flex items-center ${
                        isCollapsed ? "justify-center" : "justify-between"
                      } gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 text-gray-700`}
                    >
                      <div
                        className={`flex items-center gap-3 ${
                          isCollapsed ? "justify-center" : ""
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown
                          className={`h-4 w-4 flex-shrink-0 transition-transform ${
                            openDropdowns[item.label] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    {!isCollapsed && openDropdowns[item.label] && (
                      <ul className="mt-1 ml-6 space-y-1">
                        {item.items.map((subItem) => (
                          <li key={subItem.label}>
                            <Link
                              href={subItem.href}
                              className="block rounded-lg px-3 py-1.5 hover:bg-gray-100 text-gray-600 text-sm"
                            >
                              <span className="truncate">{subItem.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 justify-center bg-red-500 text-white px-4 py-3 rounded-lg m-3 hover:bg-red-600 transition-all"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default ModernSidebar;
