import Swal from 'sweetalert2';
import { logout } from '../services/api/StudentAPI';
import { clearUser } from '../services/auth/authService';
const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be logged out of the system!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Log out',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
      clearUser();
      window.location.href = '/login';
    }
  });
};

export { handleLogout }