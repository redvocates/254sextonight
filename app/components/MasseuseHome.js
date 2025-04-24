"use client";
import React, { useRef, useEffect } from "react";
import MasseuseContainer from "./MasseuseContainer";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MasseuseHome() {
  const scrollRef = useRef(null);

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

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 4000); // Scrolls every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Sample masseuse data
  const masseuses = [
    { image: "/multixnxx-14 pictures-0.jpg", price: "100", location: "Nairobi", phone: "+254712345678" },
    { image: "/multixnxx-15 pictures-10 (2).jpg", price: "80", location: "Mombasa", phone: "+254798765432" },
    { image: "/multixnxx-16 pictures-14.jpg", price: "120", location: "Kisumu", phone: "+254701234567" },
    { image: "/multixnxx-Pass The Buns-10.jpg", price: "90", location: "Eldoret", phone: "+254745678901" },
    { image: "/multixnxx-14 pictures-0.jpg", price: "100", location: "Nairobi", phone: "+254712345678" },
    { image: "/multixnxx-15 pictures-10 (2).jpg", price: "80", location: "Mombasa", phone: "+254798765432" },
    { image: "/multixnxx-16 pictures-14.jpg", price: "120", location: "Kisumu", phone: "+254701234567" },
    { image: "/multixnxx-Pass The Buns-10.jpg", price: "90", location: "Eldoret", phone: "+254745678901" },
    { image: "/multixnxx-14 pictures-0.jpg", price: "100", location: "Nairobi", phone: "+254712345678" },
    { image: "/multixnxx-15 pictures-10 (2).jpg", price: "80", location: "Mombasa", phone: "+254798765432" },
    { image: "/multixnxx-16 pictures-14.jpg", price: "120", location: "Kisumu", phone: "+254701234567" },
    { image: "/multixnxx-Pass The Buns-10.jpg", price: "90", location: "Eldoret", phone: "+254745678901" },
  ];

  return (
    <section className="relative w-full bg-black text-white py-8">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Masseuse</h2>

      {/* Scroll Buttons (Placed on the sides) */}
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
          {masseuses.map((m, index) => (
            <MasseuseContainer key={index} {...m} />
          ))}
        </div>
      </div>

      {/* Show More Button */}
      <div className="text-center mt-6">
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold">
          Show More
        </button>
      </div>
    </section>
  );
}

