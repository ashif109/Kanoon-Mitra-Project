import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Firpage = () => {
  const navigate = useNavigate();

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIncident, setSelectedIncident] = useState("Theft");
  const [openFaq, setOpenFaq] = useState(null);
  const [trackFirNumber, setTrackFirNumber] = useState("");
  const [trackState, setTrackState] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [aiSuggestionsApplied, setAiSuggestionsApplied] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    incidentDate: "",
    incidentTime: "",
    location: "",
    description: "",
    suspectDetails: "",
    witnessName: "",
    witnessContact: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackFirNumber) {
      alert("Please enter a valid FIR Number.");
      return;
    }
    setTrackResult({
      firNumber: trackFirNumber,
      status: "In Investigation",
      assignedOfficer: "Inspector Rajesh Kumar (Station 04)",
      lastUpdated: "Today, 10:30 AM",
    });
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Section */}
      <header className="relative w-full min-h-[70vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/fir_bg.png"
          alt="FIR Guidance"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh] flex items-center">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-3 py-1 bg-blue-600/30 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold uppercase tracking-wider">
              Free Legal Guidance
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              File Your FIR <br />
              <span className="text-blue-400">with Confidence</span>
            </h1>

            <p className="text-gray-200 text-lg max-w-lg leading-relaxed">
              Get step-by-step guidance to file an FIR online or at your nearest police station. Learn about required documents, understand the legal process, and avoid common mistakes.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#fir-form"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition flex items-center gap-2"
              >
                Start FIR Guide <span className="text-xl">→</span>
              </a>
              <a
                href="#know-rights"
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                Learn About FIR <span className="text-xl">▶</span>
              </a>
            </div>

            <div className="flex items-center space-x-3 pt-4 text-sm text-gray-300">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-700 border-2 border-gray-800 flex items-center justify-center text-xs text-white">👩</div>
                <div className="w-8 h-8 rounded-full bg-orange-600 border-2 border-gray-800 flex items-center justify-center text-xs text-white">👨</div>
                <div className="w-8 h-8 rounded-full bg-purple-700 border-2 border-gray-800 flex items-center justify-center text-xs text-white">🧑</div>
              </div>
              <span className="font-medium">Trusted by 10,000+ users across India</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Overview & Key Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl flex-shrink-0">📋</div>
            <div>
              <h3 className="font-bold text-lg text-blue-900">What is an FIR?</h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                A First Information Report (FIR) is a legal document prepared by police when information about a cognizable offence is reported under Section 154 CrPC.
              </p>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "⚖️", label: "Your Rights" },
              { icon: "🛡️", label: "Legal Protection" },
              { icon: "📑", label: "Official Record" },
              { icon: "🕵️", label: "Important Evidence" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex flex-col items-center justify-center text-center gap-2 hover:shadow-xl transition">
                <span className="text-2xl text-blue-600">{item.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Before You Start Checklist */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-1">Before You Start</h2>
        <p className="text-gray-600 mb-6">Keep the following details and documents ready for accurate filing</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: "📅", label: "Know the incident date" },
            { icon: "📍", label: "Know exact location" },
            { icon: "🆔", label: "Keep your ID Proof" },
            { icon: "📂", label: "Gather evidence files" },
            { icon: "👤", label: "Witness details" },
            { icon: "📸", label: "Photos / Videos" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition">
              <span className="text-3xl mb-2">{item.icon}</span>
              <span className="text-xs text-gray-700 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Select Incident Type */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-1">Select Incident Type</h2>
        <p className="text-gray-600 mb-6">Choose the category that best matches your complaint</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { icon: "🦹", label: "Theft" },
            { icon: "🤕", label: "Assault" },
            { icon: "🚗", label: "Accident" },
            { icon: "👩", label: "Women Safety" },
            { icon: "💻", label: "Cyber Crime" },
            { icon: "💰", label: "Fraud" },
            { icon: "🏠", label: "Property" },
            { icon: "📱", label: "Mobile Theft" },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIncident(item.label)}
              className={`bg-white border rounded-xl p-4 flex flex-col items-center text-center transition cursor-pointer group ${
                selectedIncident === item.label
                  ? "border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/50"
                  : "border-gray-200 hover:border-blue-400 hover:shadow-md"
              }`}
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition">{item.icon}</span>
              <span className={`text-xs font-semibold ${selectedIncident === item.label ? "text-blue-800" : "text-gray-700"}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. FIR Filing Interactive Steps Form */}
      <div id="fir-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
        <h2 className="text-2xl font-bold text-blue-900 mb-1">FIR Filing Steps ({selectedIncident})</h2>
        <p className="text-gray-600 mb-8">Follow the easy steps to generate your FIR complaint draft</p>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-10 px-4">
          {["Personal Details", "Incident Details", "Evidence Upload", "Witness Details", "Preview & Submit"].map((step, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentStep(idx + 1)}
              className="flex flex-col items-center relative w-full cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all ${
                  currentStep >= idx + 1 ? "bg-blue-600 text-white shadow-md scale-105" : "bg-gray-200 text-gray-500"
                }`}
              >
                {idx + 1}
              </div>
              <span className={`text-xs mt-2 text-center w-24 ${currentStep >= idx + 1 ? "text-blue-700 font-bold" : "text-gray-400"}`}>
                {step}
              </span>
              {idx < 4 && (
                <div className={`absolute top-5 left-1/2 w-full h-[3px] ${currentStep > idx + 1 ? "bg-blue-600" : "bg-gray-200"} -z-10`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Form Box */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8">
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-6">Step 1: Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address*</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your full address"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-6">Step 2: Incident Details ({selectedIncident})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incident Date*</label>
                  <input
                    type="date"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Approximate Time</label>
                  <input
                    type="time"
                    name="incidentTime"
                    value={formData.incidentTime}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location of Incident*</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Street, Landmark, Police Jurisdiction area"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description of Incident*</label>
                  <textarea
                    rows="4"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe exactly what happened in chronological order..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-6">Step 3: Evidence Upload</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition">
                <div className="text-4xl mb-2">📁</div>
                <p className="text-sm font-semibold text-gray-700">Drag & drop files or click to upload</p>
                <p className="text-xs text-gray-500 mt-1">Upload ID proof, photos, video footage, or bank statements (PDF, JPG, PNG up to 10MB)</p>
                <input type="file" className="hidden" id="evidence-file" multiple />
                <label
                  htmlFor="evidence-file"
                  className="mt-4 inline-block bg-blue-50 text-blue-700 border border-blue-200 px-6 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-100 transition"
                >
                  Choose Files
                </label>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-6">Step 4: Witness & Suspect Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Suspect Name/Description (If known)</label>
                  <input
                    type="text"
                    name="suspectDetails"
                    value={formData.suspectDetails}
                    onChange={handleInputChange}
                    placeholder="Name, physical appearance, or vehicle number"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Witness Name</label>
                  <input
                    type="text"
                    name="witnessName"
                    value={formData.witnessName}
                    onChange={handleInputChange}
                    placeholder="Enter witness full name"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Witness Contact Number</label>
                  <input
                    type="tel"
                    name="witnessContact"
                    value={formData.witnessContact}
                    onChange={handleInputChange}
                    placeholder="Witness phone number"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-6">Step 5: FIR Draft Preview</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3 text-sm text-gray-800 font-mono">
                <p className="font-bold text-base text-blue-900 border-b pb-2">PREVIEW: FIRST INFORMATION REPORT DRAFT</p>
                <p><strong>Complainant:</strong> {formData.fullName || "Not specified"}</p>
                <p><strong>Contact:</strong> {formData.mobile || "Not specified"} | {formData.email || "N/A"}</p>
                <p><strong>Category:</strong> {selectedIncident}</p>
                <p><strong>Incident Date/Time:</strong> {formData.incidentDate || "Not specified"} {formData.incidentTime}</p>
                <p><strong>Location:</strong> {formData.location || "Not specified"}</p>
                <p><strong>Statement:</strong> {formData.description || "No description filled yet."}</p>
                <p><strong>Suspect / Witness:</strong> {formData.suspectDetails || "Unknown"} / {formData.witnessName || "None"}</p>
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => alert("FIR Draft generated successfully! You can download as PDF or present it at your police station.")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow transition"
                >
                  Download Draft PDF 📄
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between items-center border-t pt-6">
            <button
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              className={`px-6 py-2.5 rounded-lg font-medium border transition ${
                currentStep === 1 ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              ← Back
            </button>
            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 5))}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium shadow transition flex items-center gap-2"
              >
                Save & Next <span>→</span>
              </button>
            ) : (
              <button
                onClick={() => alert("FIR Guide workflow complete! Proceeding to state portal directory.")}
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-2.5 rounded-lg font-medium shadow transition"
              >
                Finish & Submit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 6. AI Review & Suggestions */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">AI Review & Suggestions</h2>
          <p className="text-gray-600 mb-6">Our legal AI evaluates your draft for legal accuracy and completeness</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Checklist */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-bold">AI</span>
                  <span className="font-bold text-gray-800">Review Status</span>
                </div>
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">85% Complete</span>
              </div>
              <ul className="space-y-3">
                <li className="flex justify-between items-center text-sm text-gray-700 border-b border-gray-100 pb-2">
                  <span>✓ Complaint Structure</span>
                  <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded font-medium">Good</span>
                </li>
                <li className="flex justify-between items-center text-sm text-gray-700 border-b border-gray-100 pb-2">
                  <span>✓ Important Details</span>
                  <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded font-medium">Good</span>
                </li>
                <li className="flex justify-between items-center text-sm text-gray-700 border-b border-gray-100 pb-2">
                  <span>✓ Evidence Strength</span>
                  <span className={`${aiSuggestionsApplied ? "bg-green-500" : "bg-orange-500"} text-white text-[10px] px-2 py-0.5 rounded font-medium`}>
                    {aiSuggestionsApplied ? "Good" : "Needs Review"}
                  </span>
                </li>
                <li className="flex justify-between items-center text-sm text-gray-700 border-b border-gray-100 pb-2">
                  <span>✓ Language & Clarity</span>
                  <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded font-medium">Good</span>
                </li>
                <li className="flex justify-between items-center text-sm text-gray-700">
                  <span>✓ Legal Section Matching</span>
                  <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded font-medium">Good</span>
                </li>
              </ul>
            </div>

            {/* Center: Suggestions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-bold text-gray-800 mb-4">Smart Recommendations</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-3 items-start">
                  <span className="text-amber-500 mt-0.5">💡</span>
                  <span>Specify exact land marks near the incident location.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-amber-500 mt-0.5">💡</span>
                  <span>Include IMEI number in case of mobile phone theft.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="text-amber-500 mt-0.5">💡</span>
                  <span>Attach CCTV footage links if available.</span>
                </li>
              </ul>
              <button
                onClick={() => setAiSuggestionsApplied(true)}
                className={`mt-6 w-full py-2.5 rounded-lg text-sm font-semibold transition ${
                  aiSuggestionsApplied ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                {aiSuggestionsApplied ? "✓ Suggestions Applied" : "Apply Suggestions"}
              </button>
            </div>

            {/* Right: AI Support */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
              <div className="text-5xl mb-3">🤖</div>
              <h4 className="font-bold text-gray-800 mb-1">Need Interactive Help?</h4>
              <p className="text-sm text-gray-500 mb-4">Ask our AI legal bot about laws, sections, and rights.</p>
              <button
                onClick={() => navigate("/AskLawyer")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold w-full transition shadow"
              >
                Chat with AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7. How Would You Like to File? */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">How Would You Like to File?</h2>
        <p className="text-gray-600 mb-8">Choose the best way to submit your FIR complaint</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="text-5xl text-blue-600 mb-4">🌐</div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">File Online via State Portal</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              File your FIR electronically through the official citizen portal of your respective State Police department.
            </p>
            <button
              onClick={() => window.open("https://digitalpolice.gov.in/", "_blank")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-sm font-semibold transition shadow"
            >
              Go to Police Portal <span>→</span>
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
            <div className="text-5xl text-blue-600 mb-4">🏛️</div>
            <h3 className="font-bold text-xl text-gray-800 mb-2">Visit Police Station In-Person</h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Take your printed FIR draft from Kanoon Mitra and present it to the Station House Officer (SHO).
            </p>
            <button
              onClick={() => navigate("/Contact")}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-sm font-semibold transition"
            >
              Find Nearest Station <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* 8. Know Your Rights & Track Status */}
      <div id="know-rights" className="bg-gray-100 py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Know Your Rights */}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Know Your Rights</h2>
            <p className="text-sm text-gray-600 mb-6">Be informed. Be empowered while interacting with legal authorities.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: "📜", label: "Can Police Refuse FIR?", detail: "No, under cognizable offences police MUST register an FIR." },
                { icon: "📑", label: "Zero FIR", detail: "File FIR in any station irrespective of jurisdiction." },
                { icon: "👩", label: "Women Rights", detail: "Women cannot be called to police station after sunset." },
                { icon: "👤", label: "Victim Rights", detail: "Right to get a free copy of the registered FIR immediately." },
                { icon: "💻", label: "Cyber Rights", detail: "Immediate reporting under 1930 Helpline for financial fraud." },
                { icon: "🏛️", label: "SC / ST Protection", detail: "Special protections under PoA Act 1989." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => alert(`${item.label}: ${item.detail}`)}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition cursor-pointer"
                >
                  <span className="text-3xl mb-2">{item.icon}</span>
                  <span className="text-xs font-semibold text-gray-800">{item.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/KnowledgeHub")}
              className="mt-6 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 px-6 py-2.5 rounded-lg text-sm font-semibold transition"
            >
              Explore All Legal Rights <span>→</span>
            </button>
          </div>

          {/* Right: Track FIR Status */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-blue-900 mb-1">Track Your FIR Status</h2>
            <p className="text-sm text-gray-600 mb-6">Enter your FIR details to check status online</p>

            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">FIR Number*</label>
                <input
                  type="text"
                  value={trackFirNumber}
                  onChange={(e) => setTrackFirNumber(e.target.value)}
                  placeholder="e.g. FIR/2024/09842"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Select State / Police Department</label>
                <select
                  value={trackState}
                  onChange={(e) => setTrackState(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option value="">Select State</option>
                  <option value="Delhi">Delhi Police</option>
                  <option value="Maharashtra">Maharashtra Police</option>
                  <option value="Uttar Pradesh">UP Police</option>
                  <option value="Karnataka">Karnataka Police</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow transition"
              >
                Track Status
              </button>
            </form>

            {trackResult && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900 space-y-1">
                <p className="font-bold">FIR: {trackResult.firNumber}</p>
                <p>Status: <span className="font-semibold text-green-700">{trackResult.status}</span></p>
                <p>Assigned Officer: {trackResult.assignedOfficer}</p>
                <p className="text-xs text-gray-500">Updated: {trackResult.lastUpdated}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 9. FAQs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-6">Common queries regarding FIR filing process in India</p>

            <div className="space-y-3">
              {[
                { q: "Can I file an FIR online?", a: "Yes, most state police departments allow online filing for non-cognizable offences, theft, and cyber crimes." },
                { q: "What is the difference between FIR and NCR?", a: "FIR is for cognizable offences where police can arrest without warrant. NCR (Non-Cognizable Report) is for minor offences." },
                { q: "What if police refuse to file an FIR?", a: "You can send the complaint in writing to the Superintendent of Police (SP) or file a Judicial Magistrate complaint under Section 156(3) CrPC." },
                { q: "Can I withdraw an FIR once filed?", a: "FIR for compoundable offences can be settled/withdrawn through court permission or High Court quashing under Section 482." },
                { q: "Is FIR required for insurance claims?", a: "Yes, for stolen vehicles, valuable property theft, or major accidents, an official copy of FIR is mandatory." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleFaq(idx)}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition bg-white"
                >
                  <div className="flex justify-between items-center font-semibold text-gray-800 text-sm">
                    <span>{item.q}</span>
                    <span className="text-blue-600 font-bold">{openFaq === idx ? "−" : "+"}</span>
                  </div>
                  {openFaq === idx && (
                    <p className="mt-3 text-sm text-gray-600 border-t pt-3 leading-relaxed">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Support Box */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center h-fit shadow-sm">
            <h4 className="font-bold text-gray-800 text-lg mb-2">Still Need Help?</h4>
            <p className="text-sm text-gray-600 mb-6">Talk to our AI legal assistant or consult a verified lawyer directly.</p>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/AskLawyer")}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Chat with AI
              </button>
              <button
                onClick={() => navigate("/services/lawyer-connect")}
                className="w-full border-2 border-orange-500 text-orange-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-50 transition"
              >
                Consult a Lawyer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 10. Bottom CTA Banner */}
      <div className="bg-gradient-to-r from-blue-800 to-orange-700 text-white py-12 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow">
          Ready to Get Legal Help?
        </h2>
        <p className="text-base sm:text-lg text-gray-100 max-w-2xl mx-auto">
          Join thousands of citizens who trust Kanoon Mitra for their legal needs.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/Dashboard")}
            className="bg-white text-blue-800 font-bold px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get Started Now
          </button>
          <button
            onClick={() => navigate("/KnowledgeHub")}
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Firpage;
