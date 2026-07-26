import React from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: (
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mb-6 shadow-md">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      ),
      title: "Legal Consultation",
      description: "Get expert advice from verified lawyers for any legal issue including civil, criminal, family, property, and more.",
      includes: [
        "Free initial consultation pre-screening",
        "Expert legal guidance across domains",
        "Multiple practice area specialists",
        "Verified Advocates with Bar registration",
      ],
      cost: "Starting from ₹500",
      path: "/services/legal-consultation",
    },
    {
      icon: (
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white mb-6 shadow-md">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
      ),
      title: "Online FIR Guidance",
      description: "Step-by-step guidance to file FIR online or offline with proper documentation support.",
      includes: [
        "Step-by-step FIR drafting wizard",
        "Required evidence checklist",
        "State Police Portal directory",
        "FIR status tracking system",
      ],
      cost: "Free",
      path: "/services/fir-guidance",
    },
    {
      icon: (
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white mb-6 shadow-md">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
      ),
      title: "Lawyer Connect",
      description: "Directly connect with top advocates in your city for representation and court proceedings.",
      includes: [
        "City-wise advocate directory",
        "High Court & Supreme Court counsel",
        "Direct chat & appointment booking",
        "Transparent fee structure",
      ],
      cost: "Varies by Advocate",
      path: "/services/lawyer-connect",
    },
    {
      icon: (
        <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white mb-6 shadow-md">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      ),
      title: "RTI Filing Assistance",
      description: "File Right to Information (RTI) applications easily to get official government information.",
      includes: [
        "RTI application drafting",
        "Public Authority identification",
        "First & Second Appeal guidance",
        "Speed post & e-RTI filing steps",
      ],
      cost: "Starting from ₹199",
      path: "/services/rti-filing",
    },
    {
      icon: (
        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white mb-6 shadow-md">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
      ),
      title: "Cyber Complaint Support",
      description: "Immediate guidance for online fraud, cyber harassment, financial scams, and identity theft.",
      includes: [
        "National Cyber Crime Portal guidance",
        "Bank account freeze advisory (1930)",
        "Evidence collection protocol",
        "Social media account recovery steps",
      ],
      cost: "Free Emergency Advice",
      path: "/services/cyber-complaint",
    },
    {
      icon: (
        <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white mb-6 shadow-md">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
      ),
      title: "Free Legal Document Templates",
      description: "Download legally valid notice drafts, rental agreements, affidavits, and power of attorney templates.",
      includes: [
        "Rent agreement & NDA drafts",
        "Legal notice to employer / tenant",
        "Affidavit & Undertaking forms",
        "Editable Word & PDF formats",
      ],
      cost: "100% Free Download",
      path: "/services/free-legal-docs",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="relative w-full min-h-[65vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="w-full h-110 object-cover"
          src="/images/low-key-filter-law-bookshelf-with-wooden-judge-s-gavel-golden-scale_34259-438 (1).jpg"
          alt="Services"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/30"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <span className="bg-blue-600/40 border border-blue-400/40 text-blue-200 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3">
            Legal Solutions Hub
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Our Legal Services
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md text-gray-200">
            Comprehensive legal services designed to make justice accessible to every Indian citizen. From basic legal advice to complex case handling, we've got you covered.
          </p>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div>{item.icon}</div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{item.description}</p>

                <h3 className="font-semibold mb-3 text-gray-800 text-sm uppercase tracking-wide">Key Features:</h3>

                <ul className="text-gray-700 space-y-2 text-sm mb-6">
                  {item.includes.map((line, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <hr className="my-4 border-gray-200" />
                <div className="text-2xl font-extrabold text-blue-900 mb-4">{item.cost}</div>

                <button
                  onClick={() => navigate(item.path)}
                  className="bg-gradient-to-r from-blue-800 to-orange-600 hover:from-blue-900 hover:to-orange-700 shadow-md hover:shadow-lg transition-all duration-300 px-6 py-3 rounded-xl text-white font-bold text-base w-full text-center flex items-center justify-center gap-2"
                >
                  Get Started <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-800 to-orange-700 text-white py-12 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
          Need Personalized Legal Help?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl">
          Our team of expert lawyers is ready to assist you with your specific legal needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/AskLawyer")}
            className="hover:shadow-lg transition-all duration-300 border border-amber-50 rounded-lg bg-white px-6 py-3 text-blue-800 font-bold"
          >
            Ask a Lawyer Now
          </button>
          <button
            onClick={() => navigate("/Contact")}
            className="hover:shadow-lg transition-all duration-300 border border-white rounded-lg bg-transparent px-6 py-3 text-white font-bold hover:bg-white/10"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
