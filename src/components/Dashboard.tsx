
import Sidebar from './Sidebar';
import ApiKeyList from './ApiKeyList';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <ApiKeyList />
    </div>
  );
};

export default Dashboard;
