import { axiosInstance } from "../AxiosInstance";

export const deleteProject = async (project_id) => {
  try {
    await axiosInstance.delete(`/projects/${project_id}`);
    return true;
  } catch (error) {
    return error.message;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}`);
    return true;
  } catch (error) {
    return error.message;
  }
};
