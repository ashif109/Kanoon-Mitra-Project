import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  const userName = user?.name || "Ashif Ansari";
  const userEmail = user?.email || "ashifansari04704@gmail.com";
  const userPhone = user?.mobile || "+91 11223 45678";

  const MyLegalQuestions = () => {
    const questions = [
      {
        title: "Property Dispute with Neighbor",
        category: "Property Law",
        date: "15 Jan 2024",
        status: "Answered",
        answeredBy: "Adv. Priya Sharma",
        answerText: "Based on your description, you have a strong case under Property & Partition rules...",
      },
      {
        title: "Consumer Rights - Online Purchase",
        category: "Consumer Law",
        date: "12 Jan 2024",
        status: "Pending",
      },
      {
        title: "Employment Contract Review",
        category: "Labor Law",
        date: "10 Jan 2024",
        status: "Answered",
        answeredBy: "Adv. Rajesh Kumar",
        answerText: "Your employment contract appears to be standard under Shops & Establishment Act...",
      },
    ];

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Legal Questions</h2>
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{q.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">{q.category} • {q.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    q.status === "Answered"
                      ? "text-green-700 bg-green-100"
                      : "text-yellow-700 bg-yellow-100"
                  }`}
                >
                  {q.status}
                </span>
              </div>
              {q.status === "Answered" && (
                <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-blue-700 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="font-bold text-blue-900 text-sm">Answered by {q.answeredBy}</span>
                  </div>
                  <p className="text-blue-800 text-sm">{q.answerText}</p>
                </div>
              )}
              <div className="flex space-x-3">
                <button className="text-blue-800 hover:text-blue-900 font-bold text-sm cursor-pointer">
                  View Details
                </button>
                {q.status === "Pending" && (
                  <button className="text-gray-500 hover:text-gray-700 font-medium text-sm cursor-pointer">
                    Cancel Question
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SavedArticles = () => {
    const articles = [
      {
        category: "Criminal Law",
        title: "How to File an FIR: Complete Step-by-Step Guide",
        author: "Adv. Priya Sharma",
        date: "15 Jan 2024",
        readTime: "8 min read",
      },
      {
        category: "Family Law",
        title: "Women Rights in India: A Comprehensive Guide",
        author: "Adv. Meera Patel",
        date: "12 Jan 2024",
        readTime: "12 min read",
      },
      {
        category: "Property Law",
        title: "Property Dispute Resolution: Legal Options Available",
        author: "Adv. Rajesh Kumar",
        date: "10 Jan 2024",
        readTime: "10 min read",
      },
    ];

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <button className="text-red-500 hover:text-red-700 cursor-pointer">
                    🗑️
                  </button>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base leading-snug">{article.title}</h3>
                <p className="text-xs text-gray-600 mb-3 font-medium">By {article.author}</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <button className="w-full mt-3 bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 rounded-xl text-xs transition cursor-pointer">
                  Read Article →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Questions */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Questions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Property Dispute with Neighbor</p>
                      <p className="text-xs text-gray-500 font-medium">15 Jan 2024</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold text-green-700 bg-green-100">
                      Answered
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Consumer Rights - Online Purchase</p>
                      <p className="text-xs text-gray-500 font-medium">12 Jan 2024</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold text-yellow-700 bg-yellow-100">
                      Pending
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Employment Contract Review</p>
                      <p className="text-xs text-gray-500 font-medium">10 Jan 2024</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold text-green-700 bg-green-100">
                      Answered
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Downloads */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Downloads</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">FIR Application Form</p>
                      <p className="text-xs text-gray-500 font-medium">15 Jan 2024</p>
                    </div>
                    <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">PDF</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Rental Agreement Template</p>
                      <p className="text-xs text-gray-500 font-medium">12 Jan 2024</p>
                    </div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">DOCX</span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Consumer Complaint Format</p>
                      <p className="text-xs text-gray-500 font-medium">10 Jan 2024</p>
                    </div>
                    <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "questions":
        return <MyLegalQuestions />;

      case "articles":
        return <SavedArticles />;

      case "downloads":
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloaded Documents</h2>
            <div className="space-y-4">
              {["FIR Application Form", "Rental Agreement Template", "Consumer Complaint Format"].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-4 text-xl">
                      📄
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{doc}</h3>
                      <p className="text-xs text-gray-500">Details • 245 KB • 15 Jan 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">PDF</span>
                    <button className="text-blue-800 hover:text-blue-900 font-bold text-sm cursor-pointer">
                      Download ⬇
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={userName}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={userEmail}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={userPhone}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Account Type</label>
                  <input
                    type="text"
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold"
                    value={user?.accountType || "Citizen / Client"}
                  />
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-blue-800 text-white font-bold px-6 py-3 rounded-xl shadow hover:bg-blue-900 transition cursor-pointer text-sm">
                  Update Profile Information
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* HERO IMAGE BANNER */}
      <div className="relative w-full min-h-[65vh] mt-16 sm:mt-20">
        <div className="w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[21/9] lg:aspect-[16/6] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/images/5321305.jpg"
            alt="Law background"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200";
            }}
          />
        </div>

        <div className="font-poppins absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white px-4 sm:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg text-center md:text-left">
              Welcome back, <span className="text-orange-400">{userName}</span>!
            </h1>
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
              <img
                className="w-full h-full object-cover"
                src={user?.avatar || "/images/Profile pic.jpeg"}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80";
                }}
              />
            </div>
          </div>
          <p className="text-sm sm:text-lg md:text-xl max-w-3xl drop-shadow-md text-center text-gray-200">
            Manage your legal queries, saved content, consultation appointments, and document downloads.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10 px-4">
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Saved Articles</p>
              <p className="text-3xl font-extrabold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">My Legal Questions</p>
              <p className="text-3xl font-extrabold text-gray-900">08</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="mt-10 max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap border-b border-gray-200 text-sm font-bold">
          {["overview", "questions", "articles", "downloads", "profile"].map((tab) => (
            <button
              key={tab}
              className={`mr-6 pb-3 transition cursor-pointer capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-800 text-blue-800"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
