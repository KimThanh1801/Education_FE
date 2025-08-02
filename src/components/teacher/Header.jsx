import React from 'react'
import { useAuth } from '../../services/providers/AuthContext';
function Header() {
    const { setUser } = useAuth();
    const switchAdmin = () => {
        setUser(prev => ({
            ...prev,
            role: 'student'

        }));
    }
  return (
    <div>
        This is a header of teacher page.
        <button onClick={switchAdmin}>Switch to Student</button>
    </div>
  )
}

export default Header