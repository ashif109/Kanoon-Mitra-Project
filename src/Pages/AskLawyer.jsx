import React from "react";

const AskLawyer = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] mt-16 sm:mt-20">
        <img
          className="w-full h-120 object-cover"
          src="/public/images/low-key-filter-law-bookshelf-with-wooden-judge-s-gavel-golden-scale_34259-438 (1).jpg"
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
          </p>
        </div>
      </div>

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
  );
};

export default AskLawyer;
