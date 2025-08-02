import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import ClassManagement from '../pages/admin/class-management/ClassManagement';
import TeacherManagement from '../pages/admin/teacher-management/TeacherManagement';
import StudentManagement from '../pages/admin/student-management/StudentManagement';
const AdminRoutes = () => [
  <Route path="/" element={<AdminLayout />} key="layout-admin">
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="class-management" element={<ClassManagement />} />
    <Route path="teacher-management" element={<TeacherManagement />} />
    <Route path="student-management" element={<StudentManagement />} />
  </Route>
];

export default AdminRoutes;