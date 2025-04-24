'use client'

import { useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function ReportSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    reportType: "escort",
    issueType: "scam",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/report", formData, { headers: {
        'Content-Type': 'application/json'
      }});
      alert("Report submitted successfully! You will receive an email confirmation.");
      setIsOpen(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        reportType: "escort",
        issueType: "scam",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit the report. Please try again.");
    }
  };

  return (
    <section id="report" className="p-6 text-white bg-gray-900 text-center">
      <h2 className="text-3xl font-bold">Report an Issue</h2>
      <p className="mt-2">Legit and true reports will receive rewards.</p>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
      >
        Report Now
      </button>

      {isOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg max-w-md w-full text-black">
            <div
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </div>
            <div className="relative w-full h-32 mb-4">
              <Image src="/multixnxx-15 pictures-0 (1).jpg" alt="Report Background" layout="fill" objectFit="cover" className="rounded-lg opacity-60" />
            </div>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" className="w-full p-2 border mb-2" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" placeholder="Email" className="w-full p-2 border mb-2" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input type="text" placeholder="Phone" className="w-full p-2 border mb-2" required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              <input type="text" placeholder="Location" className="w-full p-2 border mb-2" required onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
              <select className="w-full p-2 border mb-2" required onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}>
                <option value="escort">Escort</option>
                <option value="event">Event</option>
                <option value="masseuse">Masseuse</option>
              </select>
              <select className="w-full p-2 border mb-2" required onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}>
                <option value="scam">Scam</option>
                <option value="impersonation">Impersonation</option>
                <option value="fraud">Fraud</option>
                <option value="assault">Assault</option>
                <option value="harassment">Harassment</option>
                <option value="misleading-info">Misleading Information</option>
              </select>
              <textarea placeholder="Describe the issue..." className="w-full p-2 border mb-2" required onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
              <button type="submit" className="w-full bg-red-600 p-2 rounded-md hover:bg-red-700 transition">Submit Report</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
