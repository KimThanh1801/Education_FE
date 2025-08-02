// src/layouts/StudentLayout.jsx
import Sidebar from '../components/shared/SideBar';
import Header from '../components/shared/Header';
import { Outlet } from 'react-router-dom';

const TeacherLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content-area">
        <Header />
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TeacherLayout;