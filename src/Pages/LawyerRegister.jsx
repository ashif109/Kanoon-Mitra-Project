import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { API_BASE_URL } from "../config/api";

const LawyerRegister = () => {
  const navigate = useNavigate();
  // const { signup } = useAuth();
  const { addToast } = useApp();

  const [regData, setRegData] = useState({
    fullName: "",
    email: "",
    phone: "",
    barCouncilNo: "",
    city: "New Delhi",
    title: "",
    languages: "English, Hindi",
    specialization: "Criminal Law",
    court: "Delhi High Court & Supreme Court",
    experience: "10+ Years",
    fee: "1000",
    rating: "4.9 ★ (180+ Reviews)",  
    password: "",
    confirmPassword: "",
  });

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async(e) => {
    e.preventDefault();
    if (!regData.fullName || !regData.email || !regData.barCouncilNo || !regData.phone) {
      addToast("Please fill in Full Name, Email, Mobile, and Bar Council Number.", "error");
      return;
    }
    if (regData.password !== regData.confirmPassword) {
      addToast("Passwords do not match!", "error");
      return;
    }
  try{
    let response  = await fetch(`${API_BASE_URL}/lawyer-register`, {
       method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"Application/json"
      },
      body:JSON.stringify(regData)
    })
    const result= await response.json();
    if (result.success) {
        localStorage.setItem("login", regData.email);
        if (result.token) {
          localStorage.setItem("token", result.token);
          window.dispatchEvent(new Event("localStorage-change"));
          // alert(`Account created for: ${regData.name}`);
         addToast("Advocate Registration Complete! Opening Advocate Panel...", "success");
         navigate("/lawyer-dashboard");
        } else {
          alert(result.msg || "Signup failed");
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Failed to connect to backend server.");}
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ---------------- HEADER BANNER ---------------- */}
      <div className="relative w-full min-h-[50vh] mt-16 sm:mt-20 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-3">
          <span className="bg-orange-500/20 text-orange-200 border border-orange-400/40 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
            Advocate Registration Desk
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Register Advocate Account
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Join the Kanoon Mitra advocate panel to receive verified client queries and legal consultation requests.
          </p>

          
        </div>
      </div>

      {/* ---------------- MAIN AUTH CARD ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-10">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
          
          {/* Tab Switcher */}
          <div className="flex mb-8 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
            <button
              onClick={() => navigate("/lawyer-login")}
              className="w-1/2 py-3 text-xs font-extrabold rounded-xl transition cursor-pointer text-gray-600 hover:text-gray-900"
            >
              Advocate Login
            </button>

            <button
              onClick={() => navigate("/lawyer-register")}
              className="w-1/2 py-3 text-xs font-extrabold rounded-xl transition cursor-pointer bg-blue-900 text-white shadow-md"
            >
              Register Advocate Account
            </button>
          </div>

          {/* ADVOCATE REGISTRATION FORM */}
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Join Advocate Panel</h2>
              <p className="text-xs text-gray-500">Enter your credentials to receive client queries across India</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="block font-semibold text-gray-700 mb-1">Advocate Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={regData.fullName}
                  onChange={handleRegChange}
                  placeholder="Adv. Full Name (e.g. Adv. Priya Sharma)"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={regData.email}
                  onChange={handleRegChange}
                  placeholder="Official email address"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={regData.phone}
                  onChange={handleRegChange}
                  placeholder="10-digit mobile number"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Bar Council Enrolment No *</label>
                <input
                  type="text"
                  name="barCouncilNo"
                  value={regData.barCouncilNo}
                  onChange={handleRegChange}
                  placeholder="e.g. D/1482/2010"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">City / Base Practice *</label>
                <input
                  type="text"
                  name="city"
                  value={regData.city}
                  onChange={handleRegChange}
                  placeholder="e.g. New Delhi, Mumbai"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">title*</label>
                <input
                  type="text"
                  name="title"
                  value={regData.title}
                  onChange={handleRegChange}
                  placeholder="e.g. Senior High Court Advocate"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>
               <div>
                <label className="block font-semibold text-gray-700 mb-1">languages*</label>
                <input
                  type="text"
                  name="languages"
                  value={regData.languages}
                  onChange={handleRegChange}
                  placeholder="e.g. English, Hindi"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Primary Specialization *</label>
                <select
                  name="specialization"
                  value={regData.specialization}
                  onChange={handleRegChange}
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="Criminal Law">Criminal Law & FIR</option>
                  <option value="Property Law">Property & Real Estate</option>
                  <option value="Cyber Law">Cyber Law & IT Act</option>
                  <option value="Family Law">Family & Custody</option>
                  <option value="Corporate Law">Corporate & Business</option>
                  <option value="Civil Law">Civil Litigation</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Primary Court Jurisdiction *</label>
                <input
                  type="text"
                  name="court"
                  value={regData.court}
                  onChange={handleRegChange}
                  placeholder="e.g. Supreme Court & High Court"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Practice Experience *</label>
                <select
                  name="experience"
                  value={regData.experience}
                  onChange={handleRegChange}
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                >
                  <option value="3+ Years">3+ Years Experience</option>
                  <option value="5+ Years">5+ Years Experience</option>
                  <option value="10+ Years">10+ Years Experience</option>
                  <option value="15+ Years">15+ Years Experience</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Standard Consultation Fee (₹) *</label>
                <input
                  type="number"
                  name="fee"
                  value={regData.fee}
                  onChange={handleRegChange}
                  placeholder="e.g. 1000"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={regData.password}
                  onChange={handleRegChange}
                  placeholder="Create password"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={regData.confirmPassword}
                  onChange={handleRegChange}
                  placeholder="Confirm password"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition text-xs cursor-pointer mt-2">
              Register Advocate & Open Panel →
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/lawyer-login")}
              className="text-xs text-blue-900 font-semibold hover:underline cursor-pointer"
            >
              Already registered? Go to Advocate Login
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LawyerRegister;
