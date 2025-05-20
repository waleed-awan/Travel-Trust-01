"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Toaster, toast } from "react-hot-toast";

export function TopBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in (from localStorage)
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Logout with Confirmation
  const handleLogout = () => {
    toast((t) => (
      <div>
        <p>Are you sure you want to logout?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              localStorage.removeItem("userId");
              setIsAuthenticated(false);
              toast.success("Logged out successfully!");
            }}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] text-white py-2 md:py-3">
      <Toaster />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Right Section: Buttons & Social Links */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="flex space-x-3">
              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  className="text-sm px-4 py-2 bg-red-600 cursor-pointer text-white hover:bg-red-700 transition"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/pages/Sign-In">
                    <Button
                      variant="secondary"
                      className="text-sm px-4 py-2 border-white hover:bg-[#FFA500] cursor-pointer hover:text-white transition"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/pages/Sign-Up">
                    <Button
                      variant="default"
                      className="text-sm px-4 py-2 bg-[#FFA500] cursor-pointer text-white hover:bg-[#e69500] transition"
                    >
                      Become a Partner
                    </Button>
                  </Link>
                  <Link href="/pages/sign-up-user">
                    <Button
                      variant="secondary"
                      className="text-sm px-4 py-2 hover:bg-[#FFA500] cursor-pointer hover:text-white transition"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
