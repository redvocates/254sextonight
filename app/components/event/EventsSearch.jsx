'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const EventsSearch = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, [search]);
  const fetchEvents = async () => {
    try {
        const query = new URLSearchParams();
        if (search) query.append("search", search);

        const url = `/api/getmodels?${query.toString()}`;
        console.log('Request URL:', url);  // Log URL to check

        const response = await axios.get(url);
        setEvents(response.data.data);
    } catch (error) {
        console.error("Error fetching masseuse:", error);
    }
};


  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Search & Filters */}
      <div className="flex flex-row md:flex-row justify-center items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <Link href="/create-event" className="bg-black text-white p-2 rounded">
          Create Event
        </Link>
      </div>
      
      {/* Escorts List */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((m) => (
          <div key={m.slug} className="border rounded p-4 shadow-lg">
            <img src={m.imagedisplay} alt={m.username} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-bold mt-2">{m.username}</h3>
            <p className="text-sm text-gray-500">{m.description}</p>
            <p className="mt-1">Shot Price: <strong>KES {m.shot}</strong></p>
            <p>Sleepover Price: <strong>KES {m.sleepover}</strong></p>
            <p className="text-sm">{m.incalls ? "Incalls Available" : "No Incalls"} | {m.outcalls ? "Outcalls Available" : "No Outcalls"}</p>
            <p className="text-sm">{m.anal ? "Anal Services Available" : "No Anal Services"}</p>
            <p className="text-sm font-semibold">Location: {m.county}</p>
            <Link href={`/escorts/${m.slug}`} className="mt-3 block text-center bg-black text-white p-2 rounded">
              Interested
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSearch;
