import React from "react";
import Footer from "./Footer";

const HerooSec = () => {
  return (
    <div>
      <div className="relative w-full min-h-[70vh] mt-16 sm:mt-20">
        <img
          className="w-full h-140 object-cover"
          src="/src/assets/giammarco-boscaro-zeH-ljawHtg-unsplash.jpg"
          alt="img"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Justice Made Simple
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-xl drop-shadow-md">
            Your Digital Legal Friend. Access legal information, connect with
            lawyers, and understand your rights with ease.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 w-full sm:w-auto">
            <input
              className="bg-black/70 w-full sm:w-[400px] border border-amber-50 rounded-lg p-2 text-white placeholder-gray-300 text-sm sm:text-base"
              type="text"
              placeholder="Search for legal help, documents or ask a question..."
            />
            <button className="bg-red-700 hover:shadow-red-400/50 hover:shadow-lg transition-all duration-300 px-5 py-2 rounded-lg text-white text-lg">
              Search
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button className="hover:shadow-indigo-400/50 hover:shadow-lg transition-all duration-300 border border-amber-50 rounded-lg bg-white px-5 py-2 text-blue-700 font-bold">
              Ask a Lawyer
            </button>
            <button className="hover:shadow-indigo-400/50 hover:shadow-lg transition-all duration-300 border border-amber-50 rounded-lg bg-black/80 px-5 py-2 text-white font-bold">
              Explore Services
            </button>
          </div>
        </div>
      </div>

     
      <div className="flex flex-col items-center justify-center text-center my-12 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
          Why Choose Kanoon Mitra?
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl">
          We make legal assistance accessible, affordable, and easy to understand
          for every Indian citizen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-10 mb-10 text-center">
        {[
          {
            title: "Expert Legal Advice",
            desc: "Get professional legal guidance from verified lawyers across India.",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ),
          },
          {
            title: "Free Legal Documents",
            desc: "Access a library of free legal documents and templates.",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            ),
          },
          {
            title: "24/7 Support",
            desc: "Round-the-clock legal assistance and support system.",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            ),
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="hover:scale-105 transition-transform duration-300 bg-white shadow-2xl rounded-lg flex flex-col justify-end items-center p-6 hover:shadow-indigo-400/50"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-orange-700 rounded-full flex items-center justify-center text-white mb-6">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {item.icon}
              </svg>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {item.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xs">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-4 sm:px-8">
          {[
            ["10,000+", "Citizens Helped"],
            ["500+", "Expert Lawyers"],
            ["50+", "Legal Documents"],
            ["95%", "Satisfaction Rate"],
          ].map(([num, text], idx) => (
            <div key={idx}>
              <h1 className="text-3xl sm:text-5xl font-bold text-blue-800">
                {num}
              </h1>
              <p className="text-gray-700 mt-2 text-sm sm:text-base">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-800 to-orange-700 text-white py-10 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
          Ready to Get Legal Help?
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl">
          Join thousands of citizens who trust Kanoon Mitra for their legal
          needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="hover:shadow-indigo-400/50 hover:shadow-lg transition-all duration-300 border border-amber-50 rounded-lg bg-white px-6 py-2 text-blue-700 font-bold">
            Get Started Now
          </button>
          <button className="hover:shadow-indigo-400/50 hover:shadow-lg transition-all duration-300 border border-amber-50 rounded-lg bg-transparent px-6 py-2 text-white font-bold">
            Learn More
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HerooSec;
