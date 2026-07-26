import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter a legal topic, query, or service to search.");
      return;
    }
    const query = searchQuery.toLowerCase();
    if (query.includes("fir")) {
      navigate("/services/fir-guidance");
    } else if (query.includes("consult") || query.includes("lawyer")) {
      navigate("/services/legal-consultation");
    } else if (query.includes("rti")) {
      navigate("/services/rti-filing");
    } else if (query.includes("cyber") || query.includes("fraud")) {
      navigate("/services/cyber-complaint");
    } else if (query.includes("doc") || query.includes("agreement") || query.includes("template")) {
      navigate("/services/free-legal-docs");
    } else {
      navigate("/KnowledgeHub");
    }
  };

  const faqsData = [
    {
      question: "What is Kanoon Mitra?",
      answer:
        "Kanoon Mitra is an AI-powered legal assistance platform designed to make legal information simple, accessible, and understandable for everyone. It helps users learn about their legal rights, explore laws in plain language, and connect with trusted legal resources.",
    },
    {
      question: "Can I rely on the legal information provided?",
      answer:
        "Kanoon Mitra provides educational legal guidance based on reliable legal sources. While we strive for accuracy, the information should not be considered a substitute for professional legal advice. For complex or case-specific matters, we recommend consulting a qualified lawyer.",
    },
    {
      question: "Who can use Kanoon Mitra?",
      answer:
        "Anyone can use Kanoon Mitra, including students, working professionals, entrepreneurs, senior citizens, and individuals seeking legal awareness or guidance. No prior legal knowledge is required.",
    },
    {
      question: "How does the AI Legal Assistant work?",
      answer:
        "Simply ask your legal question in natural language. The AI analyzes your query and provides easy-to-understand explanations, relevant legal information, and guidance to help you better understand your situation.",
    },
    {
      question: "Can Kanoon Mitra connect me with a lawyer?",
      answer:
        "Yes. If your matter requires professional legal assistance, Kanoon Mitra can help you connect with verified legal professionals for personalized consultation and further legal support.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We prioritize your privacy by using secure technologies and following best practices to protect your personal information. Your data is handled responsibly and is never shared without your consent.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="w-full h-140 object-cover"
          src="/images/giammarco-boscaro-zeH-ljawHtg-unsplash.jpg"
          alt="Kanoon Mitra Hero"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/30"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <span className="bg-red-700/80 border border-red-400 text-red-100 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3">
            Digital Legal Assistance
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Justice Made Simple
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-xl drop-shadow-md text-gray-200">
            Your Digital Legal Friend. Access legal information, connect with lawyers, and understand your rights with ease.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6 w-full max-w-xl">
            <input
              className="bg-black/70 w-full border border-amber-50 rounded-xl p-3 text-white placeholder-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for FIR, RTI, Cyber fraud, or ask a question..."
            />
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-800 hover:shadow-red-400/50 hover:shadow-lg transition-all duration-300 px-6 py-3 rounded-xl text-white font-bold text-base whitespace-nowrap w-full sm:w-auto"
            >
              Search
            </button>
          </form>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              onClick={() => navigate("/AskLawyer")}
              className="hover:shadow-indigo-400/50 hover:shadow-lg transition-all duration-300 border border-amber-50 rounded-xl bg-white px-6 py-2.5 text-blue-800 font-bold text-sm sm:text-base"
            >
              Ask a Lawyer
            </button>
            <button
              onClick={() => navigate("/services")}
              className="hover:shadow-indigo-400/50 hover:shadow-lg transition-all duration-300 border border-amber-50 rounded-xl bg-black/80 px-6 py-2.5 text-white font-bold text-sm sm:text-base"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="flex flex-col items-center justify-center text-center my-12 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900">
          Why Choose Kanoon Mitra?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl">
          We make legal assistance accessible, affordable, and easy to understand for every Indian citizen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-10 mb-12">
        {[
          {
            title: "Expert Legal Advice",
            desc: "Get professional legal guidance from verified advocates across India.",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ),
          },
          {
            title: "Free Legal Documents",
            desc: "Access a library of free legal documents, agreements, and templates.",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            ),
          },
          {
            title: "24/7 Support System",
            desc: "Round-the-clock legal awareness, guidance, and assistance system.",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            ),
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="hover:scale-105 transition-transform duration-300 bg-white shadow-xl border border-gray-100 rounded-2xl flex flex-col justify-between items-center p-8 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-orange-700 rounded-full flex items-center justify-center text-white mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {item.icon}
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Impact Stats */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-4 sm:px-8">
          {[
            ["10,000+", "Citizens Helped"],
            ["500+", "Expert Lawyers"],
            ["50+", "Legal Documents"],
            ["95%", "Satisfaction Rate"],
          ].map(([num, text], idx) => (
            <div key={idx}>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-orange-400">{num}</h3>
              <p className="text-gray-200 mt-2 text-sm sm:text-base">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Have questions? We’re here to help you with everything you need to know.
            </p>
          </div>

          <div className="space-y-4">
            {faqsData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md bg-white"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full py-5 px-6 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span
                      className={`ml-6 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-blue-600 text-white" : ""
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100 pb-5 px-6" : "max-h-0 opacity-0 px-6"
                    }`}
                  >
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <div className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-800 to-orange-700 text-white py-12 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
          Ready to Get Legal Help?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl">
          Join thousands of citizens who trust Kanoon Mitra for their legal needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/Dashboard")}
            className="hover:shadow-lg transition-all duration-300 border border-amber-50 rounded-xl bg-white px-8 py-3 text-blue-800 font-bold text-base"
          >
            Get Started Now
          </button>
          <button
            onClick={() => navigate("/KnowledgeHub")}
            className="hover:shadow-lg transition-all duration-300 border border-white rounded-xl bg-transparent px-8 py-3 text-white font-bold text-base hover:bg-white/10"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
