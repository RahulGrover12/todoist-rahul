import { axiosInstance } from "../AxiosInstance";

export const addProject = async (projectData) => {
  try {
    const res = await axiosInstance.post("/projects", projectData);
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const addTask = async (taskData) => {
  try {
    const res = await axiosInstance.post("/tasks", taskData);
    return res.data;
  } catch (error) {
    return error.message;
  }
};
