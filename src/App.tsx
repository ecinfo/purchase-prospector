// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { ProcurementProvider } from "./contexts/ProcurementContext";
import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./components/features/dashboard/Dashboard";
import { ProcurementWorkflow } from "./components/features/procurement/ProcurementWorkflow";
import { AnalyticsDashboard } from "./components/features/analytics/AnalyticsDashboard";
import { VendorDirectory } from "./components/features/vendors/VendorDirectory";
import { Settings } from "./pages/Settings";
import { HelpSupport } from "./pages/HelpSupport";

function App() {
  return (
    <AppProvider>
      <ProcurementProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/procurement" element={<ProcurementWorkflow />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/vendors" element={<VendorDirectory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<HelpSupport />} />
            </Routes>
          </MainLayout>
        </Router>
      </ProcurementProvider>
    </AppProvider>
  );
}

export default App;
