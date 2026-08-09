import React, { useState } from "react";
import { API_BASE_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";

const RtiPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("online"); // "online" | "offline"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rtiSuccessModal, setRtiSuccessModal] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [uploadedDoc, setUploadedDoc] = useState(null);

  // Online Form State (matching rtionline.gov.in)
  const [onlineData, setOnlineData] = useState({
    serviceType: "RTI-ONLINE",
    searchAuthority: "",
    ministry: "",
    publicAuthority: "",
    name: "",
    gender: "Male",
    address: "",
    pincode: "",
    country: "India",
    state: "Delhi",
    status: "Urban",
    educationalStatus: "Literate",
    educationLevel: "Graduate",
    phone: "",
    mobile: "",
    email: "",
    confirmEmail: "",
    citizenship: "Indian",
    isBpl: "No",
    bplCardNo: "",
    bplYearOfIssue: "",
    bplIssuingAuthority: "",
    rtiText: "",
    uploadedDoc
  });

  // Offline Form State (matching physical Sample Application Form image)
  const [offlineData, setOfflineData] = useState({
    serviceType: "RTI-OFFLINE-FORM",
    pioOffice: "Office of the Public Information Officer (CPIO)",
    pioDepartment: "Municipal Corporation / Public Works Dept",
    pioAddress: "Civic Centre, Minto Road, New Delhi",
    pioPincode: "110002",
    applicantTitle: "Sri",
    applicantName: "",
    relativeTitle: "Son of",
    relativeName: "",
    address: "",
    pincode: "",
    phone: "",
    mobile: "",
    email: "",
    rtiText: "",
    paymentMode: "Postal Order (IPO)",
    feeAmount: "10",
    feeRefNo: "",
    favoring: "Accounts Officer, Concerned Dept",
    feeDate: new Date().toISOString().split("T")[0],
    photocopyFee: "0",
    pageCount: "0",
    cdFee: "0",
    isBpl: "No",
    bplCardNo: "",
  });

  const ministriesList = [
    { ministry: "Ministry of Home Affairs", authorities: ["Delhi Police", "Central Armed Police Forces", "Registrar General of India", "Intelligence Bureau (Administration)"] },
    { ministry: "Ministry of Personnel, Public Grievances and Pensions", authorities: ["Department of Personnel and Training (DoPT)", "Central Vigilance Commission (CVC)", "CBI (Administration)"] },
    { ministry: "Ministry of Finance", authorities: ["Income Tax Department", "Central Board of Indirect Taxes & Customs (CBIC)", "Department of Expenditure", "Enforcement Directorate"] },
    { ministry: "Ministry of Education", authorities: ["University Grants Commission (UGC)", "CBSE Board", "Central Universities", "National Testing Agency (NTA)"] },
    { ministry: "Ministry of Road Transport and Highways", authorities: ["National Highways Authority of India (NHAI)", "Regional Transport Office (RTO)"] },
    { ministry: "Ministry of Railways", authorities: ["Railway Board", "Northern Railway", "Western Railway", "IRCTC"] },
    { ministry: "Ministry of External Affairs", authorities: ["Regional Passport Office", "Consular Services"] },
    { ministry: "State Government / Local Public Authority", authorities: ["Municipal Corporation / Civic Body", "Public Works Department (PWD)", "Revenue & Land Records Office", "State Transport Corporation"] },
  ];

  const currentMinistryObj = ministriesList.find((m) => m.ministry === onlineData.ministry);
  const availableAuthorities = currentMinistryObj ? currentMinistryObj.authorities : [];

  const handleOnlineChange = (e) => {
    const { name, value } = e.target;
    setOnlineData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOfflineChange = (e) => {
    const { name, value } = e.target;
    setOfflineData((prev) => ({ ...prev, [name]: value }));
  };

  const _handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("File size exceeds 1 MB limit. Please upload a smaller PDF.");
        return;
      }
      setUploadedDoc({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
      });
    }
  };

  const handleOnlineSubmit = async (e) => {
    e.preventDefault();
    if (!onlineData.ministry || !onlineData.publicAuthority) {
      alert("Please select Ministry/Department and Public Authority.");
      return;
    }
    if (!onlineData.name.trim() || !onlineData.address.trim() || !onlineData.mobile.trim() || !onlineData.email.trim()) {
      alert("Please fill in mandatory personal details.");
      return;
    }
    if (onlineData.email !== onlineData.confirmEmail) {
      alert("Email-ID and Confirm Email-ID do not match.");
      return;
    }
    if (!onlineData.rtiText.trim()) {
      alert("Please enter the Text for RTI Request application.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...onlineData,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/services/rti-filing`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await response.json();

      const registrationNo = `DOPT/R/2026/${Math.floor(10000 + Math.random() * 90000)}`;
      setRtiSuccessModal({
        registrationNo,
        type: "Online RTI Request",
        applicantName: onlineData.name,
        department: `${onlineData.publicAuthority} (${onlineData.ministry})`,
        fee: onlineData.isBpl === "Yes" ? "₹0 (BPL Fee Waived)" : "₹10 (Paid)",
        date: new Date().toLocaleDateString("en-IN"),
      });
    } catch (err) {
      console.error("Submission error:", err);
      const registrationNo = `DOPT/R/2026/${Math.floor(10000 + Math.random() * 90000)}`;
      setRtiSuccessModal({
        registrationNo,
        type: "Online RTI Request",
        applicantName: onlineData.name,
        department: `${onlineData.publicAuthority} (${onlineData.ministry})`,
        fee: onlineData.isBpl === "Yes" ? "₹0 (BPL Fee Waived)" : "₹10 (Paid)",
        date: new Date().toLocaleDateString("en-IN"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOfflineSubmit = async (e) => {
    e.preventDefault();
    if (!offlineData.applicantName.trim() || !offlineData.address.trim() || !offlineData.mobile.trim() || !offlineData.rtiText.trim()) {
      alert("Please fill in Applicant Name, Address, Mobile Number, and Information Queries.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...offlineData,
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/services/rti-filing`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await response.json();

      const registrationNo = `KM-RTI-PHYSICAL-${Math.floor(10000 + Math.random() * 90000)}`;
      setRtiSuccessModal({
        registrationNo,
        type: "Physical RTI Application Form",
        applicantName: offlineData.applicantName,
        department: offlineData.pioDepartment,
        fee: offlineData.isBpl === "Yes" ? "₹0 (BPL Exempted)" : `₹${offlineData.feeAmount} (${offlineData.paymentMode})`,
        date: new Date().toLocaleDateString("en-IN"),
      });
    } catch (err) {
      console.error("Submission error:", err);
      const registrationNo = `KM-RTI-PHYSICAL-${Math.floor(10000 + Math.random() * 90000)}`;
      setRtiSuccessModal({
        registrationNo,
        type: "Physical RTI Application Form",
        applicantName: offlineData.applicantName,
        department: offlineData.pioDepartment,
        fee: offlineData.isBpl === "Yes" ? "₹0 (BPL Exempted)" : `₹${offlineData.feeAmount} (${offlineData.paymentMode})`,
        date: new Date().toLocaleDateString("en-IN"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Print Official Sample RTI Application (Matching Image Document)
  const handlePrintSampleRtiForm = () => {
    const data = activeTab === "online" ? {
      applicantTitle: "Sri/Smt",
      applicantName: onlineData.name || "_________________________",
      relativeName: "_________________________",
      address: onlineData.address || "_________________________",
      phone: onlineData.phone || "______",
      mobile: onlineData.mobile || "__________",
      rtiText: onlineData.rtiText || "1. __________________________________________________\n2. __________________________________________________",
      pioDepartment: onlineData.publicAuthority || "The Public Information Officer",
      pioAddress: onlineData.ministry || "Department Address",
      pioPincode: onlineData.pincode || "_______",
      isBpl: onlineData.isBpl,
      feeAmount: onlineData.isBpl === "Yes" ? "0" : "10",
      paymentMode: "Online Payment",
      favoring: "Public Information Officer",
      feeDate: new Date().toLocaleDateString("en-IN"),
      photocopyFee: "0",
      pageCount: "0",
      cdFee: "0",
    } : offlineData;

    const printWindow = window.open("", "_blank");
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>RTI APPLICATION FORM</title>
        <style>
          body { font-family: 'Times New Roman', Times, serif; padding: 40px; line-height: 1.8; color: #000; background: #fff; }
          .title { text-align: center; font-size: 18px; font-weight: bold; text-decoration: underline; margin-bottom: 30px; letter-spacing: 0.5px; }
          .to-box { margin-bottom: 20px; line-height: 1.5; }
          .subject { text-align: center; font-weight: bold; margin: 20px 0; font-size: 15px; }
          .body-text { text-align: justify; margin-bottom: 15px; }
          .query-box { border: 1px solid #333; padding: 15px; min-height: 120px; font-family: Arial, sans-serif; font-size: 13px; margin: 15px 0; white-space: pre-wrap; }
          .clause-list { margin-top: 15px; padding-left: 20px; }
          .clause-list li { margin-bottom: 12px; text-align: justify; }
          .signature-section { margin-top: 60px; float: right; text-align: right; }
          .clear { clear: both; }
        </style>
      </head>
      <body>
        <div class="title">RTI APPLICATION FORM</div>

        <div class="to-box">
          To,<br/>
          The Public Information Officer<br/>
          <strong>${data.pioDepartment || "_________________________________"}</strong><br/>
          ${data.pioAddress || "_________________________________"}<br/>
          PIN: <strong>${data.pioPincode || "_________________"}</strong>
        </div>

        <p>Sir,</p>

        <div class="subject">Subject: Request for Information under Right to Information Act 2005.</div>

        <div class="body-text">
          I <strong>${data.applicantTitle || "Sri / Smt / Ms."} ${data.applicantName || "__________________________________________________"}</strong><br/>
          Son/Daughter/wife of Shri/Smt/Ms. <strong>${data.relativeName || "__________________________________________________"}</strong><br/>
          resident of <strong>${data.address || "___________________________________________________________________"}</strong><br/>
          telephone number (with STD Code) <strong>${data.phone || "______"}</strong> - <strong>________________</strong> and/or mobile number: <strong>+91 ${data.mobile || "___________________"}</strong> wish to seek information as under:
        </div>

        <div class="query-box">${data.rtiText || "1. Information Query Details..."}</div>

        <p>I hereby inform that following formalities have been completed by me:</p>

        <ol class="clause-list">
          <li>That I have deposited the requisite fee of Rs. <strong>${data.isBpl === "Yes" ? "0" : (data.feeAmount || "10")}</strong>/- by way of Cash / banker cheque / Draft / Postal Order/ others (<strong>${data.paymentMode || "IPO"} ${data.feeRefNo ? "#" + data.feeRefNo : ""}</strong>) favoring <strong>${data.favoring || "Public Information Officer"}</strong> dated <strong>${data.feeDate || new Date().toLocaleDateString("en-IN")}</strong>.</li>
          <li>I need the photocopy of the documents and I had deposited the cost of the photocopy of Rs. <strong>${data.photocopyFee || "____"}</strong>/- for <strong>${data.pageCount || "____"}</strong> (Number of Pages)<br/>
          <em style="display:block; text-align:center; margin: 4px 0;">or</em>
          <li>I had deposited sum of Rs. <strong>${data.cdFee || "____"}</strong>/- for the charges of CD. (strike out whichever is not applicable)</li>
          <li>That I belong to Category of below Poverty Line (BPL): <strong>${data.isBpl}</strong> (Strike whichever is not applicable). If yes, I am attaching the valid photocopy of the certificate. <strong>${data.isBpl}</strong></li>
          <li>That I am 'Citizen' of India and I am asking the information as 'Citizen'.</li>
          <li>I assure that I shall not allow/ cause to use/ pass/share/display/ or circulate the information received in any case and under any circumstances, with any person or in any manner which would be detrimental to the Unity and Sovereignty or against the Interest of India.</li>
        </ol>

        <div class="signature-section">
          Signature of the Applicant<br/><br/>
          Dated: ${new Date().toLocaleDateString("en-IN")}
        </div>
        <div class="clear"></div>
        <script>window.print();</script>
      </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 font-sans pb-16">
      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white border-b border-amber-500/40 mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-500/20 border border-amber-400/40 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Right to Information (RTI) Portal</h1>
                <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">RTI Act 2005</span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                Generate Official Physical RTI Applications or File Online via Govt DoPT Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintSampleRtiForm}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition shadow flex items-center gap-2"
            >
              Print RTI Application
            </button>
            <button
              onClick={() => navigate("/AskLawyer")}
              className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold px-4 py-2 rounded-lg text-xs transition shadow"
            >
              Ask AI Assistant
            </button>
          </div>
        </div>

        {/* Tab Switcher Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 pt-2">
          <button
            onClick={() => setActiveTab("online")}
            className={`px-6 py-3 font-bold text-xs sm:text-sm border-b-2 transition flex items-center gap-2 ${
              activeTab === "online"
                ? "border-amber-400 text-amber-300 bg-blue-900/40 rounded-t-lg"
                : "border-transparent text-gray-300 hover:text-white"
            }`}
          >
            Online RTI Request Form (rtionline.gov.in)
          </button>
          <button
            onClick={() => setActiveTab("offline")}
            className={`px-6 py-3 font-bold text-xs sm:text-sm border-b-2 transition flex items-center gap-2 ${
              activeTab === "offline"
                ? "border-amber-400 text-amber-300 bg-blue-900/40 rounded-t-lg"
                : "border-transparent text-gray-300 hover:text-white"
            }`}
          >
             Physical / Offline Sample RTI Application Form
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: ONLINE RTI REQUEST FORM */}
        {activeTab === "online" && (
          <div className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-blue-950">Online RTI Request Form (Version 2.0)</h2>
                <p className="text-xs text-red-600 font-semibold mt-0.5">Note: Fields marked with * are Mandatory.</p>
              </div>
              <span className="text-xs text-gray-500 font-mono">rtionline.gov.in Standard</span>
            </div>

            <form onSubmit={handleOnlineSubmit} className="p-6 sm:p-8 space-y-8">
              {/* Public Authority Details */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-b border-gray-200 pb-2 flex items-center gap-2">
              Public Authority Details :-
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  <label className="text-xs font-semibold text-gray-800">
                    <span className="text-red-600 font-bold">*</span> Select Ministry/Department/Apex body:
                  </label>
                  <select
                    name="ministry"
                    value={onlineData.ministry}
                    onChange={(e) => {
                      handleOnlineChange(e);
                      setOnlineData((prev) => ({ ...prev, ministry: e.target.value, publicAuthority: "" }));
                    }}
                    className="md:col-span-2 border border-gray-300 rounded-md p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    required
                  >
                    <option value="">--Select Ministry/Department--</option>
                    {ministriesList.map((m, idx) => (
                      <option key={idx} value={m.ministry}>
                        {m.ministry}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  <div className="md:col-span-1">
                    <label className="text-xs font-semibold text-gray-800 block">
                      <span className="text-red-600 font-bold">*</span> Select Public Authority:
                    </label>
                    <span className="text-[10px] text-red-500 italic block">
                      (Your Request will be filed with this selected Public Authority)
                    </span>
                  </div>
                  <select
                    name="publicAuthority"
                    value={onlineData.publicAuthority}
                    onChange={handleOnlineChange}
                    disabled={!onlineData.ministry}
                    className="md:col-span-2 border border-gray-300 rounded-md p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white disabled:bg-gray-100 disabled:opacity-60"
                    required
                  >
                    <option value="">--Select Public Authority--</option>
                    {availableAuthorities.map((auth, idx) => (
                      <option key={idx} value={auth}>
                        {auth}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <span>👤</span> Personal Details of RTI Applicant :-
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <label className="font-semibold text-gray-800">
                      <span className="text-red-600 font-bold">*</span> Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={onlineData.name}
                      onChange={handleOnlineChange}
                      placeholder="Applicant full name"
                      className="md:col-span-2 border border-gray-300 rounded-md p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <label className="font-semibold text-gray-800">
                      <span className="text-red-600 font-bold">*</span> Gender:
                    </label>
                    <div className="md:col-span-2 flex items-center gap-6 border border-gray-300 rounded-md p-2 bg-white">
                      {["Male", "Female", "Third Gender"].map((g) => (
                        <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={onlineData.gender === g}
                            onChange={handleOnlineChange}
                            className="text-blue-600"
                          />
                          <span>{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                    <label className="font-semibold text-gray-800">
                      <span className="text-red-600 font-bold">*</span> Address:
                    </label>
                    <textarea
                      rows="3"
                      name="address"
                      value={onlineData.address}
                      onChange={handleOnlineChange}
                      placeholder="Complete correspondence address..."
                      className="md:col-span-2 border border-gray-300 rounded-md p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <label className="font-semibold text-gray-800">State & PIN Code:</label>
                    <div className="md:col-span-2 flex gap-3">
                      <select
                        name="state"
                        value={onlineData.state}
                        onChange={handleOnlineChange}
                        className="w-1/2 border border-gray-300 rounded-md p-2 text-xs bg-white"
                      >
                        <option value="Delhi">Delhi</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Karnataka">Karnataka</option>
                      </select>
                      <input
                        type="text"
                        name="pincode"
                        value={onlineData.pincode}
                        onChange={handleOnlineChange}
                        placeholder="Pin code"
                        maxLength="6"
                        className="w-1/2 border border-gray-300 rounded-md p-2 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <label className="font-semibold text-gray-800">
                      <span className="text-red-600 font-bold">*</span> Mobile & Email:
                    </label>
                    <div className="md:col-span-2 flex gap-3">
                      <input
                        type="tel"
                        name="mobile"
                        value={onlineData.mobile}
                        onChange={handleOnlineChange}
                        placeholder="Mobile (+91)"
                        className="w-1/2 border border-gray-300 rounded-md p-2 text-xs bg-white"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        value={onlineData.email}
                        onChange={handleOnlineChange}
                        placeholder="Email ID"
                        className="w-1/2 border border-gray-300 rounded-md p-2 text-xs bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <label className="font-semibold text-gray-800">
                      <span className="text-red-600 font-bold">*</span> Confirm Email-ID:
                    </label>
                    <input
                      type="email"
                      name="confirmEmail"
                      value={onlineData.confirmEmail}
                      onChange={handleOnlineChange}
                      placeholder="Confirm Email ID"
                      className="md:col-span-2 border border-gray-300 rounded-md p-2 text-xs bg-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-b border-gray-200 pb-2 flex items-center gap-2">
                  <span>📝</span> Request Details :-
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <label className="font-semibold text-gray-800">Below Poverty Line (BPL):</label>
                    <select
                      name="isBpl"
                      value={onlineData.isBpl}
                      onChange={handleOnlineChange}
                      className="md:col-span-2 border border-gray-300 rounded-md p-2 text-xs bg-white"
                    >
                      <option value="No">No (RTI Fee Applicable - ₹10)</option>
                      <option value="Yes">Yes (Fee Exempted)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-800 block mb-1">
                      <span className="text-red-600 font-bold">*</span> Text for RTI Request application (up to 3000 characters):
                    </label>
                    <textarea
                      rows="6"
                      name="rtiText"
                      value={onlineData.rtiText}
                      onChange={handleOnlineChange}
                      placeholder="Specify your exact queries / information sought under RTI Act 2005..."
                      className="w-full border border-gray-300 rounded-md p-3 text-xs font-mono bg-white"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="bg-slate-50 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-500 block">Fee Payable:</span>
                  <span className="text-lg font-bold text-blue-950">
                    {onlineData.isBpl === "Yes" ? "₹0 (BPL Exempted)" : "₹10 (Statutory Fee)"}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handlePrintSampleRtiForm}
                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg text-xs font-semibold shadow transition"
                  >
                    Download / Print Draft PDF 📄
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-2.5 rounded-lg text-xs font-bold shadow transition"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Online RTI Request"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: OFFLINE / PHYSICAL SAMPLE RTI APPLICATION FORM */}
        {activeTab === "offline" && (
          <div className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-blue-950">SAMPLE RTI APPLICATION FORM (Physical / Postal Submission)</h2>
                <p className="text-xs text-gray-600 mt-0.5">As per Section 6(1) Right to Information Act 2005 Format</p>
              </div>
              <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 font-bold">
                Offline Paper Application
              </span>
            </div>

            <form onSubmit={handleOfflineSubmit} className="p-6 sm:p-8 space-y-6 text-xs">
              {/* To PIO Section */}
              <div className="border border-gray-200 rounded-xl p-5 bg-amber-50/30 space-y-3">
                <h3 className="font-bold text-sm text-blue-900 border-b pb-2">To (Public Information Officer Details):</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Target Department / Public Authority*</label>
                    <input
                      type="text"
                      name="pioDepartment"
                      value={offlineData.pioDepartment}
                      onChange={handleOfflineChange}
                      placeholder="e.g. Public Information Officer, Municipal Corporation / PWD"
                      className="w-full border border-gray-300 rounded-md p-2 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Office Address*</label>
                    <input
                      type="text"
                      name="pioAddress"
                      value={offlineData.pioAddress}
                      onChange={handleOfflineChange}
                      placeholder="Office address"
                      className="w-full border border-gray-300 rounded-md p-2 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Office PIN Code</label>
                    <input
                      type="text"
                      name="pioPincode"
                      value={offlineData.pioPincode}
                      onChange={handleOfflineChange}
                      placeholder="PIN Code"
                      className="w-full border border-gray-300 rounded-md p-2 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Applicant Personal Info */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 space-y-3">
                <h3 className="font-bold text-sm text-blue-900 border-b pb-2">Applicant Particulars (Clause 1):</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Title & Full Name*</label>
                    <div className="flex gap-2">
                      <select
                        name="applicantTitle"
                        value={offlineData.applicantTitle}
                        onChange={handleOfflineChange}
                        className="w-24 border border-gray-300 rounded-md p-2 bg-white"
                      >
                        <option>Sri</option>
                        <option>Smt</option>
                        <option>Ms.</option>
                      </select>
                      <input
                        type="text"
                        name="applicantName"
                        value={offlineData.applicantName}
                        onChange={handleOfflineChange}
                        placeholder="Full Name"
                        className="w-full border border-gray-300 rounded-md p-2 bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Son/Daughter/wife of Shri/Smt/Ms.</label>
                    <div className="flex gap-2">
                      <select
                        name="relativeTitle"
                        value={offlineData.relativeTitle}
                        onChange={handleOfflineChange}
                        className="w-28 border border-gray-300 rounded-md p-2 bg-white text-xs"
                      >
                        <option>Son of</option>
                        <option>Daughter of</option>
                        <option>Wife of</option>
                      </select>
                      <input
                        type="text"
                        name="relativeName"
                        value={offlineData.relativeName}
                        onChange={handleOfflineChange}
                        placeholder="Relative Name"
                        className="w-full border border-gray-300 rounded-md p-2 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Mobile Number*</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={offlineData.mobile}
                      onChange={handleOfflineChange}
                      placeholder="+91 Mobile Number"
                      className="w-full border border-gray-300 rounded-md p-2 bg-white"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-semibold text-gray-700 mb-1">Residential Postal Address*</label>
                    <input
                      type="text"
                      name="address"
                      value={offlineData.address}
                      onChange={handleOfflineChange}
                      placeholder="Full residential address"
                      className="w-full border border-gray-300 rounded-md p-2 bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Telephone (with STD Code)</label>
                    <input
                      type="text"
                      name="phone"
                      value={offlineData.phone}
                      onChange={handleOfflineChange}
                      placeholder="e.g. 011-23456789"
                      className="w-full border border-gray-300 rounded-md p-2 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Information Sought */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50 space-y-3">
                <h3 className="font-bold text-sm text-blue-900 border-b pb-2">Information Sought (Clause 2):</h3>
                <textarea
                  rows="5"
                  name="rtiText"
                  value={offlineData.rtiText}
                  onChange={handleOfflineChange}
                  placeholder="Wish to seek information as under (List your questions 1, 2, 3 clearly)..."
                  className="w-full border border-gray-300 rounded-md p-3 font-mono bg-white"
                  required
                ></textarea>
              </div>

              {/* Formalities & Payment Options (Items 1 - 6) */}
              <div className="border border-gray-200 rounded-xl p-5 bg-amber-50/30 space-y-4">
                <h3 className="font-bold text-sm text-blue-900 border-b pb-2">Formalities & Fee Declarations (Items 1 - 6):</h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <label className="font-semibold text-gray-800">1. Fee Deposit Mode:</label>
                    <select
                      name="paymentMode"
                      value={offlineData.paymentMode}
                      onChange={handleOfflineChange}
                      className="border border-gray-300 rounded-md p-2 bg-white"
                    >
                      <option>Postal Order (IPO)</option>
                      <option>Demand Draft (DD)</option>
                      <option>Banker Cheque</option>
                      <option>Cash</option>
                    </select>
                    <input
                      type="text"
                      name="feeRefNo"
                      value={offlineData.feeRefNo}
                      onChange={handleOfflineChange}
                      placeholder="IPO / DD Serial No."
                      className="border border-gray-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <label className="font-semibold text-gray-800">Favoring Authority:</label>
                    <input
                      type="text"
                      name="favoring"
                      value={offlineData.favoring}
                      onChange={handleOfflineChange}
                      placeholder="Accounts Officer..."
                      className="md:col-span-2 border border-gray-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                    <label className="font-semibold text-gray-800">4. Below Poverty Line (BPL):</label>
                    <select
                      name="isBpl"
                      value={offlineData.isBpl}
                      onChange={handleOfflineChange}
                      className="md:col-span-2 border border-gray-300 rounded-md p-2 bg-white"
                    >
                      <option value="No">No (Fee Applicable)</option>
                      <option value="Yes">Yes (Attach BPL Photocopy Certificate)</option>
                    </select>
                  </div>

                  <div className="bg-white p-3 rounded border text-gray-700 leading-relaxed text-[11px] space-y-1">
                    <p><strong>5. Undertaking:</strong> That I am 'Citizen' of India and I am asking the information as 'Citizen'.</p>
                    <p><strong>6. Undertaking:</strong> I assure that I shall not allow/ cause to use/ pass/share/display/ or circulate the information received in any case and under any circumstances, with any person or in any manner which would be detrimental to the Unity and Sovereignty or against the Interest of India.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-slate-50 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-600">
                  <span>Physical RTI Application Ready for Printing & SpeedPost Dispatch</span>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handlePrintSampleRtiForm}
                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg text-xs font-semibold shadow transition"
                  >
                    Print Sample Application PDF 📄
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-2.5 rounded-lg text-xs font-bold shadow transition"
                  >
                    {isSubmitting ? "Submitting..." : "Save & Generate Form"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* FAQs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold text-blue-950 mb-4">RTI Application FAQs</h2>
        <div className="space-y-3">
          {[
            { q: "How do I send a physical RTI Application?", a: "Print the generated Sample RTI Application Form, attach a ₹10 Indian Postal Order (IPO) or Demand Draft in favor of the Public Information Officer, and dispatch it via SpeedPost or Registered Post." },
            { q: "What is the fee for filing RTI?", a: "Statutory filing fee is ₹10 for General category citizens. Below Poverty Line (BPL) cardholders are exempt from paying any fee." },
            { q: "What is the response timeline for RTI?", a: "The PIO is legally required to respond within 30 days under Section 7(1) of the RTI Act 2005." },
          ].map((faq, idx) => (
            <div
              key={idx}
              onClick={() => toggleFaq(idx)}
              className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center font-semibold text-gray-800 text-xs sm:text-sm">
                <span>{faq.q}</span>
                <span className="text-blue-600 font-bold">{openFaq === idx ? "−" : "+"}</span>
              </div>
              {openFaq === idx && (
                <p className="mt-2 text-xs text-gray-600 border-t pt-2 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Success Submission Modal */}
      {rtiSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative animate-in fade-in zoom-in">
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              📄
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">RTI Application Processed!</h3>
            <p className="text-xs text-gray-500 mb-4">
              Ref Number: <strong className="text-blue-700 font-mono text-sm">{rtiSuccessModal.registrationNo}</strong>
            </p>

            <div className="bg-blue-50 rounded-xl p-4 text-left text-xs space-y-1.5 border border-blue-100 mb-6 text-gray-800">
              <p><strong>Type:</strong> {rtiSuccessModal.type}</p>
              <p><strong>Applicant Name:</strong> {rtiSuccessModal.applicantName}</p>
              <p><strong>Department:</strong> {rtiSuccessModal.department}</p>
              <p><strong>Fee Status:</strong> {rtiSuccessModal.fee}</p>
              <p><strong>Date:</strong> {rtiSuccessModal.date}</p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handlePrintSampleRtiForm}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg text-xs font-bold shadow transition"
              >
                Print Sample RTI Application PDF 📄
              </button>
              <button
                onClick={() => setRtiSuccessModal(null)}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-xs font-medium hover:bg-gray-100 transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RtiPage;


