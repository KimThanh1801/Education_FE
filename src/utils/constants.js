import axios from "axios";
import { getToken } from "../services/auth/authService";
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json'
    }
})

// api.interceptors.request.use((config) => {
//     const token = getToken();
//     console.log("Test token: ", token);
//     if(token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// })
api.interceptors.request.use((config) => {
    const token = getToken();
    console.log("Test token: ", token);

    // Không thêm token cho các request login hoặc register
    const isAuthRoute = config.url.includes('/login') || config.url.includes('/register');
    if (!isAuthRoute && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
};

const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
};

const DATE_FORMAT = 'YYYY-MM-DD';

export {
    API_BASE_URL,
    api,
    DATE_FORMAT,
    STATUS,
    USER_ROLES
}


