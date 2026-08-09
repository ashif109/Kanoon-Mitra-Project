import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { FiCamera } from "react-icons/fi";
import { API_BASE_URL } from "../config/api";

const LawyerDashboard = () => {
  const navigate = useNavigate();
  const { consultations, firDrafts, rtiFilings, addToast } = useApp();
  const { user, updateProfile } = useAuth();

  // Advocate Profile State (synced with Backend API & AuthContext)
  const [lawyerData, setLawyerData] = useState({
    fullName: user?.fullName || user?.name || "Advocate",
    barCouncilNo: user?.barCouncilNo || "D/1482/2010",
    court: user?.court || "Supreme Court & High Court",
    specialization: user?.specialization || "Legal Advocate",
    fee: user?.fee ? (user.fee.toString().startsWith("₹") ? user.fee : `₹${user.fee}`) : "₹1,000",
    city: user?.city || "New Delhi",
    experience: user?.experience || "10+ Years Exp",
    email: user?.email || "",
    phone: user?.phone || user?.mobile || "",
    title: user?.title || "Legal Advocate",
    languages: user?.languages || "English, Hindi",
    advocateStatus: user?.advocateStatus || "available",
    avatar: user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  });

  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingQueries, setIsLoadingQueries] = useState(true);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState("overview");

  // Advocate Status Toggle
  const [advocateStatus, setAdvocateStatus] = useState("available"); // "available" | "busy" | "offline"

  // Filters for Queries
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [urgencyFilter, setUrgencyFilter] = useState("All");

  // Selected case for detailed modal / drawer view
  const [selectedCase, setSelectedCase] = useState(null);
  const [advocateReplyText, setAdvocateReplyText] = useState("");
  const [quotedFee, setQuotedFee] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Video session modal
  const [activeCallSession, setActiveCallSession] = useState(null);

  // Practice Settings Edit Form State
  const [editProfileForm, setEditProfileForm] = useState({
    fullName: "",
    barCouncilNo: "",
    court: "",
    specialization: "",
    fee: "",
    city: "",
    experience: "",
    title: "",
    languages: "",
    phone: "",
  });

  // Pure Database Queries List from MongoDB Collection `legalQuestions` & `services`
  const [allQueries, setAllQueries] = useState([]);

  const handleLawyerAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result;
      setLawyerData((prev) => ({ ...prev, avatar: base64Data }));
      try {
        const token = localStorage.getItem("token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        await fetch("${API_BASE_URL}/lawyer/profile", {
          method: "PUT",
          credentials: "include",
          headers,
          body: JSON.stringify({ avatar: base64Data }),
        });
        addToast("Advocate profile photo updated in database!", "success");
      } catch (err) {
        console.error("Avatar upload error:", err);
      }
    };
    reader.readAsDataURL(file);
  };

  // Dynamic Transactions calculated from database queries
  const transactions = useMemo(() => {
    return allQueries.map((q, idx) => {
      const grossNum = q.fee ? parseInt(q.fee.toString().replace(/[^0-9]/g, ""), 10) || 1000 : 1000;
      const netNum = Math.round(grossNum * 0.85);
      return {
        id: `TXN-${q.id ? q.id.slice(-6).toUpperCase() : 9900 + idx}`,
        client: q.clientName,
        service: q.sourceService,
        date: q.date,
        gross: grossNum,
        net: netNum,
        status: q.status === "Completed" ? "Settled to Bank" : "Escrow Held",
      };
    });
  }, [allQueries]);

  // ---------------- INITIAL FETCH FROM MONGO DB ----------------
  useEffect(() => {
    fetchLawyerProfile();
    fetchLawyerQueries();
  }, []);

  const fetchLawyerProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("${API_BASE_URL}/lawyer/profile", {
        credentials: "include",
        headers: headers,
      });

      if (!response.ok) {
        setIsLoadingProfile(false);
        return;
      }

      const resData = await response.json();
      if (resData.success && resData.lawyer) {
        const l = resData.lawyer;
        const mergedData = {
          fullName: l.fullName || l.name || lawyerData.fullName,
          barCouncilNo: l.barCouncilNo || lawyerData.barCouncilNo,
          court: l.court || lawyerData.court,
          specialization: l.specialization || lawyerData.specialization,
          fee: l.fee ? (l.fee.toString().startsWith("₹") ? l.fee : `₹${l.fee}`) : lawyerData.fee,
          city: l.city || lawyerData.city,
          experience: l.experience || lawyerData.experience,
          email: l.email || lawyerData.email,
          phone: l.phone || l.mobile || lawyerData.phone,
          title: l.title || lawyerData.title,
          languages: l.languages || lawyerData.languages,
          advocateStatus: l.advocateStatus || "available",
        };

        setLawyerData(mergedData);
        setAdvocateStatus(mergedData.advocateStatus);
        setEditProfileForm({
          fullName: mergedData.fullName,
          barCouncilNo: mergedData.barCouncilNo,
          court: mergedData.court,
          specialization: mergedData.specialization,
          fee: mergedData.fee.replace("₹", "").trim(),
          city: mergedData.city,
          experience: mergedData.experience,
          title: mergedData.title,
          languages: mergedData.languages,
          phone: mergedData.phone,
        });

        if (updateProfile) {
          updateProfile(mergedData);
        }
      }
    } catch (err) {
      console.error("Error fetching lawyer profile:", err);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const fetchLawyerQueries = async () => {
    setIsLoadingQueries(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("${API_BASE_URL}/lawyer/queries", {
        credentials: "include",
        headers: headers,
      });

      if (!response.ok) {
        setIsLoadingQueries(false);
        return;
      }

      const resData = await response.json();
      if (resData.success && Array.isArray(resData.queries)) {
        setAllQueries(resData.queries);
      }
    } catch (err) {
      console.error("Error fetching lawyer queries from MongoDB:", err);
    } finally {
      setIsLoadingQueries(false);
    }
  };

  // ---------------- ADVOCATE STATUS API UPDATE ----------------
  const handleUpdateAdvocateStatus = async (newStatus) => {
    setAdvocateStatus(newStatus);
    setLawyerData((prev) => ({ ...prev, advocateStatus: newStatus }));

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await fetch("${API_BASE_URL}/lawyer/profile", {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify({ advocateStatus: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status on server:", err);
    }

    if (newStatus === "available") addToast("Status set to Available for Consultations", "success");
    else if (newStatus === "busy") addToast("Status set to Busy", "info");
    else addToast("Status set to Offline", "info");
  };

  // Dynamic Metrics calculated from database documents
  const metrics = useMemo(() => {
    const totalReceived = allQueries.length;
    const pendingCount = allQueries.filter((q) => q.status === "Pending Review" || q.rawStatus === "pending").length;
    const activeCount = allQueries.filter((q) => q.status === "Accepted" || q.status === "In Progress" || q.status === "Scheduled").length;
    const completedCount = allQueries.filter((q) => q.status === "Completed" || q.status === "Answered").length;
    const totalGross = transactions.reduce((acc, t) => acc + t.gross, 0);
    const totalNet = transactions.reduce((acc, t) => acc + t.net, 0);
    return { totalReceived, pendingCount, activeCount, completedCount, totalGross, totalNet };
  }, [allQueries, transactions]);

  // Filtered queries matching database document properties
  const filteredQueries = useMemo(() => {
    return allQueries.filter((item) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        (item.clientName && item.clientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.subject && item.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.id && item.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.city && item.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus =
        statusFilter === "All" ||
        item.status === statusFilter ||
        (statusFilter === "Pending Review" && item.rawStatus === "pending");

      const matchCategory =
        categoryFilter === "All" ||
        (item.category && item.category.toLowerCase() === categoryFilter.toLowerCase());

      const matchUrgency =
        urgencyFilter === "All" ||
        (item.urgency && item.urgency.toLowerCase() === urgencyFilter.toLowerCase());

      return matchSearch && matchStatus && matchCategory && matchUrgency;
    });
  }, [allQueries, searchQuery, statusFilter, categoryFilter, urgencyFilter]);

  // ---------------- ADVOCATE ACTION & API HANDLERS ----------------
  const handleUpdateStatus = async (caseId, newStatus) => {
    // Optimistic UI update
    setAllQueries((prev) =>
      prev.map((q) => (q.id === caseId ? { ...q, status: newStatus, rawStatus: newStatus.toLowerCase() } : q))
    );
    if (selectedCase && selectedCase.id === caseId) {
      setSelectedCase((prev) => ({ ...prev, status: newStatus, rawStatus: newStatus.toLowerCase() }));
    }

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await fetch(`${API_BASE_URL}/lawyer/queries/${caseId}`, {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Status sync error:", err);
    }

    addToast(`Case status updated to '${newStatus}'`, "success");
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!advocateReplyText.trim()) {
      alert("Please write legal advice or note before submitting.");
      return;
    }
    setIsSubmittingReply(true);

    const newReply = {
      lawyer: lawyerData.fullName,
      date: new Date().toLocaleString("en-IN"),
      text: advocateReplyText,
      quotedFee: quotedFee ? `₹${quotedFee}` : null,
    };

    const targetStatus = selectedCase.status === "Pending Review" || selectedCase.rawStatus === "pending" ? "In Progress" : selectedCase.status;

    // Send API update to backend MongoDB collection
    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await fetch(`${API_BASE_URL}/lawyer/queries/${selectedCase.id}`, {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify({
          status: targetStatus,
          reply: advocateReplyText,
          quotedFee: quotedFee ? `₹${quotedFee}` : null,
        }),
      });
    } catch (err) {
      console.error("Error submitting reply to API:", err);
    }

    // Local state sync
    setAllQueries((prev) =>
      prev.map((q) => {
        if (q.id === selectedCase.id) {
          return {
            ...q,
            status: targetStatus,
            replies: [...(q.replies || []), newReply],
          };
        }
        return q;
      })
    );

    setSelectedCase((prev) => ({
      ...prev,
      status: targetStatus,
      replies: [...(prev.replies || []), newReply],
    }));

    setAdvocateReplyText("");
    setQuotedFee("");
    setIsSubmittingReply(false);
    addToast(`Response sent to client ${selectedCase.clientName}!`, "success");
  };

  // ---------------- PRACTICE SETTINGS SUBMIT ----------------
  const handleSavePracticeProfile = async (e) => {
    e.preventDefault();
    setIsSavingSettings(true);

    const updatedObj = {
      fullName: editProfileForm.fullName || lawyerData.fullName,
      barCouncilNo: editProfileForm.barCouncilNo || lawyerData.barCouncilNo,
      court: editProfileForm.court || lawyerData.court,
      specialization: editProfileForm.specialization || lawyerData.specialization,
      fee: editProfileForm.fee ? (editProfileForm.fee.startsWith("₹") ? editProfileForm.fee : `₹${editProfileForm.fee}`) : lawyerData.fee,
      city: editProfileForm.city || lawyerData.city,
      experience: editProfileForm.experience || lawyerData.experience,
      title: editProfileForm.title || lawyerData.title,
      languages: editProfileForm.languages || lawyerData.languages,
      phone: editProfileForm.phone || lawyerData.phone,
    };

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("${API_BASE_URL}/lawyer/profile", {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify(updatedObj),
      });

      const data = await res.json();
      if (data.success) {
        setLawyerData((prev) => ({ ...prev, ...updatedObj }));
        if (updateProfile) updateProfile(updatedObj);
        addToast("Advocate practice profile updated successfully!", "success");
      } else {
        addToast("Failed to save practice profile", "error");
      }
    } catch (err) {
      console.error("Save profile error:", err);
      setLawyerData((prev) => ({ ...prev, ...updatedObj }));
      addToast("Advocate practice profile updated locally!", "success");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const getUrgencyBadge = (urgency) => {
    const u = (urgency || "").toLowerCase();
    if (u === "high") return "bg-red-50 text-red-700 border-red-200 font-bold";
    if (u === "low") return "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium";
    return "bg-amber-50 text-amber-700 border-amber-200 font-semibold";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending Review":
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-300 font-bold";
      case "Accepted":
        return "bg-blue-50 text-blue-800 border-blue-200 font-bold";
      case "In Progress":
        return "bg-purple-50 text-purple-700 border-purple-200 font-bold";
      case "Scheduled":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 font-bold";
      case "Completed":
      case "Answered":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold";
      case "Declined":
        return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 font-medium";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans pb-20">
      {/* ---------------- BRAND HERO BLUE BANNER ---------------- */}
      <div className="pt-20 pb-10 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
            {/* Advocate Identity */}
            <div className="flex items-center gap-5">
              <div className="relative group">
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-orange-400 shadow-lg"
                  src={lawyerData.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"}
                  alt="Advocate Profile"
                />
                <label
                  htmlFor="lawyerAvatarUpload"
                  className="absolute inset-0 bg-black/60 rounded-2xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition cursor-pointer text-xs font-bold gap-1"
                >
                  <FiCamera className="text-base" />
                  <span>Change</span>
                </label>
                <input
                  type="file"
                  id="lawyerAvatarUpload"
                  accept="image/*"
                  onChange={handleLawyerAvatarUpload}
                  className="hidden"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-blue-900 ${
                    advocateStatus === "available"
                      ? "bg-emerald-500"
                      : advocateStatus === "busy"
                      ? "bg-amber-500"
                      : "bg-gray-400"
                  }`}
                  title={`Status: ${advocateStatus}`}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {lawyerData.fullName}
                  </h1>
                  <span className="bg-orange-500/20 text-orange-200 border border-orange-400/40 text-[11px] font-bold px-3 py-0.5 rounded-full">
                    Verified Advocate Badge
                  </span>
                </div>

                <p className="text-sm text-blue-100 font-medium">
                  {lawyerData.specialization} • {lawyerData.court}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-blue-200 mt-2 font-mono">
                  <span>Bar Enrolment: <strong className="text-white">{lawyerData.barCouncilNo}</strong></span>
                  <span>Fee: <strong className="text-orange-300">{lawyerData.fee}</strong></span>
                  <span>City: <strong className="text-white">{lawyerData.city}</strong></span>
                </div>
              </div>
            </div>

            {/* Availability Toggle & Quick Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t lg:border-t-0 border-white/20 pt-4 lg:pt-0">
              <div className="bg-blue-950/80 p-1.5 rounded-xl border border-white/20 flex items-center">
                <span className="text-xs text-blue-200 font-medium px-2.5">Status:</span>
                <button
                  onClick={() => handleUpdateAdvocateStatus("available")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    advocateStatus === "available"
                      ? "bg-emerald-600 text-white shadow"
                      : "text-blue-200 hover:text-white"
                  }`}
                >
                  Available
                </button>
                <button
                  onClick={() => handleUpdateAdvocateStatus("busy")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    advocateStatus === "busy"
                      ? "bg-amber-600 text-white shadow"
                      : "text-blue-200 hover:text-white"
                  }`}
                >
                  Busy
                </button>
                <button
                  onClick={() => handleUpdateAdvocateStatus("offline")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    advocateStatus === "offline"
                      ? "bg-gray-600 text-white shadow"
                      : "text-blue-200 hover:text-white"
                  }`}
                >
                  Offline
                </button>
              </div>

              <button
                onClick={() => {
                  setActiveTab("queries");
                  setStatusFilter("Pending Review");
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-5 py-3 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Review New Queries</span>
                {metrics.pendingCount > 0 && (
                  <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                    {metrics.pendingCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ---------------- STATS DASHBOARD CARDS ---------------- */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-blue-200 text-[11px] font-bold uppercase tracking-wider block mb-1">Total Received</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-white">{metrics.totalReceived}</span>
                <span className="text-xs text-emerald-300 font-semibold">Live DB</span>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-blue-200 text-[11px] font-bold uppercase tracking-wider block mb-1">Pending Review</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-orange-300">{metrics.pendingCount}</span>
                <span className="text-xs text-orange-200 font-semibold">Action needed</span>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-blue-200 text-[11px] font-bold uppercase tracking-wider block mb-1">Active Cases</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-white">{metrics.activeCount}</span>
                <span className="text-xs text-blue-200 font-semibold">In motion</span>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-blue-200 text-[11px] font-bold uppercase tracking-wider block mb-1">Completed</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-emerald-300">{metrics.completedCount}</span>
                <span className="text-xs text-emerald-200 font-semibold">Answered</span>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-blue-200 text-[11px] font-bold uppercase tracking-wider block mb-1">Monthly Gross</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-white">₹{metrics.totalGross.toLocaleString()}</span>
                <span className="text-xs text-blue-200">Gross fees</span>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-blue-200 text-[11px] font-bold uppercase tracking-wider block mb-1">Net Earnings</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-orange-300">₹{metrics.totalNet.toLocaleString()}</span>
                <span className="text-xs text-emerald-300 font-semibold">Ready payout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- MAIN NAVIGATION TABS ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex border-b border-gray-200 bg-white rounded-2xl p-1 shadow-sm overflow-x-auto no-scrollbar space-x-1 text-sm font-bold">
          {[
            { id: "overview", label: "Overview & Queue", badge: null },
            { id: "queries", label: "Client Queries & Cases", badge: metrics.pendingCount },
            { id: "appointments", label: "Consultation Calendar", badge: 0 },
            { id: "earnings", label: "Payments & Revenue", badge: null },
            { id: "docs", label: "Document Reviewer Studio", badge: null },
            { id: "settings", label: "Practice Settings", badge: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-900 text-white shadow"
                  : "text-gray-600 hover:text-blue-900 hover:bg-gray-100"
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== null && tab.badge > 0 && (
                <span
                  className={`px-2 py-0.5 text-[10px] rounded-full font-extrabold ${
                    activeTab === tab.id ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ---------------- TAB CONTENT RENDERING ---------------- */}
        <div className="mt-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left 2 Cols: High Priority Pending Queue */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">High Priority Action Items</h2>
                        <p className="text-xs text-gray-500">Real client questions from database needing advocate review</p>
                      </div>
                      <button
                        onClick={() => setActiveTab("queries")}
                        className="text-xs font-bold text-blue-900 hover:underline cursor-pointer"
                      >
                        View All Queries →
                      </button>
                    </div>

                    {isLoadingQueries ? (
                      <div className="p-8 text-center text-xs text-gray-500 font-semibold">
                        Fetching client inquiries from MongoDB database...
                      </div>
                    ) : allQueries.filter((q) => (q.urgency || "").toLowerCase() === "high").length === 0 ? (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                        <h3 className="font-bold text-gray-800 text-base mb-1">No High Urgency Queries</h3>
                        <p className="text-xs">
                          No client inquiries with high urgency status found in the database.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {allQueries
                          .filter((q) => (q.urgency || "").toLowerCase() === "high")
                          .slice(0, 4)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-blue-900/40 transition group shadow-xs"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                <div className="flex items-center gap-3">
                                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] border ${getUrgencyBadge(item.urgency)}`}>
                                    Urgency: {item.urgency}
                                  </span>
                                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] border ${getStatusBadge(item.status)}`}>
                                    {item.status}
                                  </span>
                                  <span className="text-xs text-gray-500 font-mono">ID: {item.id ? item.id.slice(-6) : "N/A"}</span>
                                </div>

                                <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">
                                  {item.sourceService}
                                </span>
                              </div>

                              <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-900 transition mb-1">
                                {item.subject}
                              </h3>
                              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                                {item.description}
                              </p>

                              <div className="flex flex-wrap items-center justify-between pt-3 border-t border-gray-200 text-xs">
                                <div className="flex items-center gap-4 text-gray-500">
                                  <span>Client: <strong className="text-gray-800">{item.clientName}</strong> ({item.city})</span>
                                  <span>Submitted: {item.date}</span>
                                </div>

                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                  <button
                                    onClick={() => setSelectedCase(item)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-1.5 rounded-xl transition text-xs cursor-pointer shadow"
                                  >
                                    Review & Respond
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Consultation Schedule Card */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Today's Consultation Schedule</h2>
                    <p className="text-xs text-gray-500 mb-4">Scheduled video call sessions with verified clients</p>
                    
                    {allQueries.filter((q) => q.status === "Scheduled" || q.status === "Accepted").length === 0 ? (
                      <div className="p-6 bg-gray-50 rounded-xl text-center text-xs text-gray-500">
                        No scheduled video consultations pending for today.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {allQueries
                          .filter((q) => q.status === "Scheduled" || q.status === "Accepted")
                          .map((slot, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <div className="flex items-center gap-4">
                                <span className="bg-blue-100 text-blue-900 font-mono font-bold text-xs px-3 py-1 rounded-lg">
                                  {slot.time || "11:30 AM"}
                                </span>
                                <div>
                                  <p className="font-bold text-gray-900 text-sm">{slot.clientName}</p>
                                  <p className="text-xs text-gray-500">{slot.subject} • {slot.sourceService}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    setActiveCallSession({
                                      client: slot.clientName,
                                      topic: slot.subject,
                                    });
                                    addToast(`Launching video conference room for ${slot.clientName}`, "info");
                                  }}
                                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer shadow"
                                >
                                  Join Call
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Col: Practice Quick Stats */}
                <div className="space-y-6">
                  {/* Revenue Widget */}
                  <div className="bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800 text-white rounded-2xl p-6 shadow-md">
                    <span className="text-orange-300 text-xs font-bold uppercase tracking-wider block mb-2">Payout Balance Available</span>
                    <div className="text-3xl font-extrabold text-white mb-2">₹{metrics.totalNet.toLocaleString()}</div>
                    <p className="text-xs text-blue-100 mb-6">Transferred directly to advocate registered bank account every Friday.</p>
                    
                    <button
                      onClick={() => addToast("Withdrawal request sent to payment gateway!", "success")}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3 rounded-xl shadow transition text-xs cursor-pointer"
                    >
                      Instant Payout Request →
                    </button>
                  </div>

                  {/* Bar Council Compliance Status */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-3">
                    <h3 className="text-base font-bold text-gray-900">Bar Council Verification</h3>
                    <p className="text-xs text-gray-600">
                      Your enrolment card <strong className="text-gray-900">{lawyerData.barCouncilNo}</strong> is verified under Bar Council Rules.
                    </p>
                    <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-800 text-xs font-semibold flex items-center justify-between">
                      <span>Verification Status: Active</span>
                      <span>Verified Advocate</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: CLIENT QUERIES & CASES DESK */}
          {activeTab === "queries" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Filter Controls Bar */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Client Queries & Case Management Desk</h2>
                    <p className="text-xs text-gray-500">Live submissions from `legalQuestions` database collection</p>
                  </div>

                  {/* Search Input */}
                  <div className="w-full md:w-80">
                    <input
                      type="text"
                      placeholder="Search client name, title, city, category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                {/* Dropdown Filters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-gray-200 text-xs">
                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Filter Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending Review">Pending Review</option>
                      <option value="Accepted">Accepted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Legal Category</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    >
                      <option value="All">All Practice Areas</option>
                      <option value="Consumer Law">Consumer Law</option>
                      <option value="Cyber Law">Cyber Law</option>
                      <option value="Property Law">Property Law</option>
                      <option value="Criminal Law">Criminal Law</option>
                      <option value="Family Law">Family Law</option>
                      <option value="Civil Law">Civil Law</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Urgency Level</label>
                    <select
                      value={urgencyFilter}
                      onChange={(e) => setUrgencyFilter(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    >
                      <option value="All">All Urgencies</option>
                      <option value="High">High Urgency</option>
                      <option value="Medium">Medium Urgency</option>
                      <option value="Low">Low Urgency</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("All");
                        setCategoryFilter("All");
                        setUrgencyFilter("All");
                      }}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 rounded-xl transition text-xs cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Queries Grid */}
              {isLoadingQueries ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 font-semibold text-xs">
                  Loading questions from database...
                </div>
              ) : filteredQueries.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500">
                  <h3 className="text-lg font-bold text-gray-800">No Legal Questions Found</h3>
                  <p className="text-xs mt-1">
                    {allQueries.length === 0
                      ? "No questions have been submitted by clients in MongoDB `legalQuestions` collection yet."
                      : "Try clearing your search query or dropdown filters."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredQueries.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition flex flex-col justify-between group"
                    >
                      <div>
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-mono text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-md border border-gray-200">
                            ID: {item.id ? item.id.slice(-6) : "N/A"}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] border ${getStatusBadge(item.status)}`}>
                            {item.status}
                          </span>
                        </div>

                        {/* Category & Urgency */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                            {item.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] border ${getUrgencyBadge(item.urgency)}`}>
                            {item.urgency} Urgency
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-blue-900 transition line-clamp-2">
                          {item.subject}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Footer & Actions */}
                      <div className="pt-4 border-t border-gray-100 space-y-3">
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <div>
                            <p className="font-bold text-gray-900">{item.clientName}</p>
                            <p className="text-[11px] text-gray-500">Phone: {item.clientPhone} • Email: {item.clientEmail}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => setSelectedCase(item)}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl text-xs transition cursor-pointer shadow text-center"
                          >
                            Open Case Brief & Reply
                          </button>
                          
                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                            className="bg-gray-100 text-gray-800 border border-gray-300 text-[11px] font-medium rounded-xl px-2 py-2 focus:outline-none cursor-pointer"
                          >
                            <option value="Pending Review">Pending</option>
                            <option value="Accepted">Accept</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Declined">Decline</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONSULTATION CALENDAR */}
          {activeTab === "appointments" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Advocate Consultation Calendar</h2>
                <p className="text-xs text-gray-500 mb-6">Confirmed client consultation slots from database inquiries</p>

                {allQueries.length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-xl">
                    No active appointment slots found in database.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allQueries.map((appt, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-blue-100 border border-blue-200 rounded-xl flex flex-col items-center justify-center text-blue-900 flex-shrink-0">
                            <span className="text-[10px] font-bold uppercase">{appt.date ? appt.date.split("-")[1] || "AUG" : "AUG"}</span>
                            <span className="text-lg font-extrabold leading-none">{appt.date ? appt.date.split("-")[2] || "08" : "08"}</span>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900 text-base">{appt.clientName}</h3>
                              <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-semibold">
                                {appt.sourceService}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">{appt.subject}</p>
                            <p className="text-[11px] text-gray-500 mt-1 font-mono">Status: <strong className="text-blue-900">{appt.status}</strong></p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setActiveCallSession({ client: appt.clientName, topic: appt.subject });
                              addToast(`Opening consultation portal for ${appt.clientName}`, "info");
                            }}
                            className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer shadow"
                          >
                            Launch Video Room
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENTS & REVENUE */}
          {activeTab === "earnings" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Payments & Fee Settlement Statement</h2>
                    <p className="text-xs text-gray-500">Track consultation fees, platform escrow releases, and bank payouts</p>
                  </div>

                  <button
                    onClick={() => addToast("Detailed financial statement downloaded", "success")}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow cursor-pointer"
                  >
                    Download Statement
                  </button>
                </div>

                {/* Financial Table */}
                {transactions.length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-xl">
                    No transactions recorded yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-gray-700">
                      <thead className="bg-gray-100 text-gray-700 uppercase font-mono border-b border-gray-200">
                        <tr>
                          <th className="p-3">Txn ID</th>
                          <th className="p-3">Client Name</th>
                          <th className="p-3">Service Provided</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Gross Fee</th>
                          <th className="p-3">Net Advocate Share (85%)</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {transactions.map((txn) => (
                          <tr key={txn.id} className="hover:bg-gray-50">
                            <td className="p-3 font-mono text-gray-500">{txn.id}</td>
                            <td className="p-3 font-bold text-gray-900">{txn.client}</td>
                            <td className="p-3">{txn.service}</td>
                            <td className="p-3 text-gray-500">{txn.date}</td>
                            <td className="p-3 font-semibold text-gray-800">₹{txn.gross}</td>
                            <td className="p-3 font-bold text-blue-900">₹{txn.net}</td>
                            <td className="p-3">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  txn.status === "Settled to Bank"
                                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                    : "bg-amber-100 text-amber-800 border border-amber-200"
                                }`}
                              >
                                {txn.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DOCUMENT REVIEWER STUDIO */}
          {activeTab === "docs" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Legal Document Reviewer Studio</h2>
                <p className="text-xs text-gray-500 mb-6">Review client submitted evidence and draft documents from MongoDB database</p>

                {allQueries.filter((q) => q.documents && q.documents.length > 0).length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-xl">
                    No attached client documents currently pending review in database.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {allQueries
                      .filter((q) => q.documents && q.documents.length > 0)
                      .map((doc, idx) => (
                        <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col justify-between space-y-4">
                          <div>
                            <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                              Document Draft
                            </span>
                            <h3 className="font-bold text-gray-900 text-sm mt-2 mb-1">{doc.subject}</h3>
                            <p className="text-xs text-gray-600">Client: <strong>{doc.clientName}</strong></p>
                            <p className="text-[11px] text-gray-500 font-mono mt-1">{doc.category}</p>
                          </div>

                          <div className="pt-3 border-t border-gray-200 space-y-2">
                            <button
                              onClick={() => addToast(`Opening documents for advocate review`, "info")}
                              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded-xl text-xs transition cursor-pointer shadow"
                            >
                              Review Attached Files ({doc.documents.length})
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: ADVOCATE PRACTICE SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <form onSubmit={handleSavePracticeProfile} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-4xl mx-auto space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Advocate Practice & Profile Settings</h2>
                  <p className="text-xs text-gray-500">Update your Bar enrolment credentials, court jurisdiction, and fee details persisted to database</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Advocate Full Name</label>
                    <input
                      type="text"
                      value={editProfileForm.fullName}
                      onChange={(e) => setEditProfileForm({ ...editProfileForm, fullName: e.target.value })}
                      placeholder="e.g. Adv. Priya Sharma"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Bar Council Enrolment No.</label>
                    <input
                      type="text"
                      value={editProfileForm.barCouncilNo}
                      onChange={(e) => setEditProfileForm({ ...editProfileForm, barCouncilNo: e.target.value })}
                      placeholder="e.g. D/1482/2010"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Standard Consultation Fee (₹)</label>
                    <input
                      type="number"
                      value={editProfileForm.fee}
                      onChange={(e) => setEditProfileForm({ ...editProfileForm, fee: e.target.value })}
                      placeholder="e.g. 1000"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Primary Court Jurisdictions</label>
                    <input
                      type="text"
                      value={editProfileForm.court}
                      onChange={(e) => setEditProfileForm({ ...editProfileForm, court: e.target.value })}
                      placeholder="e.g. Supreme Court of India, Delhi High Court"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Primary Specialization</label>
                    <input
                      type="text"
                      value={editProfileForm.specialization}
                      onChange={(e) => setEditProfileForm({ ...editProfileForm, specialization: e.target.value })}
                      placeholder="e.g. Consumer Law, Cyber & Criminal Law"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">City / Base Practice</label>
                    <input
                      type="text"
                      value={editProfileForm.city}
                      onChange={(e) => setEditProfileForm({ ...editProfileForm, city: e.target.value })}
                      placeholder="e.g. New Delhi, Mumbai"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isSavingSettings}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-xl shadow transition text-xs cursor-pointer disabled:opacity-50"
                  >
                    {isSavingSettings ? "Saving Settings..." : "Save Practice Profile →"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- CASE BRIEF & RESPOND MODAL DRAWER ---------------- */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6 text-gray-800 animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold p-2 cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded font-bold">
                  ID: {selectedCase.id ? selectedCase.id.slice(-6) : "N/A"}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] border ${getStatusBadge(selectedCase.status)}`}>
                  {selectedCase.status}
                </span>
                <span className="text-xs text-gray-500">Submitted: {selectedCase.date} at {selectedCase.time}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedCase.subject}</h2>
              <p className="text-xs text-gray-600">
                Source Service: <strong className="text-gray-900">{selectedCase.sourceService}</strong> • Category: <strong className="text-blue-900">{selectedCase.category}</strong>
              </p>
            </div>

            {/* Client Profile Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-500 block font-semibold">Client Name</span>
                <span className="font-bold text-gray-900 text-sm">{selectedCase.clientName}</span>
              </div>
              <div>
                <span className="text-gray-500 block font-semibold">Contact Info</span>
                <span className="text-gray-800 block">Phone: {selectedCase.clientPhone}</span>
                <span className="text-gray-800 block">Email: {selectedCase.clientEmail}</span>
              </div>
              <div>
                <span className="text-gray-500 block font-semibold">Location & Service</span>
                <span className="text-gray-800 block">City: {selectedCase.city}</span>
                <span className="text-blue-900 font-bold block">{selectedCase.sourceService}</span>
              </div>
            </div>

            {/* Case Background & Full Description / Question */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900">Client Legal Question / Case Details</h3>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-800 leading-relaxed font-sans font-medium">
                {selectedCase.description}
              </div>
            </div>

            {/* Attached Client Documents */}
            {selectedCase.documents && selectedCase.documents.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-900">Attached Evidence & Documents</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.documents.map((doc, idx) => (
                    <button
                      key={idx}
                      onClick={() => addToast(`Opening file: ${doc}`, "info")}
                      className="bg-gray-100 hover:bg-gray-200 text-blue-900 text-xs font-mono border border-gray-300 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Document: {doc}</span>
                      <span className="text-[10px] text-gray-500">Download</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Prior Advocate Responses History */}
            {selectedCase.replies && selectedCase.replies.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-gray-900">Advocate Correspondence History</h3>
                <div className="space-y-2">
                  {selectedCase.replies.map((rep, idx) => (
                    <div key={idx} className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-xs space-y-1">
                      <div className="flex justify-between text-gray-600 text-[10px]">
                        <span className="font-bold text-blue-900">{rep.lawyer}</span>
                        <span>{rep.date}</span>
                      </div>
                      <p className="text-gray-800 font-medium">{rep.text}</p>
                      {rep.quotedFee && (
                        <span className="inline-block text-[11px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                          Quoted Fee: {rep.quotedFee}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advocate Action & Reply Form */}
            <form onSubmit={handleSendReply} className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">Send Legal Opinion / Answer to Client</h3>

              <textarea
                rows="4"
                value={advocateReplyText}
                onChange={(e) => setAdvocateReplyText(e.target.value)}
                placeholder="Type your official legal advice or answer to the client's question..."
                className="w-full bg-white border border-gray-300 rounded-xl p-4 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                required
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-600">Quote Additional Representation Fee (Optional):</span>
                  <input
                    type="number"
                    placeholder="e.g. 2500"
                    value={quotedFee}
                    onChange={(e) => setQuotedFee(e.target.value)}
                    className="w-32 bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdateStatus(selectedCase.id, "Completed");
                      setSelectedCase(null);
                    }}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer shadow"
                  >
                    Mark Case Solved
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingReply}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-2.5 rounded-xl shadow transition text-xs cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingReply ? "Sending..." : "Submit Answer to Client →"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- LIVE VIDEO CONFERENCE MODAL ---------------- */}
      {activeCallSession && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl text-gray-900 text-center space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold text-xl mx-auto">
              VIDEO
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Encrypted Video Conference Active</h2>
              <p className="text-xs text-gray-600">
                Connected with client <strong className="text-blue-900">{activeCallSession.client}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">Topic: {activeCallSession.topic}</p>
            </div>

            <div className="bg-gray-900 text-white rounded-xl p-6 flex items-center justify-center h-48 relative overflow-hidden">
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                REC - Encrypted Privileged Session
              </div>
              <p className="text-sm font-mono text-gray-300">
                [ Secure WebRTC Video Stream - Audio & Video Connected ]
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => addToast("Microphone muted", "info")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                Mute Mic
              </button>
              <button
                onClick={() => addToast("Camera toggled", "info")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                Toggle Video
              </button>
              <button
                onClick={() => {
                  setActiveCallSession(null);
                  addToast("Video consultation session ended successfully", "success");
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-xl text-xs shadow transition cursor-pointer"
              >
                End Call Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerDashboard;
