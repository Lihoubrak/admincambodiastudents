import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GlobalLayout from "./layouts/GlobalLayout";
import { publicRoute } from "./Router";
import Cookies from "js-cookie";
import { SocketProvider } from "./contexts/SocketContext";
const isAuthenticated = () => {
  const token = Cookies.get("tokenJwt");
  return !!token;
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoute.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.path === "/login" ? (
                isAuthenticated() ? (
                  <Navigate to="/" replace />
                ) : (
                  <route.component />
                )
              ) : isAuthenticated() ? (
                <GlobalLayout>
                  <SocketProvider>
                    <route.component />
                  </SocketProvider>
                </GlobalLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
