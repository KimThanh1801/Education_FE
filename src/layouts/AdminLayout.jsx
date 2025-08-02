// src/layouts/StudentLayout.jsx
import Header from '../components/admin/Header/Header';
import AdminMessage from '../components/shared/AdminMessage/AdminMessage';
import Sidebar from '../components/shared/SideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content-area">
        <Header />
        <div className="main-content">
          <Outlet />
        </div>
      </main>
      <AdminMessage />
    </div>
  );
};

export default AdminLayout;