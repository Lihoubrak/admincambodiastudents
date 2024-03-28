// App.js
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GlobalLayout from "./layouts/GlobalLayout";
import { dormsRoutes, schRoutes } from "./Router";
import { Login } from "./pages";
import { useAuth } from "./contexts/AuthContext";
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
            {dormsRoutes.map((route) => (
              <Route
                key={route.path}
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
            {schRoutes.map((route) => (
              <Route
                key={route.path}
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
