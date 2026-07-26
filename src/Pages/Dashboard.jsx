import React, { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const MyLegalQuestions = () => {
    const questions = [
      {
        title: "Property Dispute with Neighbor",
        category: "Property Law",
        date: "15 Jan 2024",
        status: "Answered",
        answeredBy: "Adv. Priya Sharma",
        answerText: "Based on your description, you have a strong case...",
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
        answerText: "Your employment contract appears to be standard...",
      },
    ];

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Legal Questions</h2>
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{q.title}</h3>
                  <p className="text-sm text-gray-600">{q.category} • {q.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    q.status === "Answered"
                      ? "text-green-600 bg-green-100"
                      : "text-yellow-600 bg-yellow-100"
                  }`}
                >
                  {q.status}
                </span>
              </div>
              {q.status === "Answered" && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-blue-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    <span className="font-medium text-blue-900">Answered by {q.answeredBy}</span>
                  </div>
                  <p className="text-blue-800">{q.answerText}</p>
                </div>
              )}
              <div className="flex space-x-3">
                <button className="text-indian-blue hover:text-blue-700 font-medium text-sm">
                  View Details
                </button>
                {q.status === "Pending" && (
                  <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">
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

    const handleDelete = (title) => {
      console.log("Delete clicked:", title);
    };

    const handleRead = (title) => {
      console.log("Open article:", title);
    };

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded">
                  {article.category}
                </span>
                <button
                  onClick={() => handleDelete(article.title)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-3">By {article.author}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              <button
                onClick={() => handleRead(article.title)}
                className="w-full mt-4 text-indigo-600 hover:text-blue-700 font-medium text-sm"
              >
                Read Article →
              </button>
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
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Questions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Questions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Property Dispute with Neighbor</p>
                      <p className="text-sm text-gray-600">15 Jan 2024</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">
                      Answered
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Consumer Rights - Online Purchase</p>
                      <p className="text-sm text-gray-600">12 Jan 2024</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-yellow-600 bg-yellow-100">
                      Pending
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Employment Contract Review</p>
                      <p className="text-sm text-gray-600">10 Jan 2024</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">
                      Answered
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Downloads */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Downloads</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">FIR Application Form</p>
                      <p className="text-sm text-gray-600">15 Jan 2024</p>
                    </div>
                    <span className="text-xs text-gray-500">PDF</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Rental Agreement Template</p>
                      <p className="text-sm text-gray-600">12 Jan 2024</p>
                    </div>
                    <span className="text-xs text-gray-500">DOCX</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Consumer Complaint Format</p>
                      <p className="text-sm text-gray-600">10 Jan 2024</p>
                    </div>
                    <span className="text-xs text-gray-500">PDF</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "questions":
        return <MyLegalQuestions />;

      case "articles":
        return <SavedArticles />;

      case "downloads":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloaded Documents</h2>
            <div className="space-y-4">
              {["FIR Application Form", "Rental Agreement Template", "Consumer Complaint Format"].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{doc}</h3>
                      <p className="text-sm text-gray-600">Details • 245 KB • 15 Jan 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">PDF</span>
                    <button className="text-indigo-600 hover:text-blue-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value="Ashif Ansari"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value="ashifansari04704@gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value="+91 11223 45678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <input
                    type="text"
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                    value="January 2024"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700">
                  Update Profile
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
    <div>
      {/* HERO IMAGE */}
      <div className="relative w-full min-h-[70vh] mt-16 sm:mt-20">
        <div className="w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[21/9] lg:aspect-[16/6] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/images/5321305.jpg"
            alt="law background"
          />
        </div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-black px-4 sm:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg text-center md:text-left">
              Welcome back, Ashif Ansari!
            </h1>
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-full"
                src="/images/Profile pic.jpeg"
                alt="Profile"
              />
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md text-center md:text-left">
            Manage your legal queries, saved content, and downloads
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
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
              <p className="text-sm font-medium text-gray-600">Saved Articles</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">My Questions</p>
              <p className="text-2xl font-bold text-gray-900">08</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap border-b border-gray-200">
          {["overview", "questions", "articles", "downloads", "profile"].map((tab) => (
            <button
              key={tab}
              className={`mr-4 pb-2 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
