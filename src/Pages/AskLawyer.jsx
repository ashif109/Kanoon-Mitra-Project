import React, { useState } from "react";
import { API_BASE_URL } from "../config/api";

const AskLawyer = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    
serviceType:"ASK_LAWYERS",
    fullName: "",
    email: "",
    phone: "",
    category: "",
    title: "",
    question: "",
    answer:"",
    status:"pending",
    lawyerId: null,
    lawyerName: null,
    urgency: "",
    fee:"0"
  });

  // Chat state
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm Kanoon Mitra AI Legal Assistant. What legal question can I assist you with today?" },
  ]);
  const [chatInput, setChatInput] = useState("");

   const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.question) {
      alert("Please fill in Full Name, Email, and Detailed question.");
      return;
    }

    const response = await fetch("${API_BASE_URL}/AskLawyer", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (result) console.log("question-submitted...");

    setFormSubmitted(true);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    setTimeout(() => {
      let aiReply = "Thank you for sharing your concern. Based on Indian Law, we recommend gathering all relevant agreements, notices, or FIR copies. Would you like to connect with a specialized advocate for full consultation?";
      const lower = userText.toLowerCase();
      if (lower.includes("fir")) {
        aiReply = "Under Section 154 CrPC, an FIR must be registered for cognizable offences. You can also file a Zero FIR at any police station. Would you like to use our FIR Guidance tool?";
      } else if (lower.includes("divorce") || lower.includes("property")) {
        aiReply = "For property & family disputes, court jurisdiction is determined by where the property/marriage took place. We can connect you with an advocate within 24 hours.";
      }
      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full min-h-[50vh] sm:min-h-[60vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="w-full h-[420px] sm:h-[480px] object-cover"
          src="/images/low-key-filter-law-bookshelf-with-wooden-judge-s-gavel-golden-scale_34259-438 (1).jpg"
          alt="Ask a Lawyer"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/30"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <span className="bg-blue-600/40 border border-blue-400/40 text-blue-200 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-3">
            Legal Advice Desk
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Ask a Lawyer
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md text-gray-200">
            Get expert legal advice from verified lawyers. Submit your question and receive a detailed response within 24 hours.
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left Form Card */}
          <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Submit Your Legal Question
            </h2>

            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">Question Submitted!</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Thank you, <strong>{formData.fullName}</strong>. Your query under <strong>{formData.category}</strong> has been routed to our advocate desk. You will receive an email response within 24 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-blue-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
                >
                  Ask Another Question
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Legal Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Family Law">Family Law</option>
                    <option value="Criminal Law">Criminal Law</option>
                    <option value="Property Law">Property Law</option>
                    <option value="Corporate Law">Corporate Law</option>
                    <option value="Labor Law">Labor Law</option>
                    <option value="Cyber Law">Cyber Law</option>
                    <option value="Consumer Law">Consumer Law</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Brief subject of your legal question"
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description *</label>
                  <textarea
                    rows="4"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    placeholder="Please provide detailed information about your legal issue..."
                    className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    required
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
                        checked={formData.urgency === "low"}
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
                        checked={formData.urgency === "medium"}
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
                        checked={formData.urgency === "high"}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-red-600 font-semibold text-sm">High</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded-xl transition w-full shadow-lg"
                >
                  Submit Question
                </button>
              </form>
            )}
          </div>

          {/* Right Live Chat Card */}
          <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Instant Assistant Chat</h2>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                <div className="flex items-center mb-3 pb-3 border-b border-gray-200">
                  <div className="w-9 h-9 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    KM
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-gray-900 text-sm">Kanoon Mitra Assistant</h3>
                    <p className="text-xs text-green-600 font-semibold">● Online Now</p>
                  </div>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "items-start gap-2"}`}>
                      {msg.sender === "ai" && (
                        <div className="w-7 h-7 bg-blue-800 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-1">
                          KM
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-xl text-xs sm:text-sm max-w-xs ${
                          msg.sender === "user"
                            ? "bg-blue-800 text-white font-medium"
                            : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your legal question here..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-800 hover:bg-blue-900 text-white px-5 py-3 rounded-xl font-bold transition shadow"
                >
                  Send
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setMessages([{ sender: "ai", text: "Hello! How can I help you today?" }])}
                  className="text-xs text-blue-800 hover:underline font-semibold"
                >
                  Clear Chat History
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 text-center">
          {[
            { title: "1. Submit Question", desc: "Fill out the form with your legal question and relevant details.", icon: "1" },
            { title: "2. Expert Review", desc: "Our team of verified lawyers will review and analyze your case.", icon: "2" },
            { title: "3. Get Response", desc: "Receive a detailed legal response within 24 hours via email.", icon: "3" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-800 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AskLawyer;

