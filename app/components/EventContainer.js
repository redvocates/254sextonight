import React from "react";

export default function EventContainer({ 
  organizer, location, banner, phone, date, 
  parking, bookingLink, entryRequirements 
}) {
  return (
    <div className="w-72 bg-gray-900 text-white rounded-lg shadow-lg p-4">
      {/* Organizer & Location */}
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold">{organizer}</h3>
        <p className="text-gray-400">{location}</p>
      </div>

      {/* Banner Image */}
      <div className="w-full h-40">
        <img 
          src={banner} 
          alt={organizer} 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Event Details */}
      <div className="mt-3 space-y-1 text-sm">
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Parking:</strong> {parking ? "✅ Available" : "❌ Not Available"}</p>
        <p><strong>Entry:</strong> {entryRequirements}</p>
        <p>
          <strong>Booking:</strong>  
          <a href={bookingLink} className="text-blue-400 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
            Click Here
          </a>
        </p>
      </div>
    </div>
  );
}
