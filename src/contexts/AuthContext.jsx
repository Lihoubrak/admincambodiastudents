import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = () => {
    const token = Cookies.get("tokenJwt");
    return token ? jwtDecode(token).role : null;
  };
  useEffect(() => {
    const role = isAuthenticated();
    setUserRole(role);
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider value={{ userRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
