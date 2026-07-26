import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RtiPage = () => {
  const navigate = useNavigate();

  const [department, setDepartment] = useState("Municipal Corporation / Civic Body");
  const [rtiSuccess, setRtiSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const [rtiForm, setRtiForm] = useState({
    applicantName: "",
    mobile: "",
    address: "",
    state: "Delhi",
    informationSought: "",
    period: "Current Year",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRtiForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rtiForm.applicantName || !rtiForm.mobile || !rtiForm.informationSought) {
      alert("Please fill in Applicant Name, Mobile Number, and Information Sought.");
      return;
    }
    setRtiSuccess(true);
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <header className="relative w-full min-h-[65vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/giammarco-boscaro-zeH-ljawHtg-unsplash.jpg"
          alt="RTI Filing Help"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/90 via-amber-900/75 to-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[55vh] flex items-center">
          <div className="max-w-2xl space-y-6 text-white">
            <span className="inline-block px-3 py-1 bg-amber-500/30 border border-amber-400/40 rounded-full text-amber-200 text-xs font-semibold uppercase tracking-wider">
              Starting from ₹200
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Right to Information <br />
              <span className="text-amber-300">RTI Filing Assistance</span>
            </h1>

            <p className="text-gray-200 text-lg max-w-lg leading-relaxed">
              Exercise your fundamental right under RTI Act 2005. Get expert drafting, Public Information Officer (PIO) identification, and response tracking.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#rti-wizard"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition flex items-center gap-2"
              >
                Draft RTI Application <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "📄", title: "Professional Drafting", sub: "Formulated as per RTI Act specs" },
            { icon: "🏛️", title: "Department Identification", sub: "Mapped to correct PIO / Ministry" },
            { icon: "⏱️", title: "30-Day Reply Tracking", sub: "Legal timeline monitoring" },
            { icon: "⚖️", title: "First Appeal Support", sub: "Assistance if response is delayed" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 flex items-center gap-4 hover:shadow-xl transition">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RTI Drafting Form */}
      <div id="rti-wizard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 uppercase">
              RTI Drafting Assistant
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">File an RTI Request</h2>
            <p className="text-gray-600 text-sm mt-2">Fill in what information you require from government departments.</p>
          </div>

          {rtiSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-xl mx-auto">
              <div className="text-5xl mb-3">📜</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">RTI Application Draft Ready!</h3>
              <p className="text-sm text-gray-700 mb-4">
                Thank you, <strong>{rtiForm.applicantName}</strong>. Your RTI request to <strong>{department}</strong> has been drafted. Our legal desk will format it with mandatory fee stamp & dispatch details.
              </p>
              <button
                onClick={() => setRtiSuccess(false)}
                className="bg-amber-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-700 transition"
              >
                File Another RTI
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Target Government Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                >
                  <option>Municipal Corporation / Civic Body</option>
                  <option>Public Works Dept (PWD) / Roads & Construction</option>
                  <option>Revenue & Land Records Office</option>
                  <option>Police Department & Passport Authority</option>
                  <option>Education Board & Public Universities</option>
                  <option>Income Tax & GST Department</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Name*</label>
                  <input
                    type="text"
                    name="applicantName"
                    value={rtiForm.applicantName}
                    onChange={handleInputChange}
                    placeholder="Full name as on Aadhaar"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={rtiForm.mobile}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Address for RTI Reply*</label>
                  <input
                    type="text"
                    name="address"
                    value={rtiForm.address}
                    onChange={handleInputChange}
                    placeholder="Full correspondence address with PIN code"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Information / Documents Sought*</label>
                <textarea
                  rows="4"
                  name="informationSought"
                  value={rtiForm.informationSought}
                  onChange={handleInputChange}
                  placeholder="Specify exact queries (e.g., status of road repair fund allocation, copy of tender documents, answer key copies)..."
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                ></textarea>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-600 block">RTI Drafting & Filing Fee:</span>
                  <span className="text-xl font-bold text-amber-950">₹200 <span className="text-xs text-gray-500 font-normal">(Includes Application Fee + SpeedPost tracking)</span></span>
                </div>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-3 rounded-lg shadow transition"
                >
                  Draft & File RTI (₹200)
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">RTI Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-4xl">
          {[
            { q: "What is the timeline for getting RTI response?", a: "By law under Section 7(1), Public Information Officers must reply within 30 days of receiving application." },
            { q: "Can I file RTI against private companies?", a: "Direct RTI applies to public authorities, but information about private bodies accessible through government regulators can be sought." },
            { q: "What if PIO rejects or fails to reply?", a: "You have the right to file First Appeal before First Appellate Authority within 30 days." },
          ].map((faq, idx) => (
            <div key={idx} onClick={() => toggleFaq(idx)} className="bg-white border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">
              <div className="flex justify-between items-center font-semibold text-gray-800 text-sm">
                <span>{faq.q}</span>
                <span className="text-amber-600 font-bold">{openFaq === idx ? "−" : "+"}</span>
              </div>
              {openFaq === idx && (
                <p className="mt-3 text-sm text-gray-600 border-t pt-3 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RtiPage;
