import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Saved / Bookmarked Documents
  const [savedDocs, setSavedDocs] = useState(() => {
    try {
      const saved = localStorage.getItem("kanoon_mitra_saved_docs");
      return saved ? JSON.parse(saved) : ["doc-rent-agreement"];
    } catch (e) {
      return ["doc-rent-agreement"];
    }
  });

  // Consultations Booked
  const [consultations, setConsultations] = useState(() => {
    try {
      const saved = localStorage.getItem("kanoon_mitra_consultations");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "c-101",
              lawyerName: "Adv. Rajesh Sharma",
              specialization: "Criminal Law & FIR Guidance",
              date: "2026-08-10",
              time: "11:00 AM",
              status: "Confirmed",
              mode: "Video Call",
            },
          ];
    } catch (e) {
      return [];
    }
  });

  // Draft FIRs
  const [firDrafts, setFirDrafts] = useState(() => {
    try {
      const saved = localStorage.getItem("kanoon_mitra_fir_drafts");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "fir-501",
              incidentType: "Cyber Theft / Online Banking Fraud",
              policeStation: "Cyber Crime Police Station, Central",
              status: "Draft Ready for Submission",
              date: "2026-08-02",
            },
          ];
    } catch (e) {
      return [];
    }
  });

  // RTI Applications
  const [rtiFilings, setRtiFilings] = useState(() => {
    try {
      const saved = localStorage.getItem("kanoon_mitra_rti_filings");
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "rti-901",
              department: "Municipal Corporation Urban Planning",
              subject: "Road Construction & Sanitation Expense Audit",
              status: "Application Prepared",
              date: "2026-08-01",
            },
          ];
    } catch (e) {
      return [];
    }
  });

  // Toasts Alert System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("kanoon_mitra_saved_docs", JSON.stringify(savedDocs));
  }, [savedDocs]);

  useEffect(() => {
    localStorage.setItem("kanoon_mitra_consultations", JSON.stringify(consultations));
  }, [consultations]);

  useEffect(() => {
    localStorage.setItem("kanoon_mitra_fir_drafts", JSON.stringify(firDrafts));
  }, [firDrafts]);

  useEffect(() => {
    localStorage.setItem("kanoon_mitra_rti_filings", JSON.stringify(rtiFilings));
  }, [rtiFilings]);

  const toggleSaveDoc = (docId) => {
    setSavedDocs((prev) => {
      if (prev.includes(docId)) {
        addToast("Removed from saved documents", "info");
        return prev.filter((id) => id !== docId);
      } else {
        addToast("Document saved to your profile", "success");
        return [...prev, docId];
      }
    });
  };

  const bookConsultation = (booking) => {
    const newBooking = {
      id: `c-${Date.now()}`,
      status: "Confirmed",
      date: booking.date || new Date().toISOString().split("T")[0],
      ...booking,
    };
    setConsultations((prev) => [newBooking, ...prev]);
    addToast(`Consultation with ${booking.lawyerName} booked successfully!`, "success");
  };

  const saveFirDraft = (draft) => {
    const newDraft = {
      id: `fir-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "Draft Ready for Print",
      ...draft,
    };
    setFirDrafts((prev) => [newDraft, ...prev]);
    addToast("FIR Guidance draft saved to your Dashboard!", "success");
  };

  const saveRtiFiling = (rti) => {
    const newRti = {
      id: `rti-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "Application Ready",
      ...rti,
    };
    setRtiFilings((prev) => [newRti, ...prev]);
    addToast("RTI Application generated & saved!", "success");
  };

  return (
    <AppContext.Provider
      value={{
        savedDocs,
        toggleSaveDoc,
        consultations,
        bookConsultation,
        firDrafts,
        saveFirDraft,
        rtiFilings,
        saveRtiFiling,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
