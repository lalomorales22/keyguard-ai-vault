
import Sidebar from './Sidebar';
import ApiKeyList from './ApiKeyList';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        <ApiKeyList />
      </div>
    </div>
  );
};

export default Dashboard;
