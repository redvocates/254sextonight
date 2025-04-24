'use client';

import { useState, useEffect } from 'react';
//import axios from 'axios';

import { Upload } from '../Upload';
import Link from 'next/link';

const CreateEscort = () => {


useEffect(() => {

  // Set page title
  document.title = "Escort Registration Form";

  const metas = [
    { name: 'description', content: "Register as an escort" },
    { property: 'og:title', content: "Escort Registration Form" },
    { property: 'og:description', content: "Escort Registration Form" },
    { property: 'og:image', content: "/logo.png" },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content:"Escort Registration Form" },
    { name: 'twitter:description', content: "Escort Registration Form" },
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


  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    phonenumber: '',
    fine:0,
    idnumber: '',
    yearofbirth: '',
    email: '',
    gender: '', 
    description: '',
    shot: '', 
    sleepover: '',
    incalls: false,
    outcalls: false,
    anal: false,
    country: 'Kenya', // default country
    county: '',
    detailedlocation: '',
    imagedisplay: '',
    nationalproof: '',
    verified:false
    // Add all other fields as required
  });

  const [accepted, setAccepted] = useState(false); // For rules acceptance
  const [imagePreview, setImagePreview] = useState(null); // For previewing uploaded image
const [imagePrev, setImagePrev] = useState(null); // For previewing uploaded image
  const [uploading, setUploading] = useState(false); // To track upload status
  const [paymentStep, setPaymentStep] = useState(false); // To handle the waiting screen for payment
  const [paymentUrl, setPaymentUrl] = useState(''); // URL to Pesapal payment page
  const [showPopup, setShowPopup] = useState(false); // To control the display of the popup
  const [escortSlug, setEscortSlug] = useState(''); // Store slug for redirection
  


  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle image upload to Cloudinary
const handleImageUpload = async (e) => {
  setUploading(true);
  const file = e.target.files[0];
  try {
    const imageUrl = await Upload(file);
    setFormData(prev => ({ ...prev, imagedisplay: imageUrl }));
    setImagePreview(imageUrl); // Update the preview with the uploaded image URL
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Failed to upload image. Please try again.');
  }
  setUploading(false);
};

const handleProofUpload = async (e) => {
  setUploading(true);
  const file = e.target.files[0];
  try {
    const proofUrl = await Upload(file);
    setFormData(prev => ({ ...prev, nationalproof: proofUrl }));
	setImagePrev(proofUrl); // Update the preview with the uploaded image URL
  } catch (error) {
    console.error('Error uploading proof:', error);
    alert('Failed to upload proof. Please try again.');
  }
  setUploading(false);
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
      // Show the popup after form submission
  setShowPopup(true);
  

    // Generate slug from the form data
    const slug = `${formData.username}-in-${formData.county}-${formData.country}-${formData.detailedlocation}-${new Date().getTime()}`;
    setEscortSlug(slug); // Save slug for redirection


    // Add slug to form data
    const escortData = { ...formData, slug };
    console.log("Sending Data:", escortData);
    // Send form data to the API (backend)
    try {

      //const response = await axios.post("/api/registerescort", escortData);

      const response = await fetch("/api/registerescort", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(escortData),
      });
  
      //const result = await response.json();
  

      if (response.ok) {  //response.data.success
        // Payment step: assuming the response includes a payment URL from Pesapal
        setPaymentUrl(response.data.paymentUrl); // Example: Pesapal URL for payment
        setPaymentStep(true); // Show the payment page
      } else {
        alert('Error during registration. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('There was an error with registration.');
    }
  };

  // Handle rules acceptance
  const handleAcceptRules = () => {
    setAccepted(true);
  };

  // Handle payment confirmation
  const handlePaymentConfirmation = () => {
    setShowPopup(false); // Hide the waiting popup after payment
    alert('Payment Successful! Escort registration completed.');
    if (escortSlug) {
      window.location.href = `/escorts/${escortSlug}`;
    } else {
      window.location.reload(); // Refresh if no slug is found
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-lg p-8 space-y-6 bg-opacity-75 bg-black rounded-lg">
        {/* Rules Screen */}
        {!accepted && !paymentStep ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Escort Registration Rules</h2>
            <ul className="space-y-2 text-lg">
              <li>1. You agree to pay a registration fee of 500 KES.</li>
              <li>2. Ensure your details are accurate and truthful.</li>
              <li>3. Your profile will be verified upon submission.</li>
              <li>4. You have read and understood the <Link href={'/tnc'} alt='Terms and conditions' className='text-blue-600' >Terms & Conditions</Link></li>
            </ul>
            <button
              onClick={handleAcceptRules}
              className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold"
            >
              Accept & Continue
            </button>
          </div>
        ) : paymentStep ? (
          // Payment Waiting Screen
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Please Complete Your Payment</h2>
            <p className="text-lg text-center">You are now being redirected to Pesapal for payment.</p>
            <div className="flex justify-center">
              <button
                className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold"
                onClick={handlePaymentConfirmation}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        ) : (
          // Form Screen
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Escort Registration Form</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium">Username (Pseudonym)</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="phonenumber" className="block text-sm font-medium">Phone Number</label>
                <input
                  type="number"
                  id="phonenumber"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="idnumber" className="block text-sm font-medium">National ID or Passport Number</label>
                <input
                  type="text"
                  id="idnumber"
                  name="idnumber"
                  value={formData.idnumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="yearofbirth" className="block text-sm font-medium">Year of Birth</label>
                <input
                  type="number"
                  id="yearofbirth"
                  name="yearofbirth"
                  value={formData.yearofbirth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="shot" className="block text-sm font-medium">Price per Shot</label>
                <input
                  type="number"
                  id="shot"
                  name="shot"
                  value={formData.shot}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="sleepover" className="block text-sm font-medium">Price per Sleepover</label>
                <input
                  type="number"
                  id="sleepover"
                  name="sleepover"
                  value={formData.sleepover}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="incalls" className="block text-sm font-medium">Do you Host?</label>
                <input
                  type="checkbox"
                  id="incalls"
                  name="incalls"
                  checked={formData.incalls}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="outcalls" className="block text-sm font-medium">Do you Travel?</label>
                <input
                  type="checkbox"
                  id="outcalls"
                  name="outcalls"
                  checked={formData.outcalls}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="anal" className="block text-sm font-medium">Offer Anal?</label>
                <input
                  type="checkbox"
                  id="anal"
                  name="anal"
                  checked={formData.anal}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="county" className="block text-sm font-medium">County</label>
                <input
                  type="text"
                  id="county"
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="detailedlocation" className="block text-sm font-medium">Detailed Location</label>
                <input
                  type="text"
                  id="detailedlocation"
                  name="detailedlocation"
                  value={formData.detailedlocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
              </div>

              <div>
                <label htmlFor="imagedisplay" className="block text-sm font-medium">Profile Image</label>
                <input
                  type="file"
                  id="imagedisplay"
                  name="imagedisplay"
                  onChange={handleImageUpload}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
                {uploading && <p>Uploading...</p>}
                {imagePreview && <img src={imagePreview} alt="Profile Preview" className="mt-2 w-full h-64 object-cover" />}
              </div>
              <div>
                <label htmlFor="imagedisplay" className="block text-sm font-medium">Upload National ID / Passport Picture</label>
                <input
                  type="file"
                  id="nationalproof"
                  name="nationalproof"
                  onChange={handleProofUpload}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
                {imagePrev && <img src={imagePrev} alt="Profile Preview" className="mt-2 w-full h-64 object-cover" />}
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={!accepted}
                  className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold"
                >
                  Submit & Proceed to Payment
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg text-black">
      <h3 className="text-xl font-bold text-center">Waiting for Payment</h3>
      <p className="text-center">Please accept the STK sent to your phone. You will be notified once payment is confirmed.</p>
      <div className="flex justify-center mt-4">
        <div className="animate-spin border-t-4 border-green-600 border-solid rounded-full h-16 w-16"></div> {/* Loading Spinner */}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CreateEscort;
