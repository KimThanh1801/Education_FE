import { Route } from 'react-router-dom';
import TeacherLayout from '../layouts/TeacherLayout';
import { Dashboard } from '../pages/student/Dashboard/Dashboard';
import { Semester } from '../pages/student/Semester/Semester';

const TeacherRoutes = () => [
    <Route path="/" element={<TeacherLayout />}>
      {/* <Route index element={<Dashboard />} />
      <Route path="semester-goals" element={<Semester />} />
      <Route path="achievement" element={<Academy />} /> */}
    </Route>
];

export default TeacherRoutes;
