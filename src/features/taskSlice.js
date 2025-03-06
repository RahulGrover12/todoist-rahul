import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/AxiosInstance";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const resp = await axiosInstance.get("/tasks");
  return resp.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  const resp = await axiosInstance.post("/tasks", taskData);
  return resp.data;
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (payload, { rejectWithValue }) => {
    if (!payload || !payload.task_id) {
      return rejectWithValue("task_id is undefined");
    }
    const resp = await axiosInstance.post(
      `/tasks/${payload.task_id}`,
      payload.updatedTaskData
    );
    return { id: payload.task_id, ...resp.data };
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (task_id) => {
    await axiosInstance.delete(`/tasks/${task_id}`);
    return task_id;
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.tasks = Array.isArray(state.tasks)
          ? state.tasks.filter((task) => task.id !== action.payload)
          : [];
      });
  },
});

export default taskSlice.reducer;
