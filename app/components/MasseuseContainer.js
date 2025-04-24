import React from "react";

export default function MasseuseContainer({ image, price, location, phone }) {
  return (
    <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg w-72 md:w-80 flex-shrink-0">
      {/* Price & Location */}
      <div className="bg-black bg-opacity-60 px-4 py-2 text-sm flex space-between rounded-br-2xl">
        <span>Kes: {price}</span> - <span>{location}</span>
      </div>

      {/* Banner Image */}
      <img src={image} alt="Masseuse" className="w-full h-48 object-cover" />

      {/* Phone Number */}
      <div className="bg-black text-center py-2 text-sm md:text-base font-bold">
        {phone}
      </div>
    </div>
  );
}
