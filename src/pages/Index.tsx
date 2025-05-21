
import { AppProvider } from "../context/AppContext";
import { useApp } from "../context/AppContext";
import Dashboard from "../components/Dashboard";
import LoginScreen from "../components/LoginScreen";

const IndexContent = () => {
  const { isAuthenticated } = useApp();
  
  return isAuthenticated ? <Dashboard /> : <LoginScreen />;
};

const Index = () => {
  return (
    <AppProvider>
      <IndexContent />
    </AppProvider>
  );
};

export default Index;
