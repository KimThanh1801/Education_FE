import { Navigate } from "react-router-dom";
import { useAuth } from "../../../services/providers/AuthContext"
const RequireAuth = ({children}) => {
    const { user } = useAuth();

    return user ? children : <Navigate to='/login' replace/>
}

export default RequireAuth;