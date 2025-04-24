'use client';

import Image from 'next/image';

export default function ContactUs() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/multixnxx-14 pictures-0 (1).jpg" 
          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-30"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-2xl p-6 bg-black bg-opacity-80 rounded-2xl shadow-lg text-center">
        {/* Glowing Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-red-500 animate-pulse">
          254SexTonight
        </h1>
        
        {/* Contact Details */}
        <div className="mt-6 space-y-4 text-lg">
          <p><span className="font-semibold text-red-400">Company Number:</span> +254 751173621</p>
          <p><span className="font-semibold text-red-400">Email:</span> 254sextonight@gmail.com</p>
          <p><span className="font-semibold text-red-400">Location:</span> Nairobi, Kenya</p>
          
          {/* Links */}
          <div className="flex flex-col space-y-3 mt-4">
            <a href="https://wa.me/254751173621" className="text-green-400 hover:text-green-300 transition">WhatsApp: Chat Now</a>
            <a href="https://t.me/@Sextonight254" className="text-blue-400 hover:text-blue-300 transition">Telegram: Join Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}


