  "use client";

  import { useState } from "react";
  import Link from "next/link";
  import { TopBar } from "./top-bar";

  export function MainNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <nav className="bg-white fixed w-full z-20 shadow-md">
        <TopBar />
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FFA500] rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 16H9m10.45-7.27-.88-.88a1.08 1.08 0 0 0-1.1-.26l-2.23.75a1.08 1.08 0 0 0-.74.74l-.75 2.23a1.08 1.08 0 0 0 .26 1.1l.88.88a1.06 1.06 0 0 1 .31.75v1.5a1.06 1.06 0 0 1-.31.75l-.88.88a1.08 1.08 0 0 0-.26 1.1l.75 2.23c.12.35.39.62.74.74l2.23.75c.39.13.82.03 1.1-.26l.88-.88a1.06 1.06 0 0 1 .75-.31h1.5a1.06 1.06 0 0 1 .75.31l.88.88c.28.29.71.39 1.1.26l2.23-.75c.35-.12.62-.39.74-.74l.75-2.23c.13-.39.03-.82-.26-1.1l-.88-.88a1.06 1.06 0 0 1-.31-.75v-1.5a1.06 1.06 0 0 1 .31-.75l.88-.88c.29-.28.39-.71.26-1.1l-.75-2.23a1.08 1.08 0 0 0-.74-.74l-2.23-.75a1.08 1.08 0 0 0-1.1.26l-.88.88a1.06 1.06 0 0 1-.75.31h-1.5a1.06 1.06 0 0 1-.75-.31Z" />
                  <path d="m7 9 .01.01M7 4l.01.01M3 9l.01.01M3 4l.01.01M7 14l.01.01M3 14l.01.01M10.17 12l-2.3-2.3" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-800">
                TravelTrust
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="#home" className="text-[#FFA500] font-medium">
                Home
              </Link>
              <Link
                href="#about"
                className="text-gray-600  hover:text-[#FFA500] transition-colors font-medium"
              >
                About
              </Link>
              {/* Replace the Taxi dropdown with a simple link */}
            

              {/* Replace the Service dropdown with a simple link */}
              <Link
                href="#services"
                className="text-gray-600 hover:text-[#FFA500] transition-colors font-medium"
              >
                Service
              </Link>
              <Link
                href="#contact"
                className="text-gray-600 hover:text-[#FFA500] transition-colors font-medium"
              >
                Contact
              </Link>

              <Link href={"/pages/book-your-ride"} className="bg-[#FFA500] hover:bg-[#FF9000] text-white font-medium px-6 py-2.5 cursor-pointer rounded-lg transition-colors">
                BOOK NOW
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-600 hover:text-[#FFA500] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M4 12h16M4 6h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link href="#home" className="text-[#FFA500] font-medium">
                  Home
                </Link>
                <Link
                  href="#about"
                  className="text-gray-600 hover:text-[#FFA500] transition-colors"
                >
                  About
                </Link>
                {/* Replace the Taxi dropdown with a simple link */}
              

                {/* Replace the Service dropdown with a simple link */}
                <Link
                  href="#services"
                  className="text-gray-600 hover:text-[#FFA500] transition-colors"
                >
                  Service
                </Link>
                
                
                <Link
                  href="#contact"
                  className="text-gray-600 hover:text-[#FFA500] transition-colors"
                >
                  Contact
                </Link>
                <Link href={"/pages/book-your-ride"} className="bg-[#FFA500] hover:bg-[#FF9000] text-white font-medium py-2 cursor-pointer rounded-lg transition-colors">
                  BOOK NOW
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }
