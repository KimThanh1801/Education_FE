import { Routes, Route } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';
import { Dashboard } from '../pages/student/Dashboard/Dashboard';
import { Semester } from '../pages/student/Semester/Semester';
import { Academy1 } from '../pages/student/Academy/Academy1';
import { NotificationPage } from '../pages/student/Notice/Notice';

const StudentRoutes = () => (
    <Route path="/" element={<StudentLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="semester-goals" element={<Semester />} />
    <Route path="achievement" element={<Academy1 />} />
     {/* <Route path="notice" element={<NotificationPage />} /> */}
    </Route>
);

export default StudentRoutes;
