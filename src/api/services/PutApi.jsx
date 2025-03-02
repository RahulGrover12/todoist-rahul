import { axiosInstance } from "../AxiosInstance";

export const updateProject = async (project_id, updatedProjectData) => {
  try {
    const res = await axiosInstance.post(
      `/projects/${project_id}`,
      updatedProjectData
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const updateTask = async (taskId, updatedTasktData) => {
  try {
    const res = await axiosInstance.post(`/tasks/${taskId}`, updatedTasktData);
    return res.data;
  } catch (error) {
    return error.message;
  }
};
