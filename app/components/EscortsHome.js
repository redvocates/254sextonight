"use client";
import React, { useRef, useState, useEffect } from "react";
import EscortContainer from "./EscortContainer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from 'axios';
import Link from "next/link";

export default function EscortsHome() {
  const scrollRef = useRef(null);
  const [escorts, setEscorts] = useState([]);

  // Scroll function
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ 
        left: direction === "left" ? -scrollAmount : scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  //Fetch escorts
  // ✅ Define fetch function outside useEffect
  const fetchEscorts = async () => {
    try {
      const url = '/api/getmodels';
      console.log('Request URL:', url);
      const response = await axios.get(url);
      setEscorts(response.data.data);
    } catch (error) {
      console.error("Error fetching escorts:", error);
    }
  };

  // ✅ Now safely call fetchEscorts inside useEffect
  useEffect(() => {
    fetchEscorts(); 
  }, []);





  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 10000); // Scrolls every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (!escorts.length) {
    return <h2 className="text-2xl bg-black text-red-400 md:text-3xl font-bold text-center mb-6">Loading Escorts...</h2>;
  }
  
  return (
    <section className="relative w-full bg-black text-white py-8">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Escorts</h2>

      {/* Scroll Buttons (Side Navigation) */}
      <button 
        onClick={() => scroll("left")} 
        className="absolute left-2 top-1/2 z-4 transform -translate-y-1/2 p-3 bg-gray-800 rounded-full"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={() => scroll("right")} 
        className="absolute right-2 top-1/2 z-4 transform -translate-y-1/2 p-3 bg-gray-800 rounded-full"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel */}
      <div className="relative overflow-x-auto px-6 py-4">
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {escorts.map((escort, index) => (
            <EscortContainer key={index} {...escort} />
          ))}
        </div>
      </div>

      {/* Show More Button */}
      <div className="text-center mt-6">
        <Link href={'/escorts'} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold">
          Show More
        </Link>
      </div>
    </section>
  )};
