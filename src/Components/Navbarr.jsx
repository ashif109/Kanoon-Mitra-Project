import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbarr = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Mobile link click handler
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16 sm:h-20">

        {/* Left Section: Logo + Title */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="/" onClick={handleLinkClick}>
            <img
              className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain rounded-full"
              src="/images/Gemini_Generated_Image_vtl42pvtl42pvtl4-removebg-preview.png"
              alt="Kanoon Mitra Logo"
            />
          </Link>

          <Link
            to="/"
            className="text-base sm:text-2xl font-extrabold text-gray-800 tracking-wide"
            onClick={handleLinkClick}
          >
            Kanoon Mitra
          </Link>
        </div>

        {/* Hamburger button - always visible on mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-3 lg:space-x-8 font-semibold text-gray-600 text-sm md:text-base absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ${isOpen ? "flex" : "hidden"}`}>
          
          <Link to="/" className="px-4 py-2 md:py-0 hover:text-blue-700 transition" onClick={handleLinkClick}>
            Home
          </Link>

          <Link to="/services" className="px-4 py-2 md:py-0 hover:text-blue-700 transition" onClick={handleLinkClick}>
            Services
          </Link>

          <Link to="/AskLawyer" className="px-4 py-2 md:py-0 hover:text-blue-700 transition" onClick={handleLinkClick}>
            Ask a Lawyer
          </Link>

          <Link to="/KnowledgeHub" className="px-4 py-2 md:py-0 hover:text-blue-700 transition" onClick={handleLinkClick}>
            Knowledge Hub
          </Link>

          <Link to="/Contact" className="px-4 py-2 md:py-0 hover:text-blue-700 transition" onClick={handleLinkClick}>
            Contact
          </Link>

          <div className="flex flex-col md:flex-row md:space-x-2 lg:space-x-4 px-4 py-2 md:px-0 md:py-0">
            <Link to="/LawyerPortal" onClick={handleLinkClick}>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition text-sm md:text-base w-full md:w-auto">
                Lawyer Login
              </button>
            </Link>

            <Link to="/Dashboard" onClick={handleLinkClick}>
              <button className="bg-orange-500 hover:bg-orange-700 text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition text-sm md:text-base w-full md:w-auto">
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
