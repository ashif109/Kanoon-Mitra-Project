import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-xl space-y-5">
        <span className="text-6xl">⚖️</span>
        <h1 className="text-4xl font-extrabold text-white">404</h1>
        <h2 className="text-lg font-bold text-indigo-300">Legal Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested page or legal section does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-xs font-semibold text-white shadow-lg cursor-pointer"
        >
          Return to Home Page →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
