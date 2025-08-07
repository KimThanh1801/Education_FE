import { Route } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';
import Profile from '../components/student/Profile/Profile';
import RequireAuth from '../components/shared/RequireAuth/RequireAuth';
import { Academy1 } from '../pages/student/Academy/Academy1';
import { Dashboard } from '../pages/student/Dashboard/Dashboard';
import Semester from '../pages/student/Semester/Semester';
import StudyPlan from '../pages/student/StudyPlan/StudyPlan';

const StudentRoutes = () => [
  <Route path="/" element={<StudentLayout />} key="layout-student">
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="semester-goals" element={<Semester />} />
    <Route path="achievement" element={<Academy1 />} />
    <Route path="study-plans" element={<StudyPlan />} />
<Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
  </Route>
];

export default StudentRoutes;
