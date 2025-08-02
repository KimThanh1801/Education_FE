// import api from './AxiosConfig';
import { api } from "../../utils/constants";

export const login = (credentials) => api.post("/v1/login", credentials);
export const logout = () => api.post("/v1/logout");
export const profile = () => api.get("/profile");

export const getTeacherNotifications = async () => {
  try {
    const response = await api.get('/v1/notifications/teacher'); // đường dẫn ví dụ
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông báo:', error);
    throw error;
  }
};
