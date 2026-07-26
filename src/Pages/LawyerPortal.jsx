import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LawyerPortal = () => {
  const [activeForm, setActiveForm] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ---------------- HEADER BANNER ---------------- */}
      <div className="relative w-full min-h-[65vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="w-full h-110 object-cover"
          src="/images/—Pngtree—lawyer signing legal documents with_16388702.jpg"
          alt="Lawyer Portal"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/30"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <span className="bg-blue-600/40 border border-blue-400/40 text-blue-200 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3">
            Advocate Network Portal
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Lawyer Portal
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md text-gray-200">
            Access your legal practice dashboard and connect with clients seeking expert legal advice across India.
          </p>
        </div>
      </div>

      {/* ---------------- MAIN CARD ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          {/* Top Buttons */}
          <div className="flex mb-6 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveForm("login")}
              className={`w-1/2 py-2.5 text-sm font-bold rounded-lg transition ${
                activeForm === "login"
                  ? "bg-blue-800 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Lawyer Login
            </button>

            <button
              onClick={() => setActiveForm("register")}
              className={`w-1/2 py-2.5 text-sm font-bold rounded-lg transition ${
                activeForm === "register"
                  ? "bg-blue-800 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Register Advocate
            </button>
          </div>

          {/* Forms */}
          {activeForm === "login" ? <LoginForm navigate={navigate} /> : <RegisterForm setActiveForm={setActiveForm} />}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 text-center">
          {[
            {
              title: "Connect with Clients",
              desc: "Reach thousands of potential clients seeking legal assistance across India.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
            },
            {
              title: "Earn & Grow Practice",
              desc: "Transparent fees and flexible consultation hours to maximize your legal practice.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              ),
            },
            {
              title: "Verified Advocate Badge",
              desc: "Verified platform with dedicated lawyer dashboard, case calendar, and file manager.",
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-orange-700 rounded-full flex items-center justify-center text-white mb-4 shadow">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerPortal;

/* LOGIN FORM */
function LoginForm({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }
    alert("Advocate Login successful! Redirecting to dashboard...");
    navigate("/Dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome Back, Advocate</h2>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Advocate email address"
          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          required
        />
      </div>

      <div className="flex justify-between items-center text-xs">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded text-blue-800" />
          <span className="text-gray-600">Remember me</span>
        </label>
        <button type="button" onClick={() => alert("Password reset link sent to your email.")} className="text-blue-700 font-semibold hover:underline">
          Forgot password?
        </button>
      </div>

      <button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-lg shadow transition text-sm">
        Login to Advocate Portal
      </button>
    </form>
  );
}

/* REGISTER FORM */
function RegisterForm({ setActiveForm }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    barCouncilNo: "",
    specialization: "",
    experience: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.barCouncilNo) {
      alert("Please fill in Full Name, Email, and Bar Council Number.");
      return;
    }
    alert("Registration submitted! Our team will verify your Bar Council credential within 24 hours.");
    setActiveForm("login");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Join Our Legal Network</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Adv. Full Name"
            className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Official email"
            className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Bar Council No *</label>
          <input
            type="text"
            name="barCouncilNo"
            value={formData.barCouncilNo}
            onChange={handleChange}
            placeholder="D/1234/2018"
            className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Specialization *</label>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
          >
            <option value="">Select Specialization</option>
            <option value="Family Law">Family Law</option>
            <option value="Criminal Law">Criminal Law</option>
            <option value="Property Law">Property Law</option>
            <option value="Corporate Law">Corporate Law</option>
            <option value="Cyber Law">Cyber Law</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
            className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            required
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 rounded-lg shadow transition text-sm">
        Register Advocate Account
      </button>
    </form>
  );
}
