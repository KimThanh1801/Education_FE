import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../services/providers/AuthContext';
import TeacherRoutes from './TeacherRoutes';
import Login from '../components/shared/Login/Login';
import { Navigate } from 'react-router-dom';
import StudentRoutes from './StudentRoutes';
import AdminRoutes from './AdminRoutes';
const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
        {user?.role === 'student' && StudentRoutes({ userRole: user.role })}
        {user?.role === 'teacher' && TeacherRoutes({ userRole: user.role })}
        {user?.role === 'admin' && AdminRoutes({ userRole: user.role })}
    </Routes>
  );
};

export default AppRoutes;