import React, { useState } from "react";
import { API_BASE_URL } from "../../config/api";
// import { useNavigate } from "react-router-dom";

const CyberComplaintPage = () => {
  // const navigate = useNavigate();

  const [crimeCategory, setCrimeCategory] = useState("Online Banking Fraud / UPI Fraud");
  const [complaintSuccess, setComplaintSuccess] = useState(false);

  const [cyberForm, setCyberForm] = useState({
      serviceType: "CYBER-COMPLAINT",
    victimName: "",
    phone: "",
    transactionId: "",
    amountLost: "",
    incidentSummary: "",
    bankName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCyberForm({ ...cyberForm, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!cyberForm.victimName || !cyberForm.phone || !cyberForm.incidentSummary) {
      alert("Please fill in Victim Name, Phone Number, and Incident Summary.");
      return;
    }
    let response = await fetch(`${API_BASE_URL}/services/rti-filing`, {
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      method:"POST",
      body:JSON.stringify(cyberForm)
    })
    const result= await response.json();
    if(result) console.log("form submitted...");
    setComplaintSuccess(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <header className="relative w-full min-h-[50vh] sm:min-h-[60vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/giammarco-boscaro-zeH-ljawHtg-unsplash.jpg"
          alt="Cyber Complaint Assist"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-red-900/80 to-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[55vh] flex items-center">
          <div className="max-w-2xl space-y-6 text-white">
            <span className="inline-block px-3 py-1 bg-red-500/30 border border-red-400/40 rounded-full text-red-200 text-xs font-semibold uppercase tracking-wider">
              Starting from ₹300
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Cyber Crime & Fraud <br />
              <span className="text-red-400">Complaint Assist</span>
            </h1>

            <p className="text-gray-200 text-lg max-w-lg leading-relaxed">
              Immediate guidance to freeze stolen funds, draft cyber cell complaints, report digital fraud, and safeguard digital identity.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#cyber-form"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition flex items-center gap-2"
              >
                File Cyber Assist Report <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Immediate Helpline Warning */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-8">
        <div className="bg-red-600 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🚨</span>
            <div>
              <h3 className="font-bold text-lg">Financial Cyber Fraud Golden Hour Helpline</h3>
              <p className="text-xs text-red-100 mt-0.5">If money was debited in last 2 hours, call Govt Cyber Fraud Helpline immediately.</p>
            </div>
          </div>
          <a
            href="tel:1930"
            className="bg-white text-red-700 font-extrabold px-6 py-3 rounded-xl hover:bg-red-50 transition text-center whitespace-nowrap"
          >
            Call National Helpline 1930
          </a>
        </div>
      </div>

      {/* Cyber Form Section */}
      <div id="cyber-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200 uppercase">
              Cyber Incident Filing
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">Report Cyber Offence</h2>
            <p className="text-gray-600 text-sm mt-2">Get structured documentation for National Cyber Crime Portal & Police Cyber Cell.</p>
          </div>

          {complaintSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-xl mx-auto">
              <div className="text-5xl mb-3">🛡️</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Cyber Dossier Generated!</h3>
              <p className="text-sm text-gray-700 mb-4">
                Thank you, <strong>{cyberForm.victimName}</strong>. Your cyber incident report regarding <strong>{crimeCategory}</strong> has been drafted with evidence preservation guidelines.
              </p>
              <button
                onClick={() => setComplaintSuccess(false)}
                className="bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
              >
                Submit Another Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Select Cyber Crime Category</label>
                <select
                  value={crimeCategory}
                  onChange={(e) => setCrimeCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none bg-white"
                >
                  <option>Online Banking Fraud / UPI Fraud</option>
                  <option>Identity Theft & Social Media Hacking</option>
                  <option>Cyber Stalking & Online Harassment</option>
                  <option>Crypto Investment Fraud / Work From Home Scam</option>
                  <option>Ransomware & Malicious Software Attack</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Victim / Complainant Name*</label>
                  <input
                    type="text"
                    name="victimName"
                    value={cyberForm.victimName}
                    onChange={handleInputChange}
                    placeholder="Enter full legal name"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={cyberForm.phone}
                    onChange={handleInputChange}
                    placeholder="Linked mobile number"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name / App Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={cyberForm.bankName}
                    onChange={handleInputChange}
                    placeholder="e.g. SBI, HDFC, GPay, WhatsApp"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Lost (if financial)</label>
                  <input
                    type="text"
                    name="amountLost"
                    value={cyberForm.amountLost}
                    onChange={handleInputChange}
                    placeholder="e.g. ₹25,000"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Incident Summary & Evidence Details*</label>
                <textarea
                  rows="4"
                  name="incidentSummary"
                  value={cyberForm.incidentSummary}
                  onChange={handleInputChange}
                  placeholder="Describe phishing link clicked, fake caller details, transaction IDs, profile URLs..."
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                ></textarea>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-600 block">Assistance Fee:</span>
                  <span className="text-xl font-bold text-red-950">₹300 <span className="text-xs text-gray-500 font-normal">(Includes Police Cyber Cell Complaint Drafting)</span></span>
                </div>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg shadow transition"
                >
                  Generate Cyber Dossier (₹300)
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CyberComplaintPage;
