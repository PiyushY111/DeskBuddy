import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ArrivalPage from "./pages/stage/Arrival";
import HostelPage from "./pages/stage/Hostel";
import DocumentsPage from "./pages/stage/Documents";
import KitPage from "./pages/stage/Kit";
import ArrivalScan from "./pages/scan/ArrivalScan";
import HostelScan from "./pages/scan/HostelScan";
import DocumentsScan from "./pages/scan/DocumentsScan";
import KitScan from "./pages/scan/KitScan";
import SendQR from "./pages/SendQR";
import Analytics from "./pages/Analytics";
import { AuthProvider } from "./context/AuthContext";
import PageTransition from "./components/PageTransition";
import NewSidebar from './components/NewSidebar';
import React, { useState } from "react";
import { AnalyticsProvider } from "./context/AnalyticsContext";

function AppLayout({ children, theme }) {
  const location = useLocation();
  const handleCollapseChange = React.useCallback(() => {}, []);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const marginLeft = 64;
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;
  return (
    <div className={theme === 'dark' ? 'app dark' : 'app'}>
      {!isMobile && (
        <NewSidebar onCollapseChange={handleCollapseChange} mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />
      )}
      <div className="main-content" style={{ marginLeft: !isMobile ? marginLeft : 0, width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

function App() {
  const [theme] = useState('light');

  return (
    <AuthProvider>
      <AnalyticsProvider>
      <BrowserRouter>
        <AppLayout theme={theme}>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/arrival" element={<ArrivalPage />} />
              <Route path="/hostel" element={<HostelPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/kit" element={<KitPage />} />
              <Route path="/arrival/scan" element={<ArrivalScan />} />
              <Route path="/hostel/scan" element={<HostelScan />} />
              <Route path="/documents/scan" element={<DocumentsScan />} />
              <Route path="/kit/scan" element={<KitScan />} />
              <Route path="/sendqr" element={<SendQR />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </PageTransition>
        </AppLayout>
      </BrowserRouter>
      </AnalyticsProvider>
    </AuthProvider>
  );
}

export default App;
