import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { API_BASE_URL } from "../config/api";


const LawyerPortal = () => {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const { addToast } = useApp();

  // Login state
const [formData, setformData] = useState({
  email: "",
  password:""

})
  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      addToast("Please fill in email and password.", "error");
      return;
    }
     try{
      let response = await fetch("${API_BASE_URL}/lawyer-login",{
        credentials:"include",
        method:"POST",
        body:JSON.stringify(formData),
        headers:{
          "Content-Type":"Application/json"
        }
      })  
      const result = await response.json();
      if(result.success){
       localStorage.setItem("login", formData.email);
        if (result.token) {
          localStorage.setItem("token", result.token);
        }
        window.dispatchEvent(new Event("localStorage-change"));
        addToast("Advocate login successful! Opening Advocate Panel...", "success");
        navigate("/lawyer-dashboard");
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
            Advocate Network Portal
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Advocate Login Portal
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            Sign in to access your advocate practice panel, manage client queries, track consultation earnings, and review documents.
          </p>

         
        </div>
      </div>

      {/* ---------------- MAIN AUTH CARD ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-10">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
          
          {/* Tab Switcher */}
          <div className="flex mb-8 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
            <button
              onClick={() => navigate("/lawyer-login")}
              className="w-1/2 py-3 text-xs font-extrabold rounded-xl transition cursor-pointer bg-blue-900 text-white shadow-md"
            >
              Advocate Login
            </button>

            <button
              onClick={() => navigate("/lawyer-register")}
              className="w-1/2 py-3 text-xs font-extrabold rounded-xl transition cursor-pointer text-gray-600 hover:text-gray-900"
            >
              Register Advocate Account
            </button>
          </div>

          {/* ADVOCATE LOGIN FORM */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Welcome Back, Advocate</h2>
              <p className="text-xs text-gray-500">Sign in to access your practice dashboard and client leads</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
              <input
                   type="email"
              name="email"
              onChange={(e) =>
                setformData({
                  ...formData,
                  email: e.target.value,
                })}
                placeholder="e.g. advocate.priya@kanoonmitra.in"
                className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none bg-gray-50"
                autoComplete="current-email"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
              <input
                  type="password"
              name="password"
              onChange={(e) =>
                setformData({
                  ...formData,
                  password: e.target.value,
                })
              }
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none bg-gray-50"
                autoComplete="current-password"
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
              Login to Advocate Panel →
            </button>

            
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/lawyer-register")}
              className="text-xs text-blue-900 font-semibold hover:underline cursor-pointer"
            >
              Not registered yet? Register Advocate Account
            </button>
          </div>

        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center text-xs">
          {[
            {
              title: "Connect Direct with Clients",
              desc: "Receive verified client queries across India in your specialized practice area.",
            },
            {
              title: "Transparent Fee Payouts",
              desc: "Clear 85% net advocate share with weekly direct bank payouts.",
            },
            {
              title: "Verified Advocate Badge",
              desc: "Bar Council enrollment verification with dedicated consultation calendar.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 mb-1">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerPortal;
