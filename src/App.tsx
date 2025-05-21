
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from './context/AppContext';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';
import NotFound from "./pages/NotFound";

const AppContent = () => {
  const { isAuthenticated } = useApp();
  
  return (
    <div className="app-container">
      {isAuthenticated ? <Dashboard /> : <LoginScreen />}
    </div>
  );
};

const App = () => (
  <AppProvider>
    <TooltipProvider>
      <div className="macOS-app">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </AppProvider>
);

export default App;
