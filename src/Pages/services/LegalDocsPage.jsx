import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LegalDocsPage = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const documentTemplates = [
    {
      id: 1,
      title: "Residential House Rental Agreement",
      category: "Property",
      format: "PDF & DOCX",
      downloads: "14.2k downloads",
      desc: "Standard 11-month lease agreement with security deposit, notice period, and maintenance clauses.",
    },
    {
      id: 2,
      title: "General Power of Attorney (GPA)",
      category: "Property",
      format: "DOCX",
      downloads: "9.8k downloads",
      desc: "Draft template to authorize representation for property handling, utility sign-offs, and bank works.",
    },
    {
      id: 3,
      title: "Affidavit for Name Change in Gazette",
      category: "Personal",
      format: "PDF",
      downloads: "18.5k downloads",
      desc: "Legally accepted non-judicial stamp affidavit for official name correction or change.",
    },
    {
      id: 4,
      title: "Non-Disclosure Agreement (NDA)",
      category: "Business",
      format: "DOCX",
      downloads: "11.1k downloads",
      desc: "Bilateral confidential information protection agreement for startups, employees, and freelancers.",
    },
    {
      id: 5,
      title: "Legal Notice for Unpaid Dues Recovery",
      category: "Notices",
      format: "PDF & DOCX",
      downloads: "7.4k downloads",
      desc: "Formal advocate draft format to issue 15-day notice before initiating civil recovery proceedings.",
    },
    {
      id: 6,
      title: "Simple Will & Testament Draft",
      category: "Personal",
      format: "DOCX",
      downloads: "5.3k downloads",
      desc: "Clean draft for bequeathing movable and immovable assets to heirs with executor clauses.",
    },
  ];

  const filteredDocs = documentTemplates.filter((doc) => {
    return activeCategory === "All" || doc.category === activeCategory;
  });

  const handleDownload = (doc) => {
    setDownloadSuccess(doc.title);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <header className="relative w-full min-h-[65vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/open-book-beautiful-setting.jpg"
          alt="Free Legal Docs"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/80 to-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[55vh] flex items-center">
          <div className="max-w-2xl space-y-6 text-white">
            <span className="inline-block px-3 py-1 bg-teal-500/30 border border-teal-400/40 rounded-full text-teal-200 text-xs font-semibold uppercase tracking-wider">
              100% Free Downloads
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Verified Legal <br />
              <span className="text-teal-300">Documents & Formats</span>
            </h1>

            <p className="text-gray-200 text-lg max-w-lg leading-relaxed">
              Download professionally crafted legal agreements, affidavits, applications, and notices. Verified by Indian Advocates.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#docs-grid"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition flex items-center gap-2"
              >
                Explore Templates Library <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {downloadSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-teal-800 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-teal-400">
          <span className="text-2xl">📥</span>
          <div>
            <h4 className="font-bold text-sm">Download Started</h4>
            <p className="text-xs text-teal-100">{downloadSuccess}</p>
          </div>
        </div>
      )}

      {/* Templates Library */}
      <div id="docs-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Legal Documents Library</h2>
            <p className="text-gray-600 text-sm">Select and download customizable formats for your legal needs</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Property", "Personal", "Business", "Notices"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeCategory === cat
                    ? "bg-teal-700 text-white shadow-md"
                    : "bg-white text-gray-700 border hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    {doc.category}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{doc.format}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{doc.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{doc.desc}</p>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">{doc.downloads}</span>
                <button
                  onClick={() => handleDownload(doc)}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow flex items-center gap-1.5"
                >
                  Download Free <span>⬇</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalDocsPage;
