import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginFormData, User } from '../types/auth.types';


const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginFormData>) => {
      const user: User = {
        id: '1',
        email: action.payload.email
      };
      state.isAuthenticated = true;
      state.user = user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
