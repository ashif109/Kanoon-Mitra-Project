import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import {
  FiFileText,
  FiUpload,
  FiDownload,
  FiTrash2,
  FiEye,
  FiPlus,
  FiCamera,
  FiLock,
  FiUser,
  FiCheckCircle,
  FiFolder,
  FiEdit3,
  FiX
} from "react-icons/fi";

const Dashboard = () => {
  const { user, updateProfile } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const { consultations, firDrafts, rtiFilings, savedDocs, toggleSaveDoc, addToast } = useApp();
  const navigate = useNavigate();

  // Real Database Legal Questions
  const [myQuestions, setMyQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState("overview");

  // Filter state for user queries
  const [querySearch, setQuerySearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selected query for detail modal view
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userReplyText, setUserReplyText] = useState("");

  // Video call modal session
  const [activeCallSession, setActiveCallSession] = useState(null);

  // ---------------- USER DOCUMENT VAULT (PERSISTED IN MONGODB) ----------------
  const [myDocs, setMyDocs] = useState([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);

  const [docSearchQuery, setDocSearchQuery] = useState("");
  const [docCategoryFilter, setDocCategoryFilter] = useState("All");

  // Document Modals state
  const [uploadDocModal, setUploadDocModal] = useState(false);
  const [newDocForm, setNewDocForm] = useState({ name: "", category: "Identity", type: "PDF", fileData: null });

  const [previewDocModal, setPreviewDocModal] = useState(null);
  const [editingDocModal, setEditingDocModal] = useState(null);
  const [editDocName, setEditDocName] = useState("");
  const [editDocCategory, setEditDocCategory] = useState("Identity");
  const [openDocMenuId, setOpenDocMenuId] = useState(null);

  // Profile Edit Form State
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    state: "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // ---------------- INITIAL FETCH & BACKEND INTEGRATION ----------------
  useEffect(() => {
    getdata();
    getProfile();
    fetchUserDocuments();
  }, []);

  const getdata = async () => {
    setIsLoadingQuestions(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await fetch("${API_BASE_URL}/Dashboard", {
        credentials: "include",
        headers: headers,
      });
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("login");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const list = await response.json();
      setMyQuestions(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Dashboard questions error:", err);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch("${API_BASE_URL}/profile", {
        credentials: "include",
        headers,
      });

      if (!response.ok) {
        throw new Error(`Profile error: ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.user) {
        setProfileUser(result.user);
        setProfileForm({
          fullName: result.user.fullName || result.user.name || "",
          phone: result.user.phone || result.user.mobile || "",
          city: result.user.city || "",
          state: result.user.state || "",
        });
      }
    } catch (err) {
      console.error("Profile error:", err);
    }
  };

  const fetchUserDocuments = async () => {
    setIsLoadingDocs(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch("${API_BASE_URL}/user/documents", {
        credentials: "include",
        headers,
      });

      if (!response.ok) return;

      const resData = await response.json();
      if (resData.success && Array.isArray(resData.documents)) {
        setMyDocs(resData.documents);
      }
    } catch (err) {
      console.error("Error fetching user documents:", err);
    } finally {
      setIsLoadingDocs(false);
    }
  };

  // ---------------- USER PROFILE PHOTO & DETAILS UPDATE ----------------
  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result;
      try {
        const token = localStorage.getItem("token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch("${API_BASE_URL}/profile", {
          method: "PUT",
          credentials: "include",
          headers,
          body: JSON.stringify({ avatar: base64Data }),
        });

        const data = await res.json();
        if (data.success && data.user) {
          setProfileUser(data.user);
          if (updateProfile) updateProfile(data.user);
          addToast("Profile picture updated successfully!", "success");
        }
      } catch (err) {
        console.error("Profile image upload error:", err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfileDetails = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("${API_BASE_URL}/profile", {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify(profileForm),
      });

      const data = await res.json();
      if (data.success && data.user) {
        setProfileUser(data.user);
        if (updateProfile) updateProfile(data.user);
        addToast("Profile details updated successfully!", "success");
      }
    } catch (err) {
      console.error("Save profile error:", err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  // ---------------- DOCUMENT WALLET ACTIONS (CRUD WITH MONGODB) ----------------
  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!newDocForm.name.trim()) {
      addToast("Please enter a document title.", "error");
      return;
    }

    const payload = {
      name: newDocForm.name,
      category: newDocForm.category,
      type: newDocForm.type,
      size: "1.2 MB",
      date: new Date().toISOString().split("T")[0],
      fileData: newDocForm.fileData,
      content: `User document stored in vault: ${newDocForm.name}`
    };

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("${API_BASE_URL}/user/documents", {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setUploadDocModal(false);
        setNewDocForm({ name: "", category: "Identity", type: "PDF", fileData: null });
        fetchUserDocuments();
        addToast(`"${payload.name}" uploaded to secure Vault!`, "success");
      }
    } catch (err) {
      console.error("Upload doc error:", err);
    }
  };

  const handleDeleteDoc = async (docId, docName) => {
    if (!window.confirm(`Are you sure you want to delete "${docName}"?`)) return;

    try {
      const token = localStorage.getItem("token");
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/user/documents/${docId}`, {
        method: "DELETE",
        credentials: "include",
        headers,
      });

      if (res.ok) {
        fetchUserDocuments();
        addToast(`"${docName}" deleted from vault.`, "info");
        setOpenDocMenuId(null);
      }
    } catch (err) {
      console.error("Delete doc error:", err);
    }
  };

  const handleSaveDocEdit = async (e) => {
    e.preventDefault();
    if (!editDocName.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/user/documents/${editingDocModal.id}`, {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify({ name: editDocName, category: editDocCategory }),
      });

      if (res.ok) {
        fetchUserDocuments();
        addToast("Document updated successfully!", "success");
        setEditingDocModal(null);
        setOpenDocMenuId(null);
      }
    } catch (err) {
      console.error("Edit doc error:", err);
    }
  };

  // Download Handler
  const handleDownloadDoc = (doc) => {
    const element = document.createElement("a");
    const content = doc.fileData || `Kanoon Mitra Document Vault\nTitle: ${doc.name}\nCategory: ${doc.category}\nFormat: ${doc.type}\nDate: ${doc.date}`;
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.name.replace(/\s+/g, "_")}.${doc.type.toLowerCase()}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast(`Downloading "${doc.name}"...`, "success");
    setOpenDocMenuId(null);
  };

  // Dynamic User Profile details
  const userName = profileUser?.fullName || profileUser?.name || user?.fullName || user?.name || "User";
  const userEmail = profileUser?.email || user?.email || "No email";
  const userPhone = profileUser?.phone || profileUser?.mobile || user?.phone || user?.mobile || "No phone";
  const userCity = profileUser?.city || user?.city || "New Delhi";
  const userAvatar = profileUser?.avatar || user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80";

  // Submit client follow up reply to backend
  const handleSendUserReply = async (e) => {
    e.preventDefault();
    if (!userReplyText.trim()) return;

    const newReply = {
      sender: "user",
      name: userName,
      date: new Date().toLocaleString("en-IN"),
      text: userReplyText
    };

    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await fetch(`${API_BASE_URL}/lawyer/queries/${selectedQuestion.id}`, {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify({ reply: userReplyText }),
      });
    } catch (err) {
      console.error("Error sending user reply:", err);
    }

    setMyQuestions((prev) =>
      prev.map((q) => {
        if (q.id === selectedQuestion.id) {
          return { ...q, replies: [...(q.replies || []), newReply] };
        }
        return q;
      })
    );

    setSelectedQuestion((prev) => ({
      ...prev,
      replies: [...(prev.replies || []), newReply]
    }));

    setUserReplyText("");
    addToast("Follow-up message sent to advocate!", "success");
  };

  const filteredDocs = useMemo(() => {
    return myDocs.filter((doc) => {
      const matchSearch =
        docSearchQuery.trim() === "" ||
        doc.name.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
        doc.category.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(docSearchQuery.toLowerCase());
      const matchCategory = docCategoryFilter === "All" || doc.category === docCategoryFilter;
      return matchSearch && matchCategory;
    });
  }, [myDocs, docSearchQuery, docCategoryFilter]);

  const filteredQueries = useMemo(() => {
    return myQuestions.filter((q) => {
      const matchSearch =
        querySearch.trim() === "" ||
        q.title.toLowerCase().includes(querySearch.toLowerCase()) ||
        q.category.toLowerCase().includes(querySearch.toLowerCase());
      const matchStatus = statusFilter === "All" || q.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [myQuestions, querySearch, statusFilter]);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans pb-20">
      {/* ---------------- HERO PROFILE BLUE BANNER ---------------- */}
      <div className="pt-20 pb-10 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
            {/* User Identity */}
            <div className="flex items-center gap-5">
              <div className="relative group">
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-orange-400 shadow-lg"
                  src={userAvatar}
                  alt="User Profile"
                />
                <label
                  htmlFor="userAvatarUpload"
                  className="absolute inset-0 bg-black/60 rounded-2xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition cursor-pointer text-xs font-bold gap-1"
                >
                  <FiCamera className="text-base" />
                  <span>Change</span>
                </label>
                <input
                  type="file"
                  id="userAvatarUpload"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {userName}
                  </h1>
                  <span className="bg-orange-500/20 text-orange-200 border border-orange-400/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <FiCheckCircle className="text-orange-300" /> Verified User
                  </span>
                </div>

                <p className="text-sm text-blue-100 font-medium">
                  {userEmail} • {userPhone}
                </p>

                <div className="flex items-center gap-4 text-xs text-blue-200 mt-2 font-mono">
                  <span>Location: <strong className="text-white">{userCity}</strong></span>
                  <span>Active Queries: <strong className="text-orange-300">{myQuestions.length}</strong></span>
                  <span>Vault Documents: <strong className="text-emerald-300">{myDocs.length}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Service Action */}
            <div className="flex items-center gap-3 border-t md:border-t-0 border-white/20 pt-4 md:pt-0">
              <button
                onClick={() => navigate("/AskLawyer")}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiPlus className="text-base" />
                <span>Ask New Legal Question</span>
              </button>
            </div>
          </div>

          {/* ---------------- STATS DASHBOARD CARDS ---------------- */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-blue-200 text-[11px] font-bold uppercase tracking-wider block mb-1">Legal Queries</span>
              <span className="text-2xl font-extrabold text-white">{myQuestions.length}</span>
            </div>

            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-blue-200 text-[11px] font-bold uppercase tracking-wider block mb-1">Vault Documents</span>
              <span className="text-2xl font-extrabold text-emerald-300">{myDocs.length}</span>
            </div>

            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-blue-200 text-[11px] font-bold uppercase tracking-wider block mb-1">Booked Consultations</span>
              <span className="text-2xl font-extrabold text-orange-300">{consultations.length}</span>
            </div>

            <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-blue-200 text-[11px] font-bold uppercase tracking-wider block mb-1">FIR & RTI Drafts</span>
              <span className="text-2xl font-extrabold text-white">{firDrafts.length + rtiFilings.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- MAIN NAVIGATION TABS ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex border-b border-gray-200 bg-white rounded-2xl p-1 shadow-sm overflow-x-auto no-scrollbar space-x-1 text-sm font-bold">
          {[
            { id: "overview", label: "My Legal Queries", badge: myQuestions.length },
            { id: "consultations", label: "Consultation Bookings", badge: consultations.length },
            { id: "services", label: "FIR & RTI Studio", badge: firDrafts.length + rtiFilings.length },
            { id: "vault", label: "Document Vault", badge: myDocs.length },
            { id: "profile", label: "Profile Settings", badge: null },
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
          {/* TAB 1: MY LEGAL QUERIES */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">My Legal Queries & Consultation Requests</h2>
                    <p className="text-xs text-gray-500">Live submissions fetched from database</p>
                  </div>

                  <div className="w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Search my questions..."
                      value={querySearch}
                      onChange={(e) => setQuerySearch(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-xs text-gray-900 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Questions List */}
                {isLoadingQuestions ? (
                  <div className="p-8 text-center text-xs text-gray-500 font-semibold">
                    Fetching your legal questions from database...
                  </div>
                ) : filteredQueries.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                    <h3 className="font-bold text-gray-800 text-base mb-1">No Questions Found</h3>
                    <p className="text-xs mb-4">You haven't submitted any legal questions yet.</p>
                    <button
                      onClick={() => navigate("/AskLawyer")}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow cursor-pointer"
                    >
                      Ask a Lawyer Now →
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQueries.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                              {item.category}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.status === "Answered" ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-amber-100 text-amber-800 border border-amber-300"}`}>
                              {item.status}
                            </span>
                          </div>

                          <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-blue-900 transition line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                          <span className="text-gray-500 font-mono text-[11px]">{item.date}</span>
                          <button
                            onClick={() => setSelectedQuestion(item)}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-3.5 py-1.5 rounded-xl transition text-xs cursor-pointer shadow"
                          >
                            View Answer & Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CONSULTATION BOOKINGS */}
          {activeTab === "consultations" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Booked Advocate Consultations</h2>
                <p className="text-xs text-gray-500 mb-6">Confirmed appointments for video consultations and phone sessions</p>

                {consultations.length === 0 ? (
                  <div className="p-8 text-center text-xs text-gray-500 bg-gray-50 rounded-xl">
                    No active advocate consultations booked yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {consultations.map((c, idx) => (
                      <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">{c.lawyerName}</h3>
                          <p className="text-xs text-blue-900 font-semibold">{c.specialization}</p>
                          <p className="text-xs text-gray-500 mt-1">Date: {c.date} • Time: {c.time} • Mode: {c.mode}</p>
                        </div>

                        <button
                          onClick={() => {
                            setActiveCallSession({ client: c.lawyerName, topic: c.specialization });
                            addToast(`Opening video room with ${c.lawyerName}`, "info");
                          }}
                          className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow cursor-pointer"
                        >
                          Join Video Call
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: FIR & RTI STUDIO */}
          {activeTab === "services" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Draft FIR & RTI Application Studio</h2>
                <p className="text-xs text-gray-500 mb-6">Your generated applications ready for print and dispatch</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {firDrafts.map((fir, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
                      <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">FIR Guidance Draft</span>
                      <h3 className="font-bold text-gray-900 text-sm">{fir.incidentType}</h3>
                      <p className="text-xs text-gray-600">Police Station: {fir.policeStation}</p>
                      <button onClick={() => addToast("Downloading FIR Draft PDF...", "success")} className="bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <FiDownload /> <span>Download FIR Draft PDF</span>
                      </button>
                    </div>
                  ))}

                  {rtiFilings.map((rti, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2">
                      <span className="text-[10px] font-bold text-orange-900 bg-orange-100 px-2 py-0.5 rounded">RTI Application</span>
                      <h3 className="font-bold text-gray-900 text-sm">{rti.subject}</h3>
                      <p className="text-xs text-gray-600">Department: {rti.department}</p>
                      <button onClick={() => addToast("Downloading RTI Application...", "success")} className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <FiDownload /> <span>Download RTI Petition</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENT VAULT / WALLET */}
          {activeTab === "vault" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Encrypted Document Vault</h2>
                    <p className="text-xs text-gray-500">Persisted securely in database collection</p>
                  </div>

                  <button
                    onClick={() => setUploadDocModal(true)}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-extrabold px-5 py-2.5 rounded-xl shadow text-xs cursor-pointer flex items-center gap-2"
                  >
                    <FiUpload className="text-sm" />
                    <span>Upload New Document</span>
                  </button>
                </div>

                {/* Filter & Search Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-200 text-xs">
                  <div className="w-full sm:w-72">
                    <input
                      type="text"
                      placeholder="Search vault documents..."
                      value={docSearchQuery}
                      onChange={(e) => setDocSearchQuery(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-semibold">Category:</span>
                    <select
                      value={docCategoryFilter}
                      onChange={(e) => setDocCategoryFilter(e.target.value)}
                      className="bg-gray-50 border border-gray-300 rounded-xl p-2 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Categories</option>
                      <option value="Identity">Identity Proof</option>
                      <option value="Property">Property Paper</option>
                      <option value="Court Notice">Court Notice</option>
                      <option value="Case Docs">Case Document</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                {/* Document Grid */}
                {isLoadingDocs ? (
                  <div className="p-8 text-center text-xs text-gray-500 font-semibold">
                    Fetching your vault documents from database...
                  </div>
                ) : filteredDocs.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                    <h3 className="font-bold text-gray-800 text-base mb-1">No Vault Documents Stored</h3>
                    <p className="text-xs mb-4">Upload identity proofs, property papers, or case files to keep them encrypted.</p>
                    <button
                      onClick={() => setUploadDocModal(true)}
                      className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow cursor-pointer flex items-center gap-1.5 mx-auto"
                    >
                      <FiUpload /> <span>Upload First Document</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:border-blue-900/40 hover:shadow-md transition flex flex-col justify-between space-y-4"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <FiFileText className="text-2xl text-blue-900" />
                            <span className="bg-blue-100 text-blue-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                              {doc.type}
                            </span>
                          </div>

                          <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{doc.name}</h3>
                          <p className="text-xs text-gray-500">Category: {doc.category} • Date: {doc.date}</p>
                        </div>

                        <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setPreviewDocModal(doc)}
                            className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer shadow flex items-center gap-1"
                          >
                            <FiEye /> <span>Preview</span>
                          </button>
                          <button
                            onClick={() => handleDownloadDoc(doc)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer shadow flex items-center gap-1"
                          >
                            <FiDownload /> <span>Download</span>
                          </button>
                          <button
                            onClick={() => handleDeleteDoc(doc.id, doc.name)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer border border-red-200 flex items-center gap-1"
                          >
                            <FiTrash2 /> <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE & SETTINGS */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <form onSubmit={handleSaveProfileDetails} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm max-w-3xl mx-auto space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">User Profile & Personal Settings</h2>
                  <p className="text-xs text-gray-500">Update your profile information and avatar photo persisted in database</p>
                </div>

                {/* Avatar Photo Section */}
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <img
                    src={userAvatar}
                    alt="Profile Avatar"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-orange-400 shadow"
                  />
                  <div>
                    <label
                      htmlFor="userAvatarProfileTab"
                      className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow flex items-center gap-2 inline-flex"
                    >
                      <FiCamera /> <span>Upload Profile Photo</span>
                    </label>
                    <input
                      type="file"
                      id="userAvatarProfileTab"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">Supports JPG, PNG images stored in database</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Email Address</label>
                    <input
                      type="email"
                      value={userEmail}
                      disabled
                      className="w-full bg-gray-100 border border-gray-300 rounded-xl p-3 text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1 font-semibold">City / District</label>
                    <input
                      type="text"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-xl shadow transition text-xs cursor-pointer disabled:opacity-50"
                  >
                    {isSavingProfile ? "Saving Profile..." : "Save Profile Changes →"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- QUESTION DETAIL MODAL ---------------- */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6 text-gray-800 animate-in fade-in zoom-in duration-200">
            <button onClick={() => setSelectedQuestion(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer">
              <FiX />
            </button>

            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">ID: {selectedQuestion.id ? selectedQuestion.id.slice(-6) : "N/A"}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${selectedQuestion.status === "Answered" ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-amber-100 text-amber-800 border border-amber-300"}`}>
                  {selectedQuestion.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedQuestion.title}</h2>
              <p className="text-xs text-gray-500">Category: {selectedQuestion.category} • Submitted: {selectedQuestion.date}</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Question Statement</h3>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-800 leading-relaxed font-sans font-medium">
                {selectedQuestion.description}
              </div>
            </div>

            {/* Advocate Formal Answer */}
            {selectedQuestion.answerText && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Official Advocate Opinion & Guidance</h3>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-xs text-gray-800 leading-relaxed space-y-2">
                  <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                    <span className="font-bold text-blue-900">{selectedQuestion.advocateName}</span>
                    <span className="text-[10px] text-gray-600 font-mono">Bar Enroled Advocate</span>
                  </div>
                  <p className="pt-1 font-medium">{selectedQuestion.answerText}</p>
                </div>
              </div>
            )}

            {/* Follow-up Replies */}
            {selectedQuestion.replies && selectedQuestion.replies.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message History</h3>
                <div className="space-y-2">
                  {selectedQuestion.replies.map((r, idx) => (
                    <div key={idx} className={`p-3 rounded-xl text-xs ${r.sender === "user" ? "bg-gray-100 border border-gray-300 ml-6" : "bg-blue-50 border border-blue-200 mr-6"}`}>
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                        <span className="font-bold text-gray-900">{r.name || r.lawyer}</span>
                        <span>{r.date}</span>
                      </div>
                      <p className="text-gray-800 font-medium">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Send Follow up */}
            <form onSubmit={handleSendUserReply} className="space-y-3 pt-4 border-t border-gray-200">
              <h3 className="text-xs font-bold text-gray-900">Ask Follow-up Question to Advocate</h3>
              <textarea
                rows="3"
                value={userReplyText}
                onChange={(e) => setUserReplyText(e.target.value)}
                placeholder="Type your follow-up message..."
                className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow transition cursor-pointer">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- 1. UPLOAD DOCUMENT MODAL ---------------- */}
      {uploadDocModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center text-lg font-bold">
                  <FiUpload />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900">Upload New Legal Document</h3>
                  <p className="text-xs text-gray-500">Store identity proof, property paper, or court document</p>
                </div>
              </div>
              <button onClick={() => setUploadDocModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-4 text-xs font-semibold text-gray-800">
              <div>
                <label className="block mb-1 text-gray-700">Document Title *</label>
                <input
                  type="text"
                  value={newDocForm.name}
                  onChange={(e) => setNewDocForm({ ...newDocForm, name: e.target.value })}
                  placeholder="e.g. Aadhaar Card, Property Sale Deed, Court Notice"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-700">Category *</label>
                  <select
                    value={newDocForm.category}
                    onChange={(e) => setNewDocForm({ ...newDocForm, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-bold focus:ring-2 focus:ring-blue-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Identity">Identity Proof</option>
                    <option value="Property">Property Paper</option>
                    <option value="Court Notice">Court Notice</option>
                    <option value="Case Docs">Case Document</option>
                    <option value="General">General Document</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-gray-700">File Type *</label>
                  <select
                    value={newDocForm.type}
                    onChange={(e) => setNewDocForm({ ...newDocForm, type: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs font-bold focus:ring-2 focus:ring-blue-900 focus:outline-none cursor-pointer"
                  >
                    <option value="PDF">PDF File</option>
                    <option value="JPG">JPG Image</option>
                    <option value="PNG">PNG Image</option>
                    <option value="DOCX">Word DOCX</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Select File Attachment *</label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewDocForm({
                          ...newDocForm,
                          name: newDocForm.name || file.name.split(".")[0],
                          type: file.name.split(".").pop().toUpperCase() || newDocForm.type,
                          fileData: reader.result
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full bg-gray-50 border border-dashed border-gray-300 rounded-xl p-3 text-xs text-gray-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setUploadDocModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-800 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  Upload & Save Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- 2. VIEW / PREVIEW DOCUMENT MODAL ---------------- */}
      {previewDocModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center text-lg font-bold">
                  <FiFileText />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-gray-900">{previewDocModal.name}</h3>
                    <span className="bg-blue-900 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      {previewDocModal.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Category: {previewDocModal.category} • Size: {previewDocModal.size}</p>
                </div>
              </div>

              <button
                onClick={() => setPreviewDocModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                <FiX />
              </button>
            </div>

            {/* Document Viewer Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 mb-6 space-y-4 border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <FiLock className="text-sm" /> 256-Bit Encrypted Vault Document
                </span>
                <span>Date: {previewDocModal.date}</span>
              </div>

              <div className="min-h-40 bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col justify-center items-center text-center">
                <FiFileText className="text-4xl mb-2 text-slate-400" />
                <p className="text-sm font-bold text-slate-100 mb-1">{previewDocModal.name}</p>
                <p className="text-xs text-slate-400 max-w-md">{previewDocModal.content}</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleDownloadDoc(previewDocModal)}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-md transition text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiDownload className="text-sm" /> <span>Download Copy</span>
              </button>

              <button
                onClick={() => setPreviewDocModal(null)}
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl transition text-xs cursor-pointer"
              >
                Close Preview
              </button>
            </div>
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
                Connected with <strong className="text-blue-900">{activeCallSession.client}</strong>
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

export default Dashboard;
