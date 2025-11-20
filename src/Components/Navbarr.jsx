import React from "react";
import { Link } from "react-router-dom";

const Navbarr = () => {
  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16 sm:h-20">

        {/* Left Section: Logo + Title */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="/">
            <img
              className="w-24 h-24 sm:w-24 sm:h-24 object-contain rounded-full"
              src="/src/assets/Gemini_Generated_Image_vtl42pvtl42pvtl4-removebg-preview.png"
              alt="Kanoon Mitra Logo"
            />
          </Link>

          <Link
            to="/"
            className="text-lg sm:text-2xl font-extrabold text-gray-800 tracking-wide"
          >
            Kanoon Mitra
          </Link>
        </div>

        {/* Right Nav Links */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8 font-semibold text-gray-600 text-sm lg:text-base">
          
          <Link to="/" className="hover:text-blue-700 transition">
            Home
          </Link>

          <Link to="/services" className="hover:text-blue-700 transition">
            Services
          </Link>

          <Link to="/AskLawyer" className="hover:text-blue-700 transition">
            Ask a Lawyer
          </Link>

          <Link to="/KnowledgeHub" className="hover:text-blue-700 transition">
            Knowledge Hub
          </Link>

          <Link to="/Contact" className="hover:text-blue-700 transition">
            Contact
          </Link>

          <div className="flex space-x-2 lg:space-x-4">
            <Link to="/LawyerPortal" className="hover:text-blue-700 transition">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition text-sm sm:text-base">
              
        
              Lawyer Login
            </button>
              </Link>
               <Link to="/Dashboard" className="hover:text-blue-700 transition">
            <button className="bg-orange-500 hover:bg-orange-700 text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition text-sm sm:text-base">
              Dashboard
            </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbarr;
