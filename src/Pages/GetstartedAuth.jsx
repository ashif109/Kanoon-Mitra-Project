import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { API_BASE_URL } from "../config/api";

const GetstartedAuth = () => {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const { addToast } = useApp();

  // Login State
 const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
   
  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      addToast("Please fill in email and password.", "error");
      return;
    }
    try{
      let response = await fetch("${API_BASE_URL}/user-login", {
           method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if(result.success){
       localStorage.setItem("login", formData.email);
        if (result.token) {
          localStorage.setItem("token", result.token);
        }
        window.dispatchEvent(new Event("localStorage-change"));
        addToast("Login successful! Opening User Dashboard...", "success");
         navigate("/Dashboard");
      } else {
        alert(result.msg || "Invalid Credentials");
      }
    } catch(err){
      console.error("Login failed:", err);
        console.log(err.response?.status);
  console.log(err.response?.data);
      alert("Failed to connect to backend server.");
    }
   
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ---------------- HEADER BANNER ---------------- */}
      <div className="relative w-full min-h-[50vh] mt-16 sm:mt-20 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-3">
          <span className="bg-orange-500/20 text-orange-200 border border-orange-400/40 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
            Citizen & Client Access
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            User Login Portal
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Access your legal command center, ask questions to advocates, review FIR drafts, and track consultations.
          </p>

          
        </div>
      </div>

      {/* ---------------- MAIN AUTH CARD ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-10">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
          
          {/* Tab Switcher */}
          <div className="flex mb-8 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
            <button
              onClick={() => navigate("/user-login")}
              className="w-1/2 py-3 text-xs font-extrabold rounded-xl transition cursor-pointer bg-blue-900 text-white shadow-md"
            >
              User Login
            </button>

            <button
              onClick={() => navigate("/sign-in")}
              className="w-1/2 py-3 text-xs font-extrabold rounded-xl transition cursor-pointer text-gray-600 hover:text-gray-900"
            >
              Register Account
            </button>
          </div>

          {/* USER LOGIN FORM */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-xs text-gray-500">Sign in to view your legal questions, appointments, and drafts</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
              <input
                 type="email"
              name="email"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
                placeholder="e.g. ashifansari04704@gmail.com"
                className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none bg-gray-50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
              <input
                 type="password"
              name="password"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none bg-gray-50"
                required
              />
            </div>

            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-900" />
                <span className="text-gray-600">Remember Me</span>
              </label>
              <button type="button" onClick={() => addToast("Password reset link sent to email!", "info")} className="text-blue-900 font-semibold hover:underline cursor-pointer">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition text-xs cursor-pointer">
              Login to User Dashboard →
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/sign-in")}
              className="text-xs text-blue-900 font-semibold hover:underline cursor-pointer"
            >
              Not registered yet? Register Citizen Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GetstartedAuth;
