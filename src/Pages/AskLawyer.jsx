<<<<<<< HEAD
import React, { useState } from "react";

const AskLawyer = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "Family Law",
    subject: "",
    description: "",
    urgency: "medium",
  });

  // Chat state
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm Kanoon Mitra AI Legal Assistant. What legal question can I assist you with today?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.description) {
      alert("Please fill in Full Name, Email, and Detailed Description.");
      return;
    }
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
      <div className="relative w-full min-h-[65vh] mt-16 sm:mt-20 overflow-hidden">
        <img
          className="w-full h-120 object-cover"
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
=======
import React from "react";

const AskLawyer = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] mt-16 sm:mt-20">
        <img
          className="w-full h-120 object-cover"
          src="/images/low-key-filter-law-bookshelf-with-wooden-judge-s-gavel-golden-scale_34259-438 (1).jpg"
          alt="img"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Ask a Lawyer
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md">
            Get expert legal advice from verified lawyers. Submit your question
            and receive a detailed response within 24 hours.
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
          </p>
        </div>
      </div>

<<<<<<< HEAD
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
                    name="subject"
                    value={formData.subject}
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
                    name="description"
                    value={formData.description}
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
=======
      {/* Main Form Section */}
      <div className="flex flex-col lg:flex-row justify-between p-10 gap-8 mx-4 sm:mx-10 mb-10 text-center">

        {/* Left Form Card */}
        <div className="transition-transform duration-300 bg-white shadow-2xl rounded-lg flex flex-col items-start p-6 hover:shadow-indigo-400/50 w-full lg:w-[48%]">

          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 w-full text-center">
            Submit Your Legal Question
          </h1>

          <label className="font-medium text-left">Full Name *</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          />

          <label className="font-medium text-left mt-4">Email Address *</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          />

          <label className="font-medium text-left mt-4">Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          />

          <label className="font-medium text-left mt-4">Legal Category *</label>
          <select className="border border-gray-300 p-2 rounded-md w-full mt-1">
            <option>Select a category</option>
            <option>Family Law</option>
            <option>Criminal Law</option>
            <option>Property Law</option>
            <option>Corporate Law</option>
            <option>Labor Law</option>
            <option>Tax Law</option>
            <option>Cyber Law</option>
            <option>Consumer Law</option>
            <option>Other</option>
          </select>

          <label className="font-medium text-left mt-4">Subject *</label>
          <input
            type="text"
            placeholder="Brief subject of your legal question"
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          />

          <label className="font-medium text-left mt-4">
            Detailed Description *
          </label>
          <textarea
            rows="6"
            placeholder="Please provide detailed information about your legal issue..."
            className="border border-gray-300 p-2 rounded-md w-full mt-1"
          ></textarea>

          {/* Urgency */}
          <p className="font-medium text-left mt-4">Urgency Level</p>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center">
              <input type="radio" name="urgency" className="mr-2" value="low" />
              <span className="text-green-600 font-medium">Low</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                className="mr-2"
                value="medium"
                defaultChecked
              />
              <span className="text-yellow-600 font-medium">Medium</span>
            </label>

            <label className="flex items-center">
              <input type="radio" name="urgency" className="mr-2" value="high" />
              <span className="text-red-600 font-medium">High</span>
            </label>
          </div>
 <br />
            <button type="button" className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full lg:w-[100%]">Submit Question</button>
        </div>

        {/* Right Chat Card */}
        <div className="transition-transform duration-300 bg-white shadow-2xl rounded-xl p-6 hover:shadow-indigo-400/50 w-full lg:w-[48%]">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Chat Support</h2>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">

            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indian-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">KM</span>
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-gray-900">Kanoon Mitra Assistant</h3>
                <p className="text-sm text-gray-600">Online now</p>
              </div>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">

              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-indian-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">KM</span>
                </div>

                <div className="bg-white rounded-lg p-3 max-w-sm shadow-sm">
                  <p className="text-sm text-gray-800">
                    Hello! I'm here to help you with legal questions. What can I assist you with today?
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-blue-800 text-white rounded-lg p-3 max-w-sm">
                  <p className="text-sm">I need help with property dispute</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-indian-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">KM</span>
                </div>

                <div className="bg-white rounded-lg p-3 max-w-sm shadow-sm">
                  <p className="text-sm text-gray-800">
                    I can help you with property disputes. Would you like to:<br />
                    • Get general guidance<br />
                    • Connect with a property lawyer<br />
                    • Download relevant documents
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-blue focus:border-transparent"
              />
              <button class="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M22 2 11 13"></path>
    <path stroke-linecap="round" stroke-linejoin="round"
          d="M22 2 15 22 11 13 2 9 22 2z"></path>
  </svg>
</button>

            </div>

            <div className="text-center">
              <button className="text-blue-800 hover:text-blue-700 font-medium">
                Start a new conversation
              </button>
            </div>
          </div>

        </div>
      </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-10 mb-10 text-center shadow-2xl">
        {[
          {
            title: "Submit Question",
            desc: "Fill out the form with your legal question and relevant details.",
            icon: "1"
          },
          {
            title: "Expert Review",
            desc: "Our team of verified lawyers will review and analyze your case.",
            icon: "2"
          },
          {
            title: "Get Response",
            desc: "Receive a detailed legal response within 24 hours via email",
            icon: "3"
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className=" bg-white  rounded-lg flex flex-col justify-end items-center p-6 "
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-800 to-orange-700 rounded-full flex items-center justify-center text-white mb-6 text-4xl font-bold">
             
                {item.icon}
              
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {item.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-xs">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
     </div>
>>>>>>> 329acda15b55fc1ff2b915c19aed00ee9a4671cf
  );
};

export default AskLawyer;
