import Link from "next/link";
import React from "react";

export default function EscortContainer({ 
  username, county, imagedisplay,
  gender, location, incalls, outcalls, anal, slug 
}) {


  return (
    <Link href={`/escorts/${slug}`} className="min-w-45 w-72 bg-gray-900 text-white rounded-lg shadow-lg p-4">
      {/* Username & County */}
      <div className="text-center mb-2">
        <h3 className="text-lg font-bold">{username}</h3>
        <p className="text-gray-400">{county}</p>
      </div>

      {/* Image */}
      <div className="w-full h-40">
        <img 
          src={imagedisplay} 
          alt={username} 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Details */}
      <div className="mt-3 space-y-1 text-sm">
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Outcalls:</strong> {outcalls ? "✅ Yes" : "❌ No"}</p>
        <p><strong>Incalls:</strong> {incalls ? "✅ Yes" : "❌ No"}</p>
        <p><strong>Anal:</strong> {anal ? "✅ Yes" : "❌ No"}</p>
      </div>
    </Link>
  );
}
