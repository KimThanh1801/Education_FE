// src/layouts/StudentLayout.jsx
import Sidebar from '../components/shared/SideBar';
import Header from '../components/shared/Header';
import { Outlet } from 'react-router-dom';
import StudentMessage from '../components/shared/StudentMessage/StudentMessage';

const StudentLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content-area">
      <Header />
        <div className="main-content">
          <Outlet />
        </div>
      </main>
      <StudentMessage />
    </div>
  );
};

export default StudentLayout;