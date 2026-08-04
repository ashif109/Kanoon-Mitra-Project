import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { addToast } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,

    // Step 2 State
    accountType: "Citizen / Client", // Default: Citizen
    age: "",
    gender: "",
    state: "",
    city: "",
    preferredLanguage: "Both", // Default: Both
    occupation: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAccountTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, accountType: type }));
  };

  const handleLanguageSelect = (lang) => {
    setFormData((prev) => ({ ...prev, preferredLanguage: lang }));
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast("Passwords do not match!", "error");
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    addToast("Account created & profile setup complete!", "success");
    navigate("/Dashboard");
  };

  const accountTypes = [
    { id: "Citizen / Client", title: "Citizen / Client", icon: "👤" },
    { id: "Lawyer", title: "Lawyer", icon: "⚖️" },
    { id: "Law Firm", title: "Law Firm", icon: "🏢" },
    { id: "Law Student", title: "Law Student (Optional)", icon: "🎓" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-16">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(52,211,153,0.16),_transparent_20%)]" />

      {/* Main Card */}
      <div className={`relative z-10 w-full ${step === 2 ? "max-w-xl" : "max-w-md"} rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl transition-all duration-300`}>
        
        {/* Step Indicator */}
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${step >= 1 ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"}`}>
              1
            </span>
            <span className={`text-xs font-medium ${step === 1 ? "text-white" : "text-slate-400"}`}>Account</span>
          </div>
          <div className="h-[2px] w-12 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${step === 2 ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"}`}>
              2
            </span>
            <span className={`text-xs font-medium ${step === 2 ? "text-white" : "text-slate-400"}`}>Profile Setup</span>
          </div>
        </div>

      
        {step === 1 && (
          <>
            <div className="mb-8 text-center">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Join Kanoon Mitra</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Create Account</h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">Start your journey with Kanoon Mitra</p>
            </div>

            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300" htmlFor="fullName">
                  Full Name <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300" htmlFor="email">
                  Email Address <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300" htmlFor="mobile">
                  Mobile Number <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  placeholder="Enter your mobile number"
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300" htmlFor="password">
                  Password <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300" htmlFor="confirmPassword">
                  Confirm Password <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-500"
                />
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 rounded border-white/20 bg-slate-800 text-indigo-500 focus:ring-indigo-400 cursor-pointer"
                />
                <label htmlFor="terms" className="cursor-pointer">
                  I agree to the <span className="text-slate-200 hover:underline">Terms</span> & <span className="text-slate-200 hover:underline">Privacy Policy</span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
              >
                Continue to Setup →
              </button>
            </form>

            <Link to="/get-started" className="block">
              <div className="mt-8 border-t border-white/10 pt-5 text-center text-sm text-slate-500">
                Already have an account? <span className="text-slate-200 font-medium hover:text-indigo-400">Log in</span>
              </div>
            </Link>
          </>
        )}

        {/* STEP 2: Account Type & First Time Setup */}
        {step === 2 && (
          <>
            <div className="mb-6 text-center">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">First Time Setup</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">Complete Your Profile</h1>
              <p className="mt-1 text-sm text-slate-400">Select your account type and location details</p>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {/* Account Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">
                  I am a:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {accountTypes.map((type) => {
                    const isSelected = formData.accountType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handleAccountTypeSelect(type.id)}
                        className={`flex items-center gap-2.5 rounded-2xl border p-3 text-left text-sm transition cursor-pointer ${
                          isSelected
                            ? "border-indigo-400 bg-indigo-500/20 text-white shadow-md shadow-indigo-500/10 font-medium"
                            : "border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/20 hover:bg-slate-900/90"
                        }`}
                      >
                        <span className="text-lg">{type.icon}</span>
                        <span className="truncate">{type.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Citizen Profile Details Section */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 border-b border-white/10 pb-2">
                  Citizen Profile Details
                </h3>

                {/* State & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300" htmlFor="state">
                      State <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      id="state"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Maharashtra"
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300" htmlFor="city">
                      City <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Mumbai"
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Preferred Language */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300">
                    Preferred Language
                  </label>
                  <div className="flex items-center gap-2">
                    {["Hindi", "English", "Both"].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => handleLanguageSelect(lang)}
                        className={`flex-1 rounded-xl border py-2 text-xs font-medium transition cursor-pointer ${
                          formData.preferredLanguage === lang
                            ? "border-indigo-400 bg-indigo-500/20 text-white"
                            : "border-white/10 bg-slate-900/60 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300" htmlFor="age">
                      Age <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      id="age"
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 25"
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-slate-300" htmlFor="gender">
                      Gender <span className="text-slate-500">(Optional)</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10"
                    >
                      <option value="" className="bg-slate-900 text-slate-400">Select Gender</option>
                      <option value="Male" className="bg-slate-900 text-white">Male</option>
                      <option value="Female" className="bg-slate-900 text-white">Female</option>
                      <option value="Other" className="bg-slate-900 text-white">Other</option>
                      <option value="Prefer not to say" className="bg-slate-900 text-white">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* Occupation */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300" htmlFor="occupation">
                    Occupation <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    id="occupation"
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="e.g. Business, Software Engineer, Student"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
                >
                  Complete Setup ✓
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default SignIn;