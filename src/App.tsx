// src/App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setUser } from "./store/slices/authSlice";

import { AppProvider } from "./contexts/AppContext";
import { ProcurementProvider } from "./contexts/ProcurementContext";

import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./components/features/dashboard/Dashboard";
import { ProcurementWorkflow } from "./components/features/procurement/ProcurementWorkflow";
import { AnalyticsDashboard } from "./components/features/analytics/AnalyticsDashboard";
import { VendorDirectory } from "./components/features/vendors/VendorDirectory";

import { Settings } from "./pages/Settings";
import { HelpSupport } from "./pages/HelpSupport";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import "./index.css";

// 🌟  Auth Initializer
const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        dispatch(setUser(JSON.parse(storedUser)));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  return <>{children}</>;
};

// 🌟 Route Wrapper using auth state
function AppRoutes() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" replace />}
        />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/procurement"
                    element={<ProcurementWorkflow />}
                  />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />
                  <Route path="/vendors" element={<VendorDirectory />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/support" element={<HelpSupport />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// 🌟 Final App with Providers + Redux + Auth init
function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <AppProvider>
          <ProcurementProvider>
            <AppRoutes />
          </ProcurementProvider>
        </AppProvider>
      </AuthInitializer>
    </Provider>
  );
}

export default App;
