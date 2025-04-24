'use client';

import { useState } from 'react';
import axios from 'axios';
import { Upload } from '../Upload';
import Link from 'next/link';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    idnumber: '',
    entry: '',
    dateofevent: '',
    bookinglink: '', 
    fine: 0, 
    location: '',
    phonenumber: '',
    banner: '', // Image upload
    email: '',
    description: '',
    verified: false,
    nationalproof: '',
    packing: '' 
  });

  const [accepted, setAccepted] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePrev, setImagePrev] = useState(null);
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
  const handleBannerUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    try {
      const bann = await Upload(file);
      setFormData(prev => ({ ...prev, banner: bann }));
    setImagePreview(proofUrl); // Update the preview with the uploaded image URL
    } catch (error) {
      console.error('Error uploading banner:', error);
      alert('Failed to upload banner. Please try again.');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(true);
    const slug = `${formData.username}-orgy-event-in-${formData.location}-${new Date().getTime()}`;
    const escortData = { ...formData, slug };
    
    try {
      const response = await axios.post('/api/create-event', escortData);
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
            <h2 className="text-xl font-bold text-center">Event Creation Rules</h2>
            <ul className="space-y-2 text-lg">
              <li>1. You agree to pay an Event Creation fee of 1000 KES.</li>
              <li>2. Ensure your details are accurate and truthful.</li>
              <li>3. Your profile will be verified upon submission.</li>
              <li>4. You have read and understood the <Link href={'/tnc'} alt='Terms and conditions' className='text-blue-600' >Terms & Conditions</Link></li>

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
            <h2 className="text-2xl font-bold text-center">Event Creation Form</h2>
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
                />
                <input
                  type="text"
                  id="entry"
                  name="entry"
                  value={formData.entry}
                  onChange={handleChange}
                  placeholder='Entry Requirements. eg kes 1500 plus 750ml strong drink'
                  required
                  className="w-full p-2 border rounded focus:ring-red-500"
                />
                <input
                  type="date"
                  id="dateofevent"
                  name="dateofevent"
                  value={formData.dateofevent}
                  onChange={handleChange}
                  placeholder='Date Of Event'
                  required
                  className="w-full p-2 border rounded focus:ring-red-500"
                />
                <input
                  type="text"
                  id="bookinglink"
                  name="bookinglink"
                  value={formData.bookinglink}
                  onChange={handleChange}
                  placeholder='Entry Requirements. eg kes 1500 plus 750ml strong drink'
                  required
                  className="w-full p-2 border rounded focus:ring-red-500"
                />
                <div>
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
                {imagePrev && <img src={imagePrev} alt="Profile Preview" className="mt-2 w-full h-64 object-cover" />}
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
                  onChange={handleBannerUpload}
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
            <h3 className="text-xl font-bold text-center">Waiting for Payment</h3>
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

export default CreateEvent;
