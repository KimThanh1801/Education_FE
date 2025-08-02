import { Route } from 'react-router-dom';
import TeacherLayout from '../layouts/TeacherLayout';
import { Dashboard } from '../pages/student/Dashboard/Dashboard';
import { Semester } from '../pages/student/Semester/Semester';
//import { Academy } from '../pages/student/Academy/Academy';

const TeacherRoutes = () => [
    <Route path="/" element={<TeacherLayout />}>
      {/* <Route index element={<Dashboard />} />
      <Route path="semester-goals" element={<Semester />} />
      <Route path="achievement" element={<Academy />} /> */}
    </Route>
];

export default TeacherRoutes;
