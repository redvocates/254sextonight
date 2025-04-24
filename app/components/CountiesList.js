"use client";
import { useRouter } from "next/navigation";

const counties = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", 
  "Garissa", "Nyeri", "Machakos", "Kericho", "Embu", "Meru", "Narok", "Kakamega","Nanyuki"
];

export default function CountiesList() {
  const router = useRouter();

  const handleSearch = (county) => {
    router.push(`/search?q=${county}`);
  };

  return (
    <section className="bg-gray-900 text-white py-10">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">We are in...</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {counties.map((county, index) => (
            <button
              key={index}
              onClick={() => handleSearch(county)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition"
            >
              {county}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
