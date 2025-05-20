import Link from "next/link"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ResponsiveFooter() {
  return (
    <footer className="bg-black text-white w-full">
      {/* Checkerboard Pattern */}
      <div className="h-4 sm:h-6 bg-[url('/checkerboard-pattern.png')] bg-repeat-x w-full"></div>

      {/* Footer Main Section - Increased horizontal padding and gap */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-44 gap-y-8">
        {/* Logo & Info - Increased horizontal spacing */}
        <div className="space-y-4">
          <div className="flex items-center gap-5">
            {/* Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 16H9m10.45-7.27-.88-.88a1.08 1.08 0 0 0-1.1-.26l-2.23.75a1.08 1.08 0 0 0-.74.74l-.75 2.23a1.08 1.08 0 0 0 .26 1.1l.88.88a1.06 1.06 0 0 1 .31.75v1.5a1.06 1.06 0 0 1-.31.75l-.88.88a1.08 1.08 0 0 0-.26 1.1l.75 2.23c.12.35.39.62.74.74l2.23.75c.39.13.82.03 1.1-.26l.88-.88a1.06 1.06 0 0 1 .75-.31h1.5a1.06 1.06 0 0 1 .75.31l.88.88c.28.29.71.39 1.1.26l2.23-.75c.35-.12.62-.39.74-.74l.75-2.23c.13-.39.03-.82-.26-1.1l-.88-.88a1.06 1.06 0 0 1-.31-.75v-1.5a1.06 1.06 0 0 1 .31-.75l.88-.88c.29-.28.39-.71.26-1.1l-.75-2.23a1.08 1.08 0 0 0-.74-.74l-2.23-.75a1.08 1.08 0 0 0-1.1.26l-.88.88a1.06 1.06 0 0 1-.75.31h-1.5a1.06 1.06 0 0 1-.75-.31Z" />
            </svg>
            <h2 className="text-lg sm:text-xl font-bold text-yellow-400">TravelTrust</h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base pr-4">
            We are many variations of passages available but the majority have suffered alteration in some form.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-6 text-yellow-400">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-sm sm:text-base">+92 305 4740764</span>
            </div>
            <div className="flex items-center gap-6 text-yellow-400">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-sm sm:text-base">Hi-Tech University Taxilla Islamabad</span>
            </div>
            <div className="flex items-center gap-6 text-yellow-400">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-sm sm:text-base">arhamshahzad957@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links - Added more horizontal padding */}
        <div className="space-y-4 px-4 sm:px-8">
          <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
          <div className="h-0.5 w-10 bg-yellow-400 mb-4"></div>
          <ul className="space-y-3">
            <li>
              <Link
                href="#about"
                className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#services"
                className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base"
              >
                Services
              </Link>
            </li>
            <li>
              <Link href="#FAQ" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                Why Choose Us
              </Link>
            </li>
            <li>
              <Link
                href="#quote"
                className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Center - Added more horizontal padding */}
        <div className="space-y-4 px-4 sm:px-8">
          <h3 className="text-base sm:text-lg font-semibold">Support</h3>
          <div className="h-0.5 w-10 bg-yellow-400 mb-4"></div>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                FAQ&apos;s
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                Book a Ride
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section - Increased horizontal spacing */}
      <div className="bg-gray-900 py-4 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-center text-sm sm:text-base">
            © Copyright 2025 <span className="text-yellow-400">TravelTrust</span> All Rights Reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" aria-label="Facebook">
              <FaFacebookF className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-yellow-400 transition-colors" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-yellow-400 transition-colors" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-yellow-400 transition-colors" />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-yellow-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
