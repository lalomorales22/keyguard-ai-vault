
import Sidebar from './Sidebar';
import ApiKeyList from './ApiKeyList';

const Dashboard = () => {
  return (
    <div className="flex h-screen max-h-[600px] max-w-[800px] mx-auto overflow-hidden rounded-xl border border-white/10 shadow-xl bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col">
        <ApiKeyList />
      </div>
    </div>
  );
};

export default Dashboard;
