import { axiosInstance } from "../AxiosInstance";

export const fetchProjects = async () => {
  try {
    const res = await axiosInstance.get("/projects");
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const fetchTasks = async () => {
  try {
    const res = await axiosInstance.get("/tasks");
    return res.data;
  } catch (error) {
    return error.message;
  }
};
