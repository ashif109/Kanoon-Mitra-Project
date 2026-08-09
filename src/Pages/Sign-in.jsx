import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { API_BASE_URL } from "../config/api";

const SignIn = () => {
  const navigate = useNavigate();
  // const { signup } = useAuth();
  const { addToast } = useApp();

  // Register State
  const [regData, setRegData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "New Delhi",
    state: "Delhi",
    category: "Property Law",
    password: "",
    confirmPassword: "",
  });

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regData.fullName || !regData.email || !regData.mobile) {
      addToast("Please fill in Full Name, Email, and Mobile Number.", "error");
      return;
    }
    if (regData.password !== regData.confirmPassword) {
      addToast("Passwords do not match!", "error");
      return;
    }
    try {
      let response = await fetch("${API_BASE_URL}/sign-in", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(regData)
      })
      const result = await response.json();
      if (result.success) {
        localStorage.setItem("login", regData.email);
        if (result.token) {
          localStorage.setItem("token", result.token);
          window.dispatchEvent(new Event("localStorage-change"));
          alert(`Account created for: ${regData.name}`);
          navigate("/Dashboard");
        } else {
          alert(result.msg || "Signup failed");
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Failed to connect to backend server.");}

  addToast("User Account Created! Opening User Dashboard...", "success");
  navigate("/Dashboard");
 
  };


return (
  <div className="bg-gray-50 min-h-screen">
    {/* ---------------- HEADER BANNER ---------------- */}
    <div className="relative w-full min-h-[50vh] mt-16 sm:mt-20 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-3">
        <span className="bg-orange-500/20 text-orange-200 border border-orange-400/40 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
          Citizen Registration Desk
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Register Citizen Account
        </h1>
        <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
          Create an account to ask questions to verified advocates, generate FIR/RTI applications, and manage legal cases.
        </p>

        
      </div>
    </div>

    {/* ---------------- MAIN AUTH CARD ---------------- */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-200">

        {/* Tab Switcher */}
        <div className="flex mb-8 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
          <button
            onClick={() => navigate("/get-started")}
            className="w-1/2 py-3 text-xs font-extrabold rounded-xl transition cursor-pointer text-gray-600 hover:text-gray-900"
          >
            User Login
          </button>

          <button
            onClick={() => navigate("/sign-in")}
            className="w-1/2 py-3 text-xs font-extrabold rounded-xl transition cursor-pointer bg-blue-900 text-white shadow-md"
          >
            Register Account
          </button>
        </div>

        {/* USER REGISTRATION FORM */}
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Create Citizen Account</h2>
            <p className="text-xs text-gray-500">Register to get expert legal advice and access document generators</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={regData.fullName}
                onChange={handleRegChange}
                placeholder="Enter your full name"
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
                placeholder="Enter email address"
                className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Mobile Phone *</label>
              <input
                type="tel"
                name="mobile"
                value={regData.mobile}
                onChange={handleRegChange}
                placeholder="10-digit mobile number"
                className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">City / District *</label>
                <input
                  type="text"
                  name="city"
                  value={regData.city}
                  onChange={handleRegChange}
                  placeholder="e.g. New Delhi"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  value={regData.state}
                  onChange={handleRegChange}
                  placeholder="e.g. Delhi"
                  className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Primary Legal Area of Concern</label>
              <select
                name="category"
                value={regData.category}
                onChange={handleRegChange}
                className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-900 focus:outline-none"
              >
                <option value="Property Law">Property & Boundary Disputes</option>
                <option value="Criminal Law">Criminal Law & FIR Guidance</option>
                <option value="Cyber Law">Cyber Crime & Financial Fraud</option>
                <option value="Family Law">Family & Custody Matters</option>
                <option value="Labor Law">Labor & Employment Issues</option>
                <option value="Consumer Law">Consumer Protection & Refunds</option>
              </select>
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
            Register & Open User Dashboard →
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/get-started")}
            className="text-xs text-blue-900 font-semibold hover:underline cursor-pointer"
          >
            Already registered? Go to User Login
          </button>
        </div>

      </div>
    </div>
  </div>
);
};

export default SignIn;