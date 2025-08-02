import React from 'react'
import './Header.css'
import { logout } from '../../../services/api/StudentAPI'
function Header() {
  const handleLogout = () => {
    logout()
      .then(() => {
      window.location.href = '/login';
    })
    .catch((err) => {
      console.error('Logout failed:', err);
    });
  }
  return (
    <div>
        <div className='header-box'>
            <div className='search-box'>
                <input className='search-input' placeholder='Your keyword'></input>
                <button>Search</button>
            </div>
            <div className='logout-box'>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Header