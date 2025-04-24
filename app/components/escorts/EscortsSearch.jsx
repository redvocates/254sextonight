'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const EscortsList = () => {


useEffect(() => {

  // Set page title
  document.title = "Escorts and callgirls in your area";

  const metas = [
    { name: 'description', content: "View your neighbouring escorts" },
    { property: 'og:title', content: "View your neighbouring escorts" },
    { property: 'og:description', content: "View your neighbouring escorts" },
    { property: 'og:image', content: "/logo.png" },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content:"View your neighbouring escorts" },
    { name: 'twitter:description', content: "View your neighbouring escorts" },
    { name: 'twitter:image', content: "/logo.png" }
  ];

  metas.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name='${name}']` : `meta[property='${property}']`;
    let element = document.querySelector(selector);

    if (element) {
      element.setAttribute("content", content);
    } else {
      element = document.createElement("meta");
      if (name) element.name = name;
      if (property) element.setAttribute("property", property);
      element.content = content;
      document.head.appendChild(element);
    }
  });
}, []);


  const [escorts, setEscorts] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    fetchEscorts(); 
  }, [search, gender]);
  const fetchEscorts = async () => {
    try {
        const query = new URLSearchParams();
        if (search) query.append("search", search);
        if (gender) query.append("gender", gender);

        const url = `/api/getmodels?${query.toString()}`;
        console.log('Request URL:', url);  // Log URL to check

        const response = await axios.get(url);
        setEscorts(response.data.data);
    } catch (error) {
        console.error("Error fetching escorts:", error);
    }
};


  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Genders</option>
          <option value=" Male ">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <Link href="/register-escort" className="bg-black text-white p-2 rounded">
          Escort Registration
        </Link>
      </div>
       
      {/* Escorts List */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {escorts.map((escort) => ( 
          <div key={escort.slug} className="shadow-[0px_0px_20px_3px_rgba(255,0,0,0.5)] rounded p-4">
            <img src={escort.imagedisplay} alt={escort.username} className="w-full h-48 object-cover rounded" />
            <h3 className="text-lg font-bold mt-2">{escort.username}</h3>
            <p className="text-sm text-gray-500">{escort.description}</p>
            <p className="mt-1">Shot Price: <strong>{escort.shot || 'KES 1500'}</strong></p>
            <p>Sleepover Price: <strong>KES {escort.sleepover || 'KES 8500'}</strong></p>
            <p className="text-sm">{escort.incalls ? "Incalls Available" : "No Incalls"} | {escort.outcalls ? "Outcalls Available" : "No Outcalls"}</p>
            <p className="text-sm">{escort.anal ? "Anal Services Available" : "No Anal Services"}</p>
            <p className="text-sm font-semibold">Location: {escort.county}</p>
            <p className="text-sm bg-red-500 rounded font-semibold">Hookup Fee: kes: 1000</p>
            <Link href={`/escorts/${escort.slug}`} className="mt-3 block text-center bg-black text-red-800 p-2 rounded">
              Interested
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EscortsList;
