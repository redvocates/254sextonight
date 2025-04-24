'use client'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo & Name */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <img src="/logo.png" alt="254WetPussy Logo" className="w-16 h-16" />
          <h2 className="text-lg font-bold">254SexTonight</h2>
        </div>

        {/* Links Section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <a href="https://t.me/Sextonight254" className="hover:text-red-500 transition">Telegram Channel</a>
          <a href="https://t.me/+xRwOwTsvAtcwYTg0" className="hover:text-red-500 transition">Telegram Channel</a>
          <a href="https://wa.me/254751173621" className="hover:text-green-500 transition">WhatsApp</a>
          <a href="mailto:254sextonight@gmail.com" className="hover:text-blue-500 transition">Email Us</a>
          <a href="tel:+254751173621" className="hover:text-yellow-500 transition">Call Us</a>
        </div>

        {/* Subscription Form */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold">Subscribe for Updates</h3>
          <input type="text" placeholder="Your Name" className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-700" />
          <input type="tel" placeholder="Your Number" className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-700" />
          <input type="email" placeholder="Your Email" className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-700" />
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold">Subscribe</button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center">
        <img src="/logo.png" alt="254SexTonight Logo" className="w-12 h-12 mx-auto mb-2" />
        <p className="text-sm">&copy; {new Date().getFullYear()} 254SexTonight. All rights reserved.</p>
        <p className="text-xs">
          Managed by <a href="https://pleasureparadise.sbs" className="text-pink-500 hover:underline">Pleausre Paradise</a>
        </p>
      </div>
    </footer>
  );
}
