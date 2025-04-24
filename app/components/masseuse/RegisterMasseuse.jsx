'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const RegisterMasseuse = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    idnumber: '',
    fine: 0,
    businesstype: '',
    location: '',
    phonenumber: '',
    banner: '', // Image upload
    email: '',
    description: '',
    verified: false,
    nationalproof: '',
    packing: ''
  });
useEffect(() => {

  // Set page title
  document.title = "Masseuse Registration Form";

  const metas = [
    { name: 'description', content: "Register as a masseuse here" },
    { property: 'og:title', content: "masseuse registration page" },
    { property: 'og:description', content: "therapists registration page" },
    { property: 'og:image', content: "/logo.png" },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: "masseuse registration page" },
    { name: 'twitter:description', content: "register as a masseuse" },
    { name: 'twitter:image', content: model.imagedisplay }
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


  const [accepted, setAccepted] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', 'ml_default');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dgxazepsg/image/upload',
        imageData
      );
      setFormData({ ...formData, banner: res.data.secure_url });
      setImagePreview(res.data.secure_url);
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(true);
    const slug = `${formData.businesstype}-masseuse-in-${formData.location}-${new Date().getTime()}`;
    const escortData = { ...formData, slug };
    
    try {
      const response = await axios.post('/api/registermasseuse', escortData);
      if (response.data.success) {
        setPaymentUrl(response.data.paymentUrl);
        setPaymentStep(true);
      } else {
        alert('Error during registration. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('There was an error with registration.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-lg p-8 space-y-6 bg-opacity-75 bg-black rounded-lg">
        {!accepted && !paymentStep ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Masseuse Registration Rules</h2>
            <ul className="space-y-2 text-lg">
              <li>1. You agree to pay a registration fee of 500 KES.</li>
              <li>2. Ensure your details are accurate and truthful.</li>
              <li>3. Your profile will be verified upon submission.</li>
            </ul>
            <button onClick={() => setAccepted(true)} className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold">
              Accept & Continue
            </button>
          </div>
        ) : paymentStep ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Please Complete Your Payment</h2>
            <p className="text-lg text-center">You are now being redirected to Pesapal for payment.</p>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold" onClick={() => setShowPopup(false)}>
              Confirm Payment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Masseuse Registration Form</h2>
            <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder='Your Full Name'
                  required
                  className="w-full p-2 border rounded focus:ring-red-500"
                />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder='Individual / Company Username'
                  required
                  className="w-full p-2 border rounded focus:ring-red-500"
                />
                <input
                  type="text"
                  id="idnumber"
                  name="idnumber"
                  value={formData.idnumber}
                  onChange={handleChange}
                  placeholder='Your National ID/ Passport Number'
                  required
                  className="w-full p-2 border rounded focus:ring-red-500"
                /><div>
                <label htmlFor="nationalproof" className="block text-sm font-medium">Upload National ID / Passport Picture</label>
                <input
                  type="file"
                  id="nationalproof"
                  name="nationalproof"
                  onChange={handleImageUpload}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
                {uploading && <p>Uploading...</p>}
                {imagePreview && <img src={imagePreview} alt="Profile Preview" className="mt-2 w-full h-64 object-cover" />}
              </div>
                <select
                  id="businesstype"
                  name="businesstype"
                  value={formData.businesstype}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded focus:ring-red-500"
                >
                  <option value="">Select Business Type</option>
                  <option value="company">Company Operated</option>
                  <option value="individual">Individual Operated</option>
                </select>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="w-full p-2 border rounded" />
            <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} placeholder="Phone Number" required className="w-full p-2 border rounded" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border rounded" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded" />
            <input type="text" name="packing" value={formData.packing} onChange={handleChange} placeholder="Packing" required className="w-full p-2 border rounded" />

            <div>
                <label htmlFor="banner" className="block text-sm font-medium">Upload Banner</label>
                <input
                  type="file"
                  id="banner"
                  name="banner"
                  onChange={handleImageUpload}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:ring-red-500"
                />
                {uploading && <p>Uploading...</p>}
                {imagePreview && <img src={imagePreview} alt="Profile Preview" className="mt-2 w-full h-64 object-cover" />}
              </div>
            <button type="submit" className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold">Submit & Proceed to Payment</button>
          </form>
        )}
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-black">
            <h3 className="text-xl font-bold text-center">Waiting for Payment,</h3>
            <p className="text-center">Please accept the STK sent to your phone. You will be notified via email once payment is confirmed.</p>
            <div className="flex justify-center mt-4">
              <div className="animate-spin border-t-4 border-green-600 border-solid rounded-full h-16 w-16"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterMasseuse;
