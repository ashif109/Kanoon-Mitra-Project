import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
const Contact = () => {
  return (
    <div>
      <div className="relative w-full min-h-[70vh] mt-16 sm:mt-20">
        <img
          className="w-full h-110 object-cover"
          src="/src/assets/julian-hochgesang-Dkn8-zPIbwo-unsplash.jpg"
          alt="law background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Contact us
          </h1>
          <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center"><span class="text-2xl font-bold">AA</span>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md">
            Get in touch with our legal experts. We're here to help you with all your legal <br />needs and questions.
          </p>
        </div>
      </div>
      <div>
      </div>
      </div>
      {/* Left Form Card */}
      <div className="flex flex-col lg:flex-row justify-between p-10 gap-8 mx-4 sm:mx-10 mb-10 text-center">
        <div className="transition-transform duration-300 bg-white shadow-2xl rounded-lg flex flex-col items-start p-6 hover:shadow-indigo-400/50 w-full lg:w-[48%]">

          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 w-full text-center">
            Send us a Message
          </h1>

          <label className="font-medium text-left">Full Name *</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          />

          <label className="font-medium text-left mt-4">Email Address *</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          />

          <label className="font-medium text-left mt-4">Subject *</label>
          <input
            type="text"
            placeholder="What is this regarding?"
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          />

          <label className="font-medium text-left mt-4">
            Message *

          </label>
          <textarea
            rows="6"
            placeholder="Please provide details about your inquiry..."
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          ></textarea>


          <br />
          <button type="button" className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full lg:w-[100%]">Submit Question</button>
        </div>

        {/* Right Chat Card */}
        <div className="transition-transform duration-300 bg-white shadow-2xl rounded-xl p-6 hover:shadow-indigo-400/50 w-full lg:w-[48%]">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

          <h3 className="justify-center text-4xl font-semibold text-gray-900 mb-6 text-center">Coming soon...</h3>

        </div>
      </div>
      <div className="max-w-7xl mx-auto rounded-2xl p-10 mt-10">
  
  {/* Heading Section */}
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold text-gray-900">Our Location</h1>
    <p className="text-xl text-gray-600 mt-2">
      Visit our office in the heart of New Delhi
    </p>
  </div>


<div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-300 shadow-lg relative z-0">
  <MapContainer 
    center={[28.6139, 77.2090]} 
    zoom={12} 
    className="h-full w-full"
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[28.6139, 77.2090]}>
      <Popup>Delhi, India</Popup>
    </Marker>
  </MapContainer>
</div>
<br />
<div className="shadow-2xl rounded-lg text-center h-70">
  <h1 className="text-3xl text-black font-semibold text-center p-4">Frequently Asked Questions</h1>
  <div className="flex justify-between">
<div className="text-left w-50% p-3">
  <h1 className="flex text-black font-medium">How quickly will I receive a response?</h1>
  <p className="flex text-gray-700">We typically respond to all inquiries within 24 hours during business days.</p>
  <br />
  <h1 className="flex text-black font-medium">Can I schedule a consultation?</h1>
  <p className="flex text-gray-700">Absolutely! You can schedule a consultation through our contact form or by calling us directly.</p>
</div>
<div>
  <div className="text-left w-50% p-3">
  <h1 className="flex text-black font-medium">How quickly will I receive a response?</h1>
  <p className="flex text-gray-700">We typically respond to all inquiries within 24 hours during business days.</p>
  <br />
  <h1 className="flex text-black font-medium">Can I schedule a consultation?</h1>
  <p className="flex text-gray-700">Absolutely! You can schedule a consultation through our contact form or by calling us directly.</p>
</div>
</div>
</div>
</div>
</div>

    </div>
  );
};

export default Contact;
