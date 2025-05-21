
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
  
  return isAuthenticated ? <Dashboard /> : <LoginScreen />;
};

const App = () => (
  <AppProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AppProvider>
);

export default App;
