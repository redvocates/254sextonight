"use client";
import React, { useRef, useEffect } from "react";
import EventContainer from "./EventContainer";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventsHome() {
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

  // Sample events data
  const events = [
    { 
      organizer: "Luxury Nightlife", location: "Westlands, Nairobi", 
      banner: "/multixnxx-14 pictures-10.jpg", phone: "+254 700 123456", 
      date: "March 15, 2025", parking: true, 
      bookingLink: "https://example.com/book1", 
      entryRequirements: "VIP Only, Dress Code: Elegant"
    },
    { 
      organizer: "Coastal Vibes", location: "Diani Beach, Mombasa", 
      banner: "/multixnxx-14 pictures-10.jpg", phone: "+254 722 987654", 
      date: "April 10, 2025", parking: false, 
      bookingLink: "https://example.com/book2", 
      entryRequirements: "18+ Only, No Sneakers"
    },
    { 
      organizer: "Exclusive Parties", location: "Karen, Nairobi", 
      banner: "/multixnxx-14 pictures-10.jpg", phone: "+254 711 456789", 
      date: "May 5, 2025", parking: true, 
      bookingLink: "https://example.com/book3", 
      entryRequirements: "Invitation Only, Formal Wear"
    },
    { 
        organizer: "Luxury Nightlife", location: "Westlands, Nairobi", 
        banner: "/multixnxx-14 pictures-10.jpg", phone: "+254 700 123456", 
        date: "March 15, 2025", parking: true, 
        bookingLink: "https://example.com/book1", 
        entryRequirements: "VIP Only, Dress Code: Elegant"
      },
      { 
        organizer: "Coastal Vibes", location: "Diani Beach, Mombasa", 
        banner: "/multixnxx-14 pictures-10.jpg", phone: "+254 722 987654", 
        date: "April 10, 2025", parking: false, 
        bookingLink: "https://example.com/book2", 
        entryRequirements: "18+ Only, No Sneakers"
      },
      { 
        organizer: "Exclusive Parties", location: "Karen, Nairobi", 
        banner: "/multixnxx-14 pictures-10.jpg", phone: "+254 711 456789", 
        date: "May 5, 2025", parking: true, 
        bookingLink: "https://example.com/book3", 
        entryRequirements: "Invitation Only, Formal Wear"
      }
  ];

  return (
    <section className="relative w-full bg-black text-white py-8">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Events</h2>

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
          {events.map((event, index) => (
            <EventContainer key={index} {...event} />
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
