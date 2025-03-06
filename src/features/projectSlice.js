import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/AxiosInstance";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const resp = await axiosInstance.get("/projects");
    return resp.data;
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectData) => {
    const resp = await axiosInstance.post("/projects", projectData);
    return resp.data;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ project_id, updatedProjectData }, { rejectWithValue, getState }) => {
    if (!project_id) {
      return rejectWithValue("project_id is undefined");
    }

    const state = getState();
    const project = state.projects.projects.find((p) => p.id === project_id);

    if (!project) {
      return rejectWithValue("Project not found");
    }
    const finalData = {
      name: project.name,
      color: project.color,
      ...updatedProjectData,
    };

    try {
      const resp = await axiosInstance.post(
        `/projects/${project_id}`,
        finalData
      );
      return { id: project_id, ...resp.data };
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (project_id) => {
    await axiosInstance.delete(`/projects/${project_id}`);
    return project_id;
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load projects";
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (proj) => proj.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      });
  },
});

export default projectSlice.reducer;
