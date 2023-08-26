import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../types";

const apiUrl = "http://localhost:3001/tasks";

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const response = await axios.get<Task[]>(apiUrl);
    return response.data;
  }
);

export const addTask = createAsyncThunk<Task, Task>(
  "tasks/addTask",
  async (task) => {
    const response = await axios.post<Task>(apiUrl, task);
    return response.data;
  }
);

export const toggleTaskCompleted = createAsyncThunk<
  Task,
  { taskId: string; completed: boolean }
>("tasks/toggleTaskCompleted", async ({ taskId, completed }) => {
  const response = await axios.patch<Task>(`${apiUrl}/${taskId}`, {
    completed: completed,
  });
  return response.data;
});

export const changeTaskDueDate = createAsyncThunk<
  Task,
  { taskId: string; newDueDate: string }
>("tasks/changeTaskDueDate", async ({ taskId, newDueDate }) => {
  const response = await axios.patch<Task>(`${apiUrl}/${taskId}`, {
    dueDate: newDueDate,
  });
  return response.data;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: [] as Task[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(toggleTaskCompleted.fulfilled, (state, action) => {
        const taskId = action.meta.arg.taskId;
        const taskIndex = state.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          state[taskIndex] = action.payload;
        }
      })
      .addCase(changeTaskDueDate.fulfilled, (state, action) => {
        const taskId = action.meta.arg.taskId;
        const taskIndex = state.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          state[taskIndex].dueDate = action.meta.arg.newDueDate;
        }
      });
  },
});

export default taskSlice.reducer;
