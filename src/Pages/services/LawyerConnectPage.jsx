import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LawyerConnectPage = () => {
  const navigate = useNavigate();

  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [openModal, setOpenModal] = useState(null);

  const lawyers = [
    {
      id: 1,
      name: "Adv. Priya Sharma",
      title: "Senior High Court Advocate",
      experience: "14+ Years Exp",
      rating: "4.9 ★ (180+ Reviews)",
      specialty: "Criminal Law & FIR",
      city: "Delhi",
      fee: "₹1,000 / session",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Adv. Rajesh Kumar",
      title: "Corporate & Property Specialist",
      experience: "12+ Years Exp",
      rating: "4.8 ★ (140+ Reviews)",
      specialty: "Property Law",
      city: "Mumbai",
      fee: "₹1,200 / session",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      name: "Adv. Meera Patel",
      title: "Family Court & Custody Expert",
      experience: "10+ Years Exp",
      rating: "4.9 ★ (210+ Reviews)",
      specialty: "Family Law",
      city: "Ahmedabad",
      fee: "₹1,000 / session",
      img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      name: "Adv. Vikram Malhotra",
      title: "Cyber Law & Financial Crime Attorney",
      experience: "15+ Years Exp",
      rating: "5.0 ★ (95+ Reviews)",
      specialty: "Cyber Law",
      city: "Bengaluru",
      fee: "₹1,500 / session",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    },
  ];

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchSpecialty = selectedSpecialty === "All" || lawyer.specialty.includes(selectedSpecialty);
    const matchCity = selectedCity === "All" || lawyer.city === selectedCity;
    return matchSpecialty && matchCity;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Section */}
      <header className="relative w-full min-h-[65vh] mt-16 sm:mt-20 overflow-hidden">
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
              Starting from ₹1000
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Connect Directly with <br />
              <span className="text-purple-300">Top Lawyers</span>
            </h1>

            <p className="text-gray-200 text-lg max-w-lg leading-relaxed">
              Find verified specialized advocates across India for court representation, legal opinions, document reviews, and direct consultations.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#lawyers-list"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition flex items-center gap-2"
              >
                Browse Lawyers Directory <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Filters & Directory */}
      <div id="lawyers-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-950">Verified Advocates Directory</h2>
            <p className="text-gray-600 text-sm">Showing verified lawyers available for direct consultation</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All Practice Areas</option>
              <option value="Criminal Law">Criminal Law</option>
              <option value="Property Law">Property Law</option>
              <option value="Family Law">Family Law</option>
              <option value="Cyber Law">Cyber Law</option>
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
            </select>
          </div>
        </div>

        {/* Lawyer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLawyers.map((lawyer) => (
            <div key={lawyer.id} className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition overflow-hidden flex flex-col justify-between">
              <div>
                <img className="w-full h-48 object-cover" src={lawyer.img} alt={lawyer.name} />
                <div className="p-5">
                  <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                    {lawyer.specialty}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 mt-2">{lawyer.name}</h3>
                  <p className="text-xs text-gray-600 font-medium">{lawyer.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{lawyer.experience} • {lawyer.city}</p>
                  <p className="text-xs text-amber-600 font-semibold mt-2">{lawyer.rating}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">Fee Starts</span>
                  <span className="text-base font-bold text-purple-900">{lawyer.fee}</span>
                </div>
                <button
                  onClick={() => setOpenModal(lawyer)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow"
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button onClick={() => setOpenModal(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold">
              ✕
            </button>
            <div className="flex items-center gap-4 mb-4">
              <img className="w-14 h-14 rounded-full object-cover" src={openModal.img} alt={openModal.name} />
              <div>
                <h3 className="font-bold text-gray-900 text-base">{openModal.name}</h3>
                <p className="text-xs text-purple-700 font-semibold">{openModal.specialty}</p>
                <p className="text-xs text-gray-500">{openModal.fee}</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Request sent to ${openModal.name}! The advocate's office will call you shortly.`);
                setOpenModal(null);
              }}
              className="space-y-4 text-sm"
            >
              <div>
                <label className="block font-medium text-gray-700 mb-1">Your Full Name*</label>
                <input required type="text" placeholder="Enter name" className="w-full border rounded-lg p-2.5" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Phone Number*</label>
                <input required type="tel" placeholder="Enter phone" className="w-full border rounded-lg p-2.5" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Case Brief</label>
                <textarea rows="3" placeholder="Briefly describe your case..." className="w-full border rounded-lg p-2.5"></textarea>
              </div>
              <button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 rounded-lg shadow transition">
                Confirm Direct Connection (₹1000)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerConnectPage;
