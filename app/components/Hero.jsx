'use client'

export default function Hero() {
    return (
      <section className="relative w-full h-screen">
        {/* Video Background */}
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover" 
          autoPlay 
          muted 
          loop
          playsInline
	  preload="auto"
        >
          <source src="/vids/background.mp4" type="video/mp4" />
        </video>
  
        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
  
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-wide">
            Jinice Tonight na 254SexTonight
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mt-4 max-w-2xl">
          🔥 254Sextonight – The SAFER way to get hooked! 💋
          Your ultimate pleasure, just a click away. 🍑🍾<br/> Lets have Pleasure tonight with 254SexTonight
          </p>
          <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-full transition">
            Explore Now
          </button>
        </div>
      </section>
    );
  }
  