// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { useAppSelector } from "./hooks/redux";

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
import { ChangePassword } from "./components/auth/ChangePassword";
import ProjectsList from "./components/features/procurement/ProjectsList";

// ----------------------------
// ROUTES
// ----------------------------
function AppRoutes() {
  const { user } = useAppSelector((state) => state.auth);
  console.log("Auth User in AppRoutes:", user);

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
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Child routes rendered inside MainLayout via <Outlet /> */}
          <Route index element={<Dashboard />} />
          <Route path="procurement" element={<ProcurementWorkflow />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="vendors" element={<VendorDirectory />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<HelpSupport />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="history" element={<ProjectsList />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

// ----------------------------
// FINAL APP
// ----------------------------
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>
          <ProcurementProvider>
            <AppRoutes />
          </ProcurementProvider>
        </AppProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
