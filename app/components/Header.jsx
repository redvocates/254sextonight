
"use client";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-lg w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Name */}
        <Link href={"/"} className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="254sextonight Logo"
            className="w-12 h-12 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] animate-pulse hover:drop-shadow-[0_0_15px_rgba(255,0,0,1)] transition"
          />
          <h1 className="text-3xl font-bold tracking-wide drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] animate-pulse hover:drop-shadow-[0_0_15px_rgba(255,0,0,1)] transition">
            254SexTonight
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex text-red-600 space-x-6 items-center">
          <a href="/escorts" className="hover:text-gray-400 transition">Escorts</a>
          <a href="/events" className="hover:text-gray-400 transition">Events</a>
          <a href="/masseuse" className="hover:text-gray-400 transition">Masseuse</a>
          <a href="/register-escort" className="hover:text-gray-400 transition">Register Escort</a>
          <a href="/create-event" className="hover:text-gray-400 transition">Create Event</a>
          <a href="/register-masseuse" className="hover:text-gray-400 transition">Register Masseuse</a>
          <a href="/#report" className="hover:text-gray-400 transition">Report</a>
          <a href="/contact-us" className="hover:text-gray-400 transition">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-gray-900 text-white w-full fixed left-0 top-16 z-50">
          <a href="/escorts" className="block px-6 py-3 border-b border-gray-800">Escorts</a>
          <a href="/events" className="block px-6 py-3 border-b border-gray-800">Events</a>
          <a href="/masseuse" className="block px-6 py-3 border-b border-gray-800">Masseuse</a>
          <a href="/register-escort" className="block px-6 py-3 border-b border-gray-800">Register Escort</a>
          <a href="/create-event" className="block px-6 py-3 border-b border-gray-800">Create Event</a>
          <a href="/register-masseuse" className="block px-6 py-3 border-b border-gray-800">Register Masseuse</a>
          <a href="/#report" className="block px-6 py-3 border-b border-gray-800">Report</a>
          <a href="/contact-us" className="block px-6 py-3">Contact</a>
        </nav>
      )}
    </header>
  );
}
