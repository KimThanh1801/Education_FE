import { api } from "../../utils/constants";

// =========================
// 🔐 Authentication
// =========================
export const login = (credentials) => api.post("/v1/login", credentials);
export const logout = () => api.post("/v1/logout");
export const profile = () => api.get("/profile");

// =========================
// 👨‍🎓 Student APIs
// =========================
export const getCourses = () => api.get("/student/courses");
export const getFeedbacks = () => api.get("/student/feedbacks");

// =========================
// 🧑‍🏫 Admin - Class Management
// =========================
export const getClasses = async () => {
  try {
    const response = await api.get("/v1/classes");
    return response.data;
  } catch (error) {
    console.error("Error at fetching class data: ", error);
    return [];
  }
};

export const getNameOfTeachers = async () => {
  try {
    const response = await api.get("/v1/teachers");
    return response.data;
  } catch (error) {
    console.error("Error at fetching teacher data", error);
    return [];
  }
};

export const getTeachers = async () => {
  try {
    const response = await api.get("/v1/teachers");
    return response.data.data;
  } catch (error) {
    console.log("Failed to fetch teachers", error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await api.get("/v1/students");
    return response.data.data;
  } catch (error) {
    console.log("Failed to fetch students", error);
    throw error;
  }
};

export const updateAvatarStudent = async (file) => {
  const formData = new FormData();
  formData.append("image", file); // "image" phải khớp với backend request->file('image')

  try {
    const response = await api.post("/v1/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.image_url; // Vì bạn trả về image_url trong response JSON
  } catch (error) {
    console.error("Failed to upload avatar", error);
    throw error;
  }
};

export const createClass = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.className);
    formData.append("teacherName", data.teacherName);
    formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("students", JSON.stringify(data.students));

    const response = await api.post("/v1/classes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create class", error);
    throw error;
  }
};

export const deleteClass = async (id) => {
  try {
    const response = await api.delete(`/v1/classes/${id}`);
    return response.data;
  } catch (error) {
    console.log("Failed to delete class", error);
    throw error;
  }
};

export const updateClass = async (id, data) => {
  try {
    const response = await api.patch(`/v1/classes/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("Failed to update class", error);
    throw error;
  }
};

// =========================
// 🎯 Goal Management
// =========================
export const createGoal = async (goalData) => {
  try {
    const response = await api.post("/goal", goalData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getGoal = async (id) => {
  try {
    const response = await api.get(`/goal/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get goal:", error);
    throw error;
  }
};

export const getAllGoal = async () => {
  try {
    const response = await api.get(`/goal`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const editGoal = async (id, updatedGoal) => {
  try {
    const response = await api.put(`/goal/${id}`, updatedGoal);
    return response.data;
  } catch (error) {
    console.error("Failed to edit goal:", error);
    throw error;
  }
};

export const deleteGoal = async (id) => {
  try {
    const response = await api.delete(`/goal/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateGoalStatus = async (id, status) => {
  try {
    const response = await api.put(`/goal/${id}/completeStatus`, {
      completeStatus: status,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update goal status:", error);
    throw error;
  }
};

export const getGoalsByStatus = async (status) => {
  try {
    const response = await api.get(`/goal/status/${status}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch goals by status:", error);
    throw error;
  }
};

// =========================
// 🏫 In-Class Management
// =========================
export const getAllInClass = async () => {
  try {
    const response = await api.get(`/inclass`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getInClassByID = async (id) => {
  try {
    const response = await api.get(`/inclass/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get inClass by ID:", error);
    throw error;
  }
};

export const editInClass = async (id, updatedGoal) => {
  try {
    const response = await api.put(`/inclass/${id}`, updatedGoal);
    return response.data;
  } catch (error) {
    console.error("Failed to edit inClass:", error);
    throw error;
  }
};

// =========================
// 📚 Self Study
// =========================
export const getAllSelfStudy = async () => {
  try {
    const response = await api.get(`/selfstudy`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const creatSelfStudy = async (data) => {
  try {
    const response = await api.post(`/selfstudy`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to create self study:", error);
    throw error;
  }
};

// =========================
// ❗ Global API Error Handler
// =========================
const handleApiError = (error) => {
  if (error.response) {
    console.error("API error:", error.response.data);
  } else if (error.request) {
    console.error("No response from server:", error.request);
  } else {
    console.error("Unexpected error:", error.message);
  }
};

export const academyAPI = {
    getAllAcademies: async () => {
        const response = await api.get(`/academies`);
        return response.data;
    },

    getAcademy: async (id) => {
        const response = await api.get(`/academies/${id}`);
        return response.data;
    },

    addAcademy: async (formData) => {
        const response = await api.post(`/academies`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateAcademy: async (id, formData) => {
        formData.append("_method", "PUT");
        const response = await api.post(`/academies/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: { _method: 'PUT' },
        });
        return response.data;
    },

    deleteAcademy: async (id) => {
        await api.delete(`/academies/${id}`);
        return true;
    },
}

export const getAllWeekGoal = async (id) => {
    try {
        console.log("ID to delete:", id);
        const response = await api.get(`/week-goals`);
        console.log("Goal deleted:", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const getAllTasks = async (id) => {
    try {
        console.log("ID to delete:", id);
        const response = await api.get(`/task`);
        console.log("Goal deleted:", response.data);
        return response.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

export const deleteInClass = async (id) => {
  try {
    const response = await api.delete(`/inclass/${id}`); 
    return response.data;
  } catch (error) {
    console.error("Failed to fetch inclass", error);
    throw error;
  }
};

export const createUser  = async (data) => {
  try {
    console.log("Test data before saving: ", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image);
    if(data.role) {
      formData.append("role", data.role);
    }

    const response = await api.post('/v1/student', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Failed at creating a new student: ", error);
    throw error;
  }
}

export const updateUser = async(id, data) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (data.password) formData.append('password', data.password);
    if (data.image instanceof File) {
        formData.append("image", data.image);
    } else {
      console.log("Đéo thấy");
    }
    console.log("FormData content:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const response = await api.post(`/v1/student/${id}?_method=PATCH`, formData);
    console.log("Test response: ", response.data);
    return response.data;
  } catch (error) {
      console.error("Failed at updating a new student: ", error);
      throw error;
  }
}

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/v1/student/${id}`,id);
    console.log("Test ID before deleting: ", id);
    return response.data;

  } catch (error) {
      console.error("Failed at creating a new student: ", error);
      throw error;
  }
}

export default academyAPI;
