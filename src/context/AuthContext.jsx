import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("kanoon_mitra_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("kanoon_mitra_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("kanoon_mitra_user");
    }
  }, [user]);

  const login = (userData) => {
    const defaultUser = {
      name: userData?.fullName || userData?.name || userData?.identifier?.split("@")[0] || "Ashif Ansari",
      email: userData?.email || userData?.identifier || "ashifansari04704@gmail.com",
      mobile: userData?.mobile || userData?.phone || "+91 98765 43210",
      accountType: userData?.accountType || "Citizen / Client",
      state: userData?.state || "Delhi",
      city: userData?.city || "New Delhi",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      ...userData,
    };
    setUser(defaultUser);
    return defaultUser;
  };

  const signup = (userData) => {
    const newUser = {
      name: userData?.fullName || userData?.name || "New User",
      email: userData?.email || "",
      mobile: userData?.mobile || userData?.phone || "",
      accountType: userData?.accountType || "Citizen / Client",
      state: userData?.state || "Delhi",
      city: userData?.city || "New Delhi",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      ...userData,
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
