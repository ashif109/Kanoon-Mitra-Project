import { useState } from "react";

const LawyerPortal = () => {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <div>
      {/* ---------------- HEADER BANNER ---------------- */}
      <div className="relative w-full min-h-[70vh] mt-16 sm:mt-20">
        <img
          className="w-full h-110 object-cover"
          src="/public/images/—Pngtree—lawyer signing legal documents with_16388702.jpg"
          alt="law background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        <div className="font-poppins absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 drop-shadow-lg">
            Lawyer Portal
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl drop-shadow-md">
            Access your legal practice dashboard and connect with clients seeking expert <br /> legal advice.
          </p>
        </div>
      </div>

      {/* ---------------- MAIN CARD ---------------- */}
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">

          {/* Top Buttons */}
          <div className="flex mb-6">
            <button
              onClick={() => setActiveForm("login")}
              className={`w-1/2 py-3 text-lg font-semibold rounded-l-xl ${
                activeForm === "login"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setActiveForm("register")}
              className={`w-1/2 py-3 text-lg font-semibold rounded-r-xl ${
                activeForm === "register"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          {activeForm === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
      <br /><br />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 sm:mx-10 mb-10 text-center shadow-2xl">
        {[
          {
            title: "Connect with Clients",
            desc: "Reach thousands of potential clients seeking legal assistance across India.",
            icon: <svg
  className="w-8 h-8"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  ></path>
</svg>

          },
          {
            title: "Earn More",
            desc: "Flexible pricing and commission structure to maximize your earnings.",
            icon: <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>
          },
          {
            title: "Verified Platform",
            desc: "Secure, verified platform with professional tools and support.",
            icon: <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
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
     {/* </div> */}
    </div>
  );
};

export default LawyerPortal;


/* ======================================================
   LOGIN FORM  ( → 2 COLUMN LAYOUT )
====================================================== */
function LoginForm() {
  return (
    <form className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>

      {/* 2 Column Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <p>Email Address *</p>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="col-span-2">
          <p>Password *</p>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-sm text-gray-700">Remember me</span>
        </label>

        <a href="#" className="text-sm text-blue-600">Forgot password?</a>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
        Login
      </button>
    </form>
  );
}


/* ======================================================
   REGISTER FORM  ( → 2 COLUMN LAYOUT )
====================================================== */
function RegisterForm() {
  return (
    
    <form className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Join Our Legal Network</h1>

      {/* 2 Column Grid */}
      <div className=" grid grid-cols-2 gap-3">

        <div className="col-span-2">
          <p>Full Name *</p>
          <input
            type="text"
            placeholder="Full name"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="col-span-2">
          <p>Email Address *</p>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <p>Phone *</p>
          <input
            type="tel"
            placeholder="Phone"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <p>Bar Council No *</p>
          <input
            type="text"
            placeholder="Council number"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="col-span-2">
          <p>Specialization *</p>
          <select className="w-full p-3 border rounded-lg">
            <option value="">Select specialization</option>
            <option>Family Law</option>
            <option>Criminal Law</option>
            <option>Corporate Law</option>
            <option>Cyber Law</option>
            <option>Other</option>
          </select>
        </div>

        <div className="col-span-2">
          <p>Experience *</p>
          <select className="w-full p-3 border rounded-lg">
            <option value="">Select experience</option>
            <option>0-2 years</option>
            <option>3-5 years</option>
            <option>6-10 years</option>
            <option>10+ years</option>
          </select>
        </div>

        <div>
          <p>Password *</p>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <p>Confirm Password *</p>
          <input
            type="password"
            placeholder="Confirm"
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" className="w-4 h-4" />
        <span className="text-sm text-gray-700">
          I agree to the <a className="text-blue-700">Terms</a> & <a className="text-blue-700">Privacy Policy</a>
        </span>
      </label>

      <button className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-lg">
        Register
      </button>
    </form>
    
  );
}
