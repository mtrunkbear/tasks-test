import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../types";

const apiUrl = 'http://localhost:3001/tasks'; // Suponiendo que json-server se está ejecutando en este puerto

export const fetchTasks = createAsyncThunk<Task[]>('tasks/fetchTasks', async () => {
  const response = await axios.get<Task[]>(apiUrl);
  return response.data;
});

export const addTask = createAsyncThunk<Task, Task>('tasks/addTask', async (task) => {
  const response = await axios.post<Task>(apiUrl, task);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export default taskSlice.reducer;