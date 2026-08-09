import React, { useState } from "react";
import { API_BASE_URL } from "../../config/api";
// import { useNavigate } from "react-router-dom";

const LegalConsultationPage = () => {
  // const navigate = useNavigate();

  const [title, settitle] = useState("Civil Law");
  const [consultationType, setConsultationType] = useState("Online Video Call");
  const [openFaq, setOpenFaq] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    serviceType: "LEGAL_CONSULTATION",
    name: "",
    email: "",
    phone: "",
    date: "",
    title,
    question: "",
    answer: "",
    status: "pending",
    lawyerId: null,
    lawyerName: null,
    consultationType,
    urgency: "",
    fee:"500"

  });

  const handleInputChange = (e) => {

    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date) {
      alert("Please fill in your Name, Phone Number, and Preferred Date.");
      return;
    }
    let response = await fetch(`${API_BASE_URL}/legal-consultation`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingForm),
    })
    const result = await response.json();
    if (result) console.log("form submitted...")
    setBookingSuccess(true);
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const practiceAreas = [
    { title: "Civil Law", desc: "Property disputes, contract breaches, recovery suits, land disputes.", icon: "🏛️" },
    { title: "Criminal Defense", desc: "Bail matters, FIR quashing, criminal complaints, harassment cases.", icon: "⚖️" },
    { title: "Family & Marriage", desc: "Divorce, child custody, alimony, mutual consent separation.", icon: "👨‍👩‍👧" },
    { title: "Corporate & Startup", desc: "Co-founder agreements, IP rights, contract reviews, compliance.", icon: "🏢" },
    { title: "Consumer Disputes", desc: "Defective products, service deficiency, insurance claim rejections.", icon: "🛒" },
    { title: "Labor & Employment", desc: "Wrongful termination, unpaid salary, workplace harassment.", icon: "💼" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Banner */}
      <header className="relative w-full min-h-[50vh] sm:min-h-[60vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/lawyers-handshake-agreement.jpg"
          alt="Legal Consultation"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-black/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[55vh] flex items-center">
          <div className="max-w-2xl space-y-6 text-white">
            <span className="inline-block px-3 py-1 bg-blue-500/30 border border-blue-400/40 rounded-full text-blue-200 text-xs font-semibold uppercase tracking-wider">
              Starting from ₹500
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Expert Legal <br />
              <span className="text-orange-400">Consultation</span>
            </h1>

            <p className="text-gray-200 text-lg max-w-lg leading-relaxed">
              Get confidential and expert legal advice from top verified advocates in India. Speak via video, phone, or in-person consultation.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#book-consultation"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition flex items-center gap-2"
              >
                Book Session Now <span className="text-xl">→</span>
              </a>
              <a
                href="#practice-areas"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 px-8 py-3 rounded-lg font-semibold transition"
              >
                Explore Practice Areas
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Key Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🛡️", title: "100% Confidential", sub: "Privileged client-lawyer secrecy" },
            { icon: "👨‍⚖️", title: "Verified Lawyers", sub: "Bar Council registered advocates" },
            { icon: "⚡", title: "Instant Advice", sub: "Get slots within 30 minutes" },
            { icon: "💳", title: "Transparent Fee", sub: "Flat ₹500 starting rate" },
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

      {/* 3. Practice Areas Selector */}
      <div id="practice-areas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Select Practice Area</h2>
        <p className="text-gray-600 mb-8">We have experienced legal specialists across all major law domains</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, idx) => (
            <div
              key={idx}
              onClick={() => settitle(area.title)}
              className={`bg-white rounded-xl border p-6 transition cursor-pointer ${title === area.title
                ? "border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/40 shadow-md"
                : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                }`}
            >
              <div className="text-4xl mb-3">{area.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{area.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Consultation Booking Form */}
      <div id="book-consultation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 uppercase">
              Selected: {title}
            </span>
            <h2 className="text-3xl font-bold text-blue-950 mt-3">Book Your Legal Consultation</h2>
            <p className="text-gray-600 text-sm mt-2">Fill out your details to schedule a dedicated 30-minute consultation slot.</p>
          </div>

          {bookingSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-xl mx-auto">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">Consultation Booked Successfully!</h3>
              <p className="text-sm text-gray-700 mb-4">
                Thank you, <strong>{bookingForm.name}</strong>. Our legal coordinator will contact you at <strong>{bookingForm.phone}</strong> for your <strong>{title}</strong> session on <strong>{bookingForm.date}</strong>.
              </p>
              <button
                onClick={() => setBookingSuccess(false)}
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
              >
                Book Another Consultation
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="max-w-3xl mx-auto space-y-6">
              {/* Consultation Type Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Select Mode of Consultation</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["Online Video Call", "Phone Call", "In-Office Visit"].map((mode, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => {
                        setConsultationType(mode);
                        setBookingForm({
                          ...bookingForm,
                          consultationType: mode,
                        });
                      }}
                      className={`p-4 rounded-xl border text-center font-medium text-sm transition ${consultationType === mode
                        ? "border-blue-600 bg-blue-600 text-white shadow-md"
                        : "border-gray-200 text-gray-700 bg-gray-50 hover:bg-gray-100"
                        }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date*</label>
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brief Description of Legal Issue</label>
                <textarea
                  rows="4"
                  name="question"
                  value={bookingForm.question}
                  onChange={handleInputChange}
                  placeholder="Summarize your issue so the lawyer can review before the session..."
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>
              <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</p>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      value="low"
                      checked={bookingForm.urgency === "low"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-green-600 font-semibold text-sm">Low</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      value="medium"
                      checked={bookingForm.urgency === "medium"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-amber-600 font-semibold text-sm">Medium</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      value="high"
                      checked={bookingForm.urgency === "high"}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-red-600 font-semibold text-sm">High</span>
                  </label>
                </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-600 block">Total Payable Fee:</span>
                    <span className="text-xl font-bold text-blue-900">₹500 <span className="text-xs text-gray-500 font-normal">(Inclusive of all taxes)</span></span>
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-lg shadow-md transition"
                  >
                    Proceed & Pay ₹500
                  </button>
                </div>
            </form>
          )}
        </div>
      </div>

      {/* 5. FAQs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-4xl">
          {[
            { q: "How long is a legal consultation session?", a: "Each standard consultation session lasts 30 minutes, giving ample time to discuss your case in detail." },
            { q: "Is my consultation completely confidential?", a: "Yes. All discussions are protected under Attorney-Client Privilege." },
            { q: "Can I choose a specific lawyer?", a: "Yes, you can request a lawyer by experience level, language preference, or specialization area." },
            { q: "What if I need follow-up assistance?", a: "After the session, you receive a written summary and option to hire the lawyer for full case representation." },
          ].map((faq, idx) => (
            <div key={idx} onClick={() => toggleFaq(idx)} className="bg-white border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">
              <div className="flex justify-between items-center font-semibold text-gray-800 text-sm">
                <span>{faq.q}</span>
                <span className="text-blue-600 font-bold">{openFaq === idx ? "−" : "+"}</span>
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

export default LegalConsultationPage;
