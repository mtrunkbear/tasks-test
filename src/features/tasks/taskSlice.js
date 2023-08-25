import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:3001/tasks'; // Assuming json-server is running on this port

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post(apiUrl, task);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
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
