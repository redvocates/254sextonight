"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function WelcomeOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show overlay after 3 seconds
    const showTimer = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);

    // Auto-close after 6 seconds of being visible
    const closeTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowOverlay(false), 500); // Give time for fade-out
    }, 9000); // 3s delay + 6s visible

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  if (!showOverlay) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 transition-opacity ${
        fadeOut ? "opacity-0 duration-500" : "opacity-100 duration-500"
      }`}
    >
      <div
        className="relative w-full max-w-2xl p-6 animate-fadeIn"
        style={{ animation: "fadeIn 0.5s ease-out" }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/overlay.jpg" // Replace with your actual image path
            alt="Welcome Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative text-center text-white p-8 rounded-lg animate-pulse">
        <h1 className="text-4xl font-extrabold mb-4 text-pink-500 drop-shadow-lg">
  Welcome to <span className="text-purple-500">254Sextonight</span>
</h1>
<h1 className="text-2xl font-extrabold mb-4 text-pink-500 drop-shadow-lg">
  Are you <span className="text-red-500">18 YEARS AND OLDER!!!</span>
</h1>
<p className="text-lg italic text-white opacity-90">
  The content here is very sexual, 18 and above only  
</p>


          {/* Close Button */}
          <button
  onClick={() => {
    setFadeOut(true);
    setTimeout(() => setShowOverlay(false), 500);
  }}
  className="mt-6 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition border-2 border-purple-400 shadow-lg hover:shadow-pink-500"
>
  Im 18+ ❤️
</button>

        </div>
      </div>
    </div>
  );
}
