import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

const GetstartedAuth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useApp();

  const [activeTab, setActiveTab] = useState("password"); // 'password' | 'otp'
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (!identifier) {
      addToast("Please enter email or mobile number", "error");
      return;
    }
    login({ identifier, password });
    addToast("Welcome back to Kanoon Mitra!", "success");
    navigate("/Dashboard");
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobileNumber) {
      addToast("Please enter your mobile number", "error");
      return;
    }
    setOtpSent(true);
    addToast("OTP sent to your mobile: 5892 (Demo Code)", "info");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    login({ mobile: mobileNumber, accountType: "Citizen / Client" });
    addToast("OTP Verified! Logged in successfully.", "success");
    navigate("/Dashboard");
  };

  const handleDemoLogin = () => {
    login({
      fullName: "Rahul Sharma (Demo User)",
      email: "rahul.sharma@example.com",
      accountType: "Citizen / Client",
      state: "Maharashtra",
      city: "Mumbai",
    });
    addToast("Logged in as Demo Citizen", "success");
    navigate("/Dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-22 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(52,211,153,0.16),_transparent_20%)]" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Welcome Back</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Login to Kanoon Mitra</h1>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Secure access to your legal dashboard, consultations, and document drafts.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-6 flex rounded-2xl border border-white/10 bg-slate-900/60 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("password")}
            className={`flex-1 rounded-xl py-2 transition cursor-pointer ${
              activeTab === "password"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Password Login
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("otp")}
            className={`flex-1 rounded-xl py-2 transition cursor-pointer ${
              activeTab === "otp"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Mobile OTP
          </button>
        </div>

        {/* Password Login Form */}
        {activeTab === "password" && (
          <form onSubmit={handlePasswordLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300" htmlFor="identifier">
                Email / Mobile Number
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. rahul@example.com or 9876543210"
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-white/20 bg-slate-800 text-indigo-500 focus:ring-indigo-400"
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() => addToast("Password reset link sent to registered email!", "info")}
                className="font-medium text-slate-300 transition hover:text-white cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
            >
              Login
            </button>
          </form>
        )}

        {/* Mobile OTP Login Form */}
        {activeTab === "otp" && (
          <div className="space-y-5">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">
                    Mobile Number
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="rounded-3xl border border-white/10 bg-slate-900 px-3.5 py-3 text-sm text-slate-300">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      className="flex-1 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400 placeholder:text-slate-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-3xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 cursor-pointer"
                >
                  Send OTP Code →
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2 text-center">
                  <p className="text-xs text-emerald-400 font-medium">OTP Code sent to +91 {mobileNumber}</p>
                  <input
                    type="text"
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 4-digit OTP (e.g. 5892)"
                    className="w-full text-center tracking-[0.5em] text-lg font-bold rounded-3xl border border-indigo-400 bg-slate-900/90 px-4 py-3 text-white outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-3xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 cursor-pointer"
                >
                  Verify & Log In ✓
                </button>
              </form>
            )}
          </div>
        )}

        {/* Quick Demo Login */}
        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <button
            onClick={handleDemoLogin}
            className="w-full rounded-3xl border border-indigo-500/30 bg-indigo-500/10 py-2.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition cursor-pointer"
          >
            ⚡ Quick Demo Login (Skip Password)
          </button>
        </div>

        {/* Register Link */}
        <Link to="/sign-in" className="mt-6 block text-center text-xs text-slate-400 transition hover:text-white">
          <div className="pt-2 text-slate-400">
            Not registered yet? <span className="text-slate-200 font-semibold underline">Create an account</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GetstartedAuth;
