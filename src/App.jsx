// App.js
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GlobalLayout from "./layouts/GlobalLayout";
import { dormsRoutes, schRoutes, adminRoutes } from "./Router";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login/Login";
const App = () => {
  const { userRole, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            userRole ? (
              <AuthenticatedRoutes userRole={userRole} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

const AuthenticatedRoutes = ({ userRole }) => {
  return (
    <>
      <Routes>
        {userRole === "KTX" && (
          <>
            {dormsRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <GlobalLayout>
                    <route.component />
                  </GlobalLayout>
                }
              />
            ))}
          </>
        )}
        {userRole === "SCH" && (
          <>
            {schRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <GlobalLayout>
                    <route.component />
                  </GlobalLayout>
                }
              />
            ))}
          </>
        )}
        {userRole === "Admin" && (
          <>
            {adminRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  <GlobalLayout>
                    <route.component />
                  </GlobalLayout>
                }
              />
            ))}
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
