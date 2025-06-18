import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ user, onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

