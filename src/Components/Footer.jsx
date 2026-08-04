import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 md:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Brand Column */}
        <div className="col-span-1 md:col-span-2 flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img
                className="w-14 h-14 object-contain rounded-full border border-gray-700"
                src="/images/Gemini_Generated_Image_vtl42pvtl42pvtl4-removebg-preview.png"
                alt="Kanoon Mitra Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
            </Link>
            <Link to="/" className="text-2xl font-extrabold text-white tracking-tight">
              Kanoon Mitra
            </Link>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed max-w-md">
            Your Digital Legal Friend — making justice simple, accessible, and understandable for every Indian citizen through AI assistance and verified advocate guidance.
          </p>

          {/* Emergency Helplines Badge */}
          <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-3 text-xs w-full max-w-md space-y-1">
            <p className="font-bold text-orange-400 uppercase tracking-wider text-[11px]">🚨 Emergency Citizen Helplines</p>
            <div className="grid grid-cols-2 gap-2 text-gray-300">
              <div>Cyber Helpline: <span className="font-bold text-white">1930</span></div>
              <div>Legal Aid: <span className="font-bold text-white">15100</span></div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-bold text-orange-400 mb-4 tracking-wide uppercase">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-gray-300 font-medium">
            <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-orange-400 transition">Legal Services</Link></li>
            <li><Link to="/AskLawyer" className="hover:text-orange-400 transition">Ask a Lawyer</Link></li>
            <li><Link to="/KnowledgeHub" className="hover:text-orange-400 transition">Knowledge Hub</Link></li>
            <li><Link to="/Contact" className="hover:text-orange-400 transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Legal & Compliance */}
        <div>
          <h3 className="text-base font-bold text-orange-400 mb-4 tracking-wide uppercase">Legal Services</h3>
          <ul className="space-y-2.5 text-sm text-gray-300 font-medium">
            <li><Link to="/services/fir-guidance" className="hover:text-orange-400 transition">e-FIR Guidance</Link></li>
            <li><Link to="/services/rti-filing" className="hover:text-orange-400 transition">RTI Application Builder</Link></li>
            <li><Link to="/services/cyber-complaint" className="hover:text-orange-400 transition">Cyber Fraud Assistance</Link></li>
            <li><Link to="/services/free-legal-docs" className="hover:text-orange-400 transition">Free Legal Documents</Link></li>
            <li><Link to="/services/legal-consultation" className="hover:text-orange-400 transition">Book Lawyer Slot</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-xs gap-3">
        <p>© {new Date().getFullYear()} Kanoon Mitra. All Rights Reserved. Made for Digital India 🇮🇳</p>
        <div className="flex space-x-4">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">Legal Disclaimer</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
