import React, { useState } from "react";
import { API_BASE_URL } from "../config/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
   
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      alert("Please fill in your Full Name, Email Address, and Message.");
      return;
    }
    let response = await fetch(`${API_BASE_URL}/Contact`, {
      credentials:"include", 
      method:"POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(formData),
    })
    const result = await response.json();
    if(result)  console.log("contact-form filled...")
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="w-full h-[400px] sm:h-[460px] object-cover"
          src="/images/julian-hochgesang-Dkn8-zPIbwo-unsplash.jpg"
          alt="Contact Kanoon Mitra"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/30"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <span className="bg-blue-600/40 border border-blue-400/40 text-blue-200 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3">
            24/7 Legal Assistance Desk
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md text-gray-200">
            Get in touch with our legal experts. We're here to help you with all your legal needs and questions.
          </p>
        </div>
      </div>

      {/* Main Content: Form + Contact Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Form Card */}
          <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-sm text-gray-600 mb-6">Fill out the form below and our legal response desk will reply within 24 hours.</p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="text-5xl mb-3">✉️</div>
                <h3 className="text-xl font-bold text-green-900 mb-2">Message Received!</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Thank you, <strong>{formData.fullName}</strong>. Our team has received your query regarding <strong>{formData.subject || "General Inquiry"}</strong> and will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-blue-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is your inquiry regarding?"
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details about your legal inquiry..."
                    className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 w-full shadow-lg"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right Contact Info Card */}
          <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center text-xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Head Office Address</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mt-1">
                      Kanoon Mitra Legal Tech Towers, Barakhamba Road, Connaught Place, New Delhi - 110001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center text-xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Toll-Free Helpline</h4>
                    <p className="text-sm text-gray-600 mt-1">+91 1800-123-5678 (Mon - Sat, 9:00 AM - 7:00 PM)</p>
                    <p className="text-xs text-gray-500 mt-0.5">Emergency FIR & Cyber Support: 24/7 Active</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center text-xl flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Email Support</h4>
                    <p className="text-sm text-gray-600 mt-1">support@kanoonmitra.in | helpline@kanoonmitra.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-800 flex items-center justify-center text-xl flex-shrink-0">
                    ⏰
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">Working Hours</h4>
                    <p className="text-sm text-gray-600 mt-1">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                    <p className="text-xs text-gray-500 mt-0.5">Closed on Sunday & National Holidays</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-bold text-gray-900 text-sm mb-3">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-600 transition font-bold text-sm">
                  in
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-blue-400 hover:text-white flex items-center justify-center text-gray-600 transition font-bold text-sm">
                  X
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center text-gray-600 transition font-bold text-sm">
                  yt
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Office Location Visual Map */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Office Location</h2>
            <p className="text-gray-600 text-sm mt-1">Visit our headquarters in the heart of New Delhi</p>
          </div>

          <div className="w-full h-80 rounded-xl overflow-hidden bg-blue-950 relative flex items-center justify-center text-white p-6 shadow-inner">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="relative z-10 text-center space-y-3">
              <div className="text-5xl animate-bounce">📍</div>
              <h3 className="text-2xl font-bold">Kanoon Mitra HQ — Connaught Place</h3>
              <p className="text-sm text-gray-300 max-w-md">Barakhamba Road, Near Rajiv Chowk Metro Gate No. 2, New Delhi 110001</p>
              <a
                href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition shadow-md"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
