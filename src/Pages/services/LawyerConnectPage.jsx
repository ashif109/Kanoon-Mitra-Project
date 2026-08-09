import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";

const LawyerConnectPage = () => {
  const navigate = useNavigate();

  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const [formData, setFormData] = useState({
    serviceType: "LAWYER_CONNECT",
    fullName: "",
    email: "",
    phone: "",
    preferredMode: "Video Call",
    preferredDate: "",
    description: "",
  });
  const [lawyers, setlawyers] = useState([]);
  useEffect(() => {
    getdata();
  }, [])

  const getdata = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/lawyer-connect`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const list = await response.json();
      console.log("list", list);
      setlawyers(Array.isArray(list.lawyers) ? list.lawyers : []);
    } catch (err) {
      console.error("Lawyers Fetch error:", err);
    }
  }
  // const lawyers = [
  //   {
  //     id: 1,
  //     name: "Adv. Priya Sharma",
  //     title: "Senior High Court Advocate",
  //     experience: "14+ Years Exp",
  //     rating: "4.9 ★ (180+ Reviews)",
  //     specialty: "Criminal Law & FIR",
  //     city: "Delhi",
  //     languages: "English, Hindi",
  //     court: "Delhi High Court & Supreme Court",
  //     barId: "D/1482/2010",
  //     fee: "₹1,000 / session",
  //     img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  //   },
  //   {
  //     id: 2,
  //     name: "Adv. Rajesh Kumar",
  //     title: "Corporate & Property Specialist",
  //     experience: "12+ Years Exp",
  //     rating: "4.8 ★ (140+ Reviews)",
  //     specialty: "Property Law",
  //     city: "Mumbai",
  //     languages: "English, Hindi, Marathi",
  //     court: "Bombay High Court",
  //     barId: "MAH/942/2012",
  //     fee: "₹1,200 / session",
  //     img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
  //   },
  //   {
  //     id: 3,
  //     name: "Adv. Meera Patel",
  //     title: "Family Court & Custody Expert",
  //     experience: "10+ Years Exp",
  //     rating: "4.9 ★ (210+ Reviews)",
  //     specialty: "Family Law",
  //     city: "Ahmedabad",
  //     languages: "English, Hindi, Gujarati",
  //     court: "Gujarat High Court",
  //     barId: "GUJ/521/2014",
  //     fee: "₹1,000 / session",
  //     img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop&q=80",
  //   },
  //   {
  //     id: 4,
  //     name: "Adv. Vikram Malhotra",
  //     title: "Cyber Law & Financial Crime Attorney",
  //     experience: "15+ Years Exp",
  //     rating: "5.0 ★ (95+ Reviews)",
  //     specialty: "Cyber Law",
  //     city: "Bengaluru",
  //     languages: "English, Hindi, Kannada",
  //     court: "Karnataka High Court",
  //     barId: "KAR/883/2009",
  //     fee: "₹1,500 / session",
  //     img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  //   },
  //   {
  //     id: 5,
  //     name: "Adv. Sunita Rao",
  //     title: "Corporate & Startup Legal Counsel",
  //     experience: "11+ Years Exp",
  //     rating: "4.8 ★ (115+ Reviews)",
  //     specialty: "Corporate Law",
  //     city: "Hyderabad",
  //     languages: "English, Telugu, Hindi",
  //     court: "Telangana High Court",
  //     barId: "TS/632/2013",
  //     fee: "₹1,300 / session",
  //     img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
  //   },
  //   {
  //     id: 6,
  //     name: "Adv. Anirudh Bose",
  //     title: "Civil Litigation & Contract Advocate",
  //     experience: "16+ Years Exp",
  //     rating: "4.9 ★ (175+ Reviews)",
  //     specialty: "Civil Law",
  //     city: "Kolkata",
  //     languages: "English, Bengali, Hindi",
  //     court: "Calcutta High Court",
  //     barId: "WB/204/2008",
  //     fee: "₹1,100 / session",
  //     img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  //   },
  // ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert("Please fill in your Full Name, Phone Number, and Email Address.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...formData,
      lawyerId: openModal?.id,
      lawyerName: openModal?.name,
      lawyerSpecialty: openModal?.specialty,
      lawyerCity: openModal?.city,
      lawyerFee: openModal?.fee,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/services/lawyer-connect`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("Lawyer Connect appointment result:", result);

      const refId = `KM-LC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setBookingSuccess({
        refId,
        lawyerName: openModal?.name,
        specialty: openModal?.specialty,
        fee: openModal?.fee,
        mode: formData.preferredMode,
        date: formData.preferredDate || new Date().toLocaleDateString("en-IN"),
        clientName: formData.fullName,
        clientPhone: formData.phone,
      });
      setOpenModal(null);
    } catch (err) {
      console.error("Error submitting appointment:", err);
      // Fallback demo mode if backend is offline
      const refId = `KM-LC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setBookingSuccess({
        refId,
        lawyerName: openModal?.name,
        specialty: openModal?.specialty,
        fee: openModal?.fee,
        mode: formData.preferredMode,
        date: formData.preferredDate || new Date().toLocaleDateString("en-IN"),
        clientName: formData.fullName,
        clientPhone: formData.phone,
      });
      setOpenModal(null);
    } finally {
      setIsSubmitting(false);
    }
  };
  const filteredLawyers = lawyers.filter((lawyer) => {
    const specialty = lawyer.specialty || "";
    const city = lawyer.city || "";
    const name = lawyer.fullName || lawyer.name || "";
    const title = lawyer.title || "";

    const matchSpecialty =
      selectedSpecialty === "All" ||
      specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

    const matchCity =
      selectedCity === "All" ||
      city === selectedCity;

    const search = searchQuery.toLowerCase().trim();

    const matchSearch =
      search === "" ||
      name.toLowerCase().includes(search) ||
      specialty.toLowerCase().includes(search) ||
      title.toLowerCase().includes(search);

    return matchSpecialty && matchCity && matchSearch;
  });

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Section */}
      <header className="relative w-full min-h-[50vh] sm:min-h-[60vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/—Pngtree—lawyer signing legal documents with_16388702.jpg"
          alt="Lawyer Connect"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-purple-900/75 to-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[55vh] flex items-center">
          <div className="max-w-2xl space-y-6 text-white">
            <span className="inline-block px-3 py-1 bg-purple-500/30 border border-purple-400/40 rounded-full text-purple-200 text-xs font-semibold uppercase tracking-wider">
              Bar Council Verified Advocates
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Connect Directly with <br />
              <span className="text-purple-300">Top Advocates</span>
            </h1>

            <p className="text-gray-200 text-lg max-w-lg leading-relaxed">
              Find verified specialized advocates across India for court representation, legal opinions, document reviews, and direct consultations.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#lawyers-list"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition flex items-center gap-2"
              >
                Browse Advocates Directory <span className="text-xl">→</span>
              </a>
              <button
                onClick={() => navigate("/AskLawyer")}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition"
              >
                Ask AI Assistant First
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Key Highlights Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🛡️", title: "Bar Council Verified", sub: "Checked license & bar enrollment" },
            { icon: "🔒", title: "100% Confidential", sub: "Protected client privilege" },
            { icon: "⚡", title: "Fast Callbacks", sub: "Get slots within 24 hours" },
            { icon: "💳", title: "Transparent Pricing", sub: "No hidden consultation fees" },
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

      {/* 3. Filters & Search Directory */}
      <div id="lawyers-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-blue-950">Verified Advocates Directory</h2>
              <p className="text-gray-600 text-sm">Find specialized legal experts in your city</p>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
              />

              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Practice Areas</option>
                <option value="Criminal Law">Criminal Law & FIR</option>
                <option value="Property Law">Property & Real Estate</option>
                <option value="Family Law">Family & Custody</option>
                <option value="Cyber Law">Cyber Crime & IT Law</option>
                <option value="Corporate Law">Corporate & Business Law</option>
                <option value="Civil Law">Civil Litigation</option>
              </select>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Cities</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lawyer Cards Grid */}
        {filteredLawyers.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-bold text-gray-800 mt-2">No Advocates Found</h3>
            <p className="text-sm mt-1">Try resetting your search query or filters.</p>
            <button
              onClick={() => {
                setSelectedSpecialty("All");
                setSelectedCity("All");
                setSearchQuery("");
              }}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((user) => (
              <div key={user._id} className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative">
                    <img className="w-full h-52 object-cover" src={user.img} alt={user.fullName} />
                    <span className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow">
                      Verified
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                        {user.specialty}
                      </span>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {user.rating}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mt-3">{user.fullName}</h3>
                    <p className="text-xs text-gray-600 font-medium">{user.title}</p>
                    <p className="text-xs text-gray-500 mt-1">📍 {user.city} • ⚖️ {user.experience}</p>
                    <p className="text-xs text-gray-500 mt-1">🏛️ {user.court}</p>
                    <p className="text-[11px] text-gray-400 mt-1">🗣️ Languages: {user.languages}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">Consultation Fee</span>
                    <span className="text-base font-bold text-purple-900">{user.fee}</span>
                  </div>
                  <button
                    onClick={() => {
                      setOpenModal(user);

                      setFormData((prev) => ({
                        ...prev,
                        lawyerId: user._id,
                        lawyerName: user.fullName
                      }));
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition shadow"
                  >
                    Connect Now
                  </button>

                  {/* </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. FAQs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-blue-950 mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-sm mb-6">Learn more about connecting with advocates through Kanoon Mitra</p>

        <div className="space-y-3 max-w-4xl">
          {[
            { q: "Are all advocates verified on Kanoon Mitra?", a: "Yes, every lawyer listed undergo verification of their Bar Council Enrollment ID, High Court / District Court practice records, and professional credentials." },
            { q: "What happens after I request a connection?", a: "The advocate's legal team receives your consultation brief and contacts you on your preferred date/time via phone call, video meeting, or office visit." },
            { q: "Is my case brief kept confidential?", a: "Absolutely. All information shared is protected under Attorney-Client privilege under Section 126 of the Indian Evidence Act." },
            { q: "Can I request in-person court representation?", a: "Yes, during your consultation session you can discuss hiring the advocate for full case drafting, filing, and court representation." },
          ].map((faq, idx) => (
            <div
              key={idx}
              onClick={() => toggleFaq(idx)}
              className="bg-white border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center font-semibold text-gray-800 text-sm">
                <span>{faq.q}</span>
                <span className="text-purple-600 font-bold">{openFaq === idx ? "−" : "+"}</span>
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

      {/* Booking Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-in fade-in zoom-in">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>
            <div className="flex items-center gap-4 mb-5 border-b pb-4">
              <img className="w-14 h-14 rounded-full object-cover border-2 border-purple-500" src={openModal.img} alt={openModal.name} />
              <div>
                <h3 className="font-bold text-gray-900 text-base">{openModal.name}</h3>
                <p className="text-xs text-purple-700 font-semibold">{openModal.specialty} • {openModal.city}</p>
                <p className="text-xs text-gray-500 font-semibold">{openModal.fee}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Select Consultation Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Video Call", "Phone Call", "In-Person"].map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setFormData((prev) => ({ ...prev, preferredMode: mode }))}
                      className={`py-2 rounded-lg text-xs font-semibold border transition ${formData.preferredMode === mode
                        ? "bg-purple-600 text-white border-purple-600 shadow"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Your Full Name*</label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Mobile number"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Email Address*</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Brief Case Description</label>
                <textarea
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your legal query..."
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-lg shadow transition disabled:opacity-50"
              >
                {isSubmitting ? "Connecting..." : `Confirm Direct Connection (${openModal.fee})`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Booking Success Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative animate-in fade-in zoom-in">
            <div className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              ✅
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Connection Request Sent!</h3>
            <p className="text-xs text-gray-500 mb-4">
              Booking Ref: <strong className="text-purple-700 font-mono text-sm">{bookingSuccess.refId}</strong>
            </p>

            <div className="bg-purple-50 rounded-xl p-4 text-left text-xs space-y-1.5 border border-purple-100 mb-6 text-gray-800">
              <p><strong>Advocate:</strong> {bookingSuccess.lawyerName} ({bookingSuccess.specialty})</p>
              <p><strong>Client:</strong> {bookingSuccess.clientName}</p>
              <p><strong>Mode:</strong> {bookingSuccess.mode}</p>
              <p><strong>Scheduled Date:</strong> {bookingSuccess.date}</p>
              <p><strong>Consultation Fee:</strong> {bookingSuccess.fee}</p>
            </div>

            <p className="text-xs text-gray-600 mb-6">
              Advocate’s team will reach out to you at <strong>{bookingSuccess.clientPhone}</strong> to confirm the exact session slot.
            </p>

            <button
              onClick={() => setBookingSuccess(null)}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2.5 rounded-lg text-sm font-semibold shadow transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerConnectPage;

