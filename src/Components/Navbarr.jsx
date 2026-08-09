import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbarr = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();

  const handleLinkClick = () => {
    setIsOpen(false);
    setShowProfileMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md fixed top-0 left-0 w-full z-50 shadow-sm border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">

        {/* Left Section: Logo + Title */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-2.5 group">
            <img
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
              src="/images/favicon.ico"
              alt="Kanoon Mitra Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
            <span className="text-lg sm:text-2xl font-extrabold text-gray-900 tracking-tight group-hover:text-blue-700 transition-colors">
              Kanoon Mitra
            </span>
          </Link>
        </div>

        {/* Hamburger button - visible on mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition"
            aria-label="Toggle Navigation"
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

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-7 font-semibold text-gray-700 text-sm lg:text-base">
          
          <Link
            to="/"
            className={`py-1 transition-colors hover:text-blue-700 relative ${
              isActive("/") ? "text-blue-700 font-bold" : ""
            }`}
            onClick={handleLinkClick}
          >
            Home
            {isActive("/") && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-full" />}
          </Link>

          <Link
            to="/services"
            className={`py-1 transition-colors hover:text-blue-700 relative ${
              isActive("/services") ? "text-blue-700 font-bold" : ""
            }`}
            onClick={handleLinkClick}
          >
            Services
            {isActive("/services") && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-full" />}
          </Link>

          <Link
            to="/AskLawyer"
            className={`py-1 transition-colors hover:text-blue-700 relative ${
              isActive("/AskLawyer") ? "text-blue-700 font-bold" : ""
            }`}
            onClick={handleLinkClick}
          >
            Ask a Lawyer
            {isActive("/AskLawyer") && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-full" />}
          </Link>

          <Link
            to="/KnowledgeHub"
            className={`py-1 transition-colors hover:text-blue-700 relative ${
              isActive("/KnowledgeHub") ? "text-blue-700 font-bold" : ""
            }`}
            onClick={handleLinkClick}
          >
            Knowledge Hub
            {isActive("/KnowledgeHub") && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-full" />}
          </Link>

          <Link
            to="/Contact"
            className={`py-1 transition-colors hover:text-blue-700 relative ${
              isActive("/Contact") ? "text-blue-700 font-bold" : ""
            }`}
            onClick={handleLinkClick}
          >
            Contact
            {isActive("/Contact") && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 rounded-full" />}
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pl-2">
            <Link to="/lawyer-login" onClick={handleLinkClick}>
              <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all text-sm cursor-pointer">
                Lawyer Login
              </button>
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-xl transition cursor-pointer"
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"}
                    alt={user?.name}
                    className="w-7 h-7 rounded-full object-cover border border-blue-600"
                  />
                  <span className="text-xs font-bold text-gray-800 max-w-[100px] truncate">{user?.name}</span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-gray-100 shadow-xl p-2 text-xs space-y-1 z-50">
                    <Link
                      to="/Dashboard"
                      onClick={handleLinkClick}
                      className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium"
                    >
                      User Dashboard
                    </Link>
                    <Link
                      to="/lawyer-dashboard"
                      onClick={handleLinkClick}
                      className="block px-3 py-2 rounded-lg text-blue-900 hover:bg-blue-50 font-bold"
                    >
                      Advocate Panel
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        handleLinkClick();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/user-login" onClick={handleLinkClick}>
                <button className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all text-sm cursor-pointer">
                  Get Started
                </button>
              </Link>
            )}
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-b border-gray-100 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col space-y-2 p-4 font-semibold text-gray-700 text-sm">
            <Link to="/" className="px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-700" onClick={handleLinkClick}>
              Home
            </Link>
            <Link to="/services" className="px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-700" onClick={handleLinkClick}>
              Services
            </Link>
            <Link to="/AskLawyer" className="px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-700" onClick={handleLinkClick}>
              Ask a Lawyer
            </Link>
            <Link to="/KnowledgeHub" className="px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-700" onClick={handleLinkClick}>
              Knowledge Hub
            </Link>
            <Link to="/Contact" className="px-4 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-700" onClick={handleLinkClick}>
              Contact
            </Link>

            <div className="pt-3 border-t border-gray-100 flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 mb-1">
                    <img
                      src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover border border-blue-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{user?.name || "User"}</p>
                      <p className="text-[10px] text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <Link to="/Dashboard" onClick={handleLinkClick}>
                    <button className="w-full bg-blue-50 text-blue-700 font-bold py-2.5 rounded-xl transition text-sm text-left px-4">
                      👤 User Dashboard
                    </button>
                  </Link>
                  <Link to="/lawyer-dashboard" onClick={handleLinkClick}>
                    <button className="w-full bg-blue-950 text-white font-bold py-2.5 rounded-xl transition text-sm text-left px-4">
                      ⚖️ Advocate Panel
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      handleLinkClick();
                    }}
                    className="w-full bg-red-50 text-red-600 font-bold py-2.5 rounded-xl transition text-sm text-left px-4 cursor-pointer"
                  >
                    🚪 Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/lawyer-login" onClick={handleLinkClick}>
                    <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-xl transition text-sm cursor-pointer shadow-sm">
                      Lawyer Login
                    </button>
                  </Link>
                  <Link to="/user-login" onClick={handleLinkClick}>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold py-2.5 rounded-xl transition text-sm cursor-pointer shadow-sm">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbarr;
