import React from "react";

const Services = () => {
    const services = [
        {
            icon: (
                <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mb-6"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
            ),
            title: "Legal Consultation",
            description:
                "Get expert advice from verified lawyers for any legal issue including civil, criminal, family, property, and more.",
            includes: [
                "Free initial consultation",
                "Expert legal guidance",
                "Multiple practice areas",
                "Verified lawyers",
            ],
            cost:"Starting from ₹500",
        },
        {
             icon: (
                <div class="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white mb-6"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
            ),
            title: "Online FIR Guidance",
            description:
                "Step-by-step guidance to file FIR online with proper documentation support.",
            includes: [
                "Step-by-step guidance",
                "Document preparation",
                "Online filing support",
                "Status tracking",
            ],
            cost:"Free",
        },
        {
            icon:(
                <div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white mb-6"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div>
            
            ),
            title: "Lawyer Connect",
            description:
                "Connect directly with specialized lawyers for your specific legal needs.",
            includes: [
                "Direct lawyer connection",
                "Specialized expertise",
                "Video consultation",
                "Document review",
            ],
            cost:"Starting from ₹1000",
        },
        {
            icon:(
                <div class="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white mb-6"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>

            ),
            title: "RTI Filing Help",
            description:
                "Complete assistance for filing Right to Information requests with proper guidance.",
            includes: [
                "RTI application drafting",
                "Government department guidance",
                "Follow-up support",
                "Response tracking",
            ],
            cost:"Starting from ₹200",
        },
        {
            icon:(
<div class="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white mb-6"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>

            ),
            title: "Cyber Complaint Assist",
            description:
                "Help with filing cybercrime complaints and digital fraud reporting.",
            includes: [
                "Cybercrime complaint filing",
                "Digital fraud reporting",
                "Evidence documentation",
                "Police coordination",
            ],
            cost:"Starting from ₹300",

        },
        {
            icon:(
                <div class="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white mb-6"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
            ),
            title: "Free Legal Docs",
            description:
                "Download free legal documents and templates for common legal procedures.",
            includes: [
                "Free document templates",
                "Legal agreements",
                "Application forms",
                "Guidance notes",
            ],
            cost:"Free",
        },

    ];
    return (
        <div>
            <div className=" relative w-full min-h-[70vh] mt-16 sm:mt-20">
                <img
                    className="w-full h-120 object-cover"
                    src="/public/images/lawyers-handshake-agreement.jpg"
                    alt="img"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

                <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
                        Our Legal Services
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md">
                        Comprehensive legal services designed to make justice accessible to every Indian citizen. From basic legal advice to complex case handling, we've got you covered.
                    </p>
                </div>
            </div>

            <br /> <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-10 mb-10">
                {services.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
                    >   <div>{item.icon}</div>
                        <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                        <p className="text-gray-700 mb-4">{item.description}</p>

                        <h3 className="font-semibold mb-2 text-gray-800">Includes:</h3>

                        <ul className="text-gray-700 space-y-2">
                            {item.includes.map((line, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    {line}
                                </li>
                            ))}
                        </ul>
                        <br />
                        <hr />
                        <br />
                    <div className="text-2xl font-bold text-blue-800">{item.cost}</div>
                    <br />
                     <button className="bg-gradient-to-r from-blue-800 to-orange-700 hover:shadow-red-400/50 hover:shadow-lg transition-all duration-300 px-5 py-2 rounded-lg text-white text-lg w-60">
              Get Started
            </button>
                    </div>
                ))}
            </div>
        

            <div className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-800 to-orange-700 text-white py-10 px-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                   Need Personalized Legal Help?
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl">
                   Our team of expert lawyers is ready to assist you with your specific legal needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button className="hover:shadow-indigo-400/50 hover:shadow-lg transition-all duration-300 border border-amber-50 rounded-lg bg-white px-6 py-2 text-blue-700 font-bold">
                        Ask a Lawyer now
                    </button>
                    <button className="hover:shadow-indigo-400/50 hover:shadow-lg transition-all duration-300 border border-amber-50 rounded-lg bg-transparent px-6 py-2 text-white font-bold">
                        Contact us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Services;
