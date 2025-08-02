import { Route } from 'react-router-dom';
import TeacherLayout from '../layouts/TeacherLayout';
import TeacherNotificationPage from '../pages/teacher/alert/TeacherNotificationPage';

const TeacherRoutes = () => [
    <Route path="/" element={<TeacherLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="semester-goals" element={<Semester />} />
      <Route path="achievement" element={<Academy />} />
    <Route path="notifications" element={<TeacherNotificationPage />} />
    </Route>
];

export default TeacherRoutes;
