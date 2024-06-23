import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterFormData, RegisterState, User } from '../types/logpass.types';
import apiClient from '../utils/apiClient';


const initialState: RegisterState = {
  log1n: null,
  isRegistered: false
};


export const fetchLogpass = createAsyncThunk('logpass/fetchLogpass', async () => {
  const response = await apiClient.get('/logpass');
  return response.data;
});

export const deleteService = createAsyncThunk('logpass/deleteLogpass', async (id: number) => {
  await apiClient.delete(`/logpass/${id}`);
  return id;
});


const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<RegisterFormData>) => {
      const user: User = {
        id: '1',
        email: action.payload.email,
        password: action.payload.password
      };
      state.isRegistered = true;
      state.log1n = user;
    },
    logout: (state) => {
      state.log1n = null;
    }
  }
});

export const { login, logout } = registerSlice.actions;
export default registerSlice.reducer;
